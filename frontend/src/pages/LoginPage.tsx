import { useNavigate } from 'react-router-dom'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { GraduationCap, Sparkles, MessageCircle, Brain, FileText } from 'lucide-react'
import { useAuthStore } from '@/stores'
import type { User } from '@/types'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuthStore()
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/')
    return null
  }
  
  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    // Decode JWT to get user info
    const credential = credentialResponse.credential
    if (credential) {
      try {
        const payload = JSON.parse(atob(credential.split('.')[1]))
        const user: User = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        }
        login(user)
        navigate('/')
      } catch (error) {
        console.error('Error decoding JWT:', error)
      }
    }
  }
  
  const handleGoogleError = () => {
    console.error('Google login failed')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Educhat</h1>
              <p className="text-sm text-gray-600">AI-Powered Learning</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Master Your CBSE Subjects with{' '}
              <span className="gradient-text">AI-Powered Learning</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get personalized help, generate quizzes, create mind maps, and study smarter with our intelligent learning platform.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Chat</h3>
                <p className="text-sm text-gray-500">Ask anything about your subjects</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Quizzes</h3>
                <p className="text-sm text-gray-500">Test your knowledge</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">File Upload</h3>
                <p className="text-sm text-gray-500">Chat with your documents</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mind Maps</h3>
                <p className="text-sm text-gray-500">Visualize concepts</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Educhat</h1>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
            <p className="mt-2 text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>
          
          <div className="mt-8 space-y-6">
            {/* Google Login */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure authentication</span>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>By signing in, you agree to our</p>
              <p className="mt-1">
                <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
              </p>
            </div>
          </div>
          
          {/* Demo notice */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a demo application. Use any Google account to sign in and explore the features.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
