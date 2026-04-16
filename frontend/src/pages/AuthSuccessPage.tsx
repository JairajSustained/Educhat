import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores'
import type { User } from '@/types'

// Handles the redirect from the backend after Google OAuth:
// /auth/success?access=<token>&refresh=<token>
export function AuthSuccessPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get('access')
    const refreshToken = params.get('refresh')

    if (!accessToken || !refreshToken) {
      navigate('/login', { replace: true })
      return
    }

    // Fetch user info from backend using the new token
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        if (response.ok) {
          const user: User = await response.json()
          login(user, accessToken, refreshToken)
        } else {
          // /auth/me/ not available yet — store minimal info from token payload
          const payload = JSON.parse(atob(accessToken.split('.')[1]))
          const user: User = {
            id: String(payload.user_id ?? payload.sub ?? ''),
            email: payload.email ?? '',
            name: payload.name ?? 'User',
          }
          login(user, accessToken, refreshToken)
        }
      } catch {
        navigate('/login', { replace: true })
        return
      }

      navigate('/', { replace: true })
    }

    fetchUser()
  }, [login, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
        <span className="text-sm">Signing you in…</span>
      </div>
    </div>
  )
}
