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
	...