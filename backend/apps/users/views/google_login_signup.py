import secrets
import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from urllib.parse import urlencode

User = get_user_model()

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

def google_login(request):
	"""
	Redirect user to Google OAuth2 login page.
	"""
	
	state = secrets.token_urlsafe(16)
	request.session['oauth_state'] = state

	params = {
		"client_id": settings.GOOGLE_CLIENT_ID,
		"redirect_uri": settings.GOOGLE_REDIRECT_URI,
		"response_type": "code",
		"scope": "openid email profile",
		"state": state,
		"access_type": "offline",
	}

	auth_url = f"{GOOGLE_AUTH_URL}?{urlencode(params)}"
	return redirect(auth_url)

def google_callback(request):
	"""
	Handle the Google OAuth2 callback.
	"""
	if request.GET.get("state") != request.session.get("oauth_state"):
		return JsonResponse({"error": "Invalid state parameter"}, status=400)
	
	code = request.GET.get("code")
	if not code:
		return JsonResponse({"error": "Authorization code not provided"}, status=400)
	
	token_response = requests.post(GOOGLE_TOKEN_URL, data={
		"code": code,
		"client_id": settings.GOOGLE_CLIENT_ID,
		"client_secret": settings.GOOGLE_CLIENT_SECRET,
		"redirect_uri": settings.GOOGLE_REDIRECT_URI,
		"grant_type": "authorization_code",
	})
	token_data = token_response.json()
	access_token = token_data.get("access_token")
	if not access_token:
		return JsonResponse({"error": "Failed to obtain access token"}, status=400)
	
	userinfo_response = requests.get(GOOGLE_USERINFO_URL, headers={
		"Authorization": f"Bearer {access_token}"
	})
	userinfo = userinfo_response.json()

	email = userinfo.get("email")
	if not email:
		return JsonResponse({"error": "Email not provided by Google"}, status=400)
	
	user, created = User.objects.get_or_create(email=email, defaults={
		"first_name": userinfo.get("given_name", ""),
		"last_name": userinfo.get("family_name", ""),
	})
	refresh = RefreshToken.for_user(user)

	frontend_url = settings.FRONTEND_URL
	redirect_url = f"{frontend_url}/auth/success?access={str(refresh.access_token)}&refresh={str(refresh)}"
	return redirect(redirect_url)