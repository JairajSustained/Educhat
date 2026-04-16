import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoginPage } from '@/pages/LoginPage'
import { AuthSuccessPage } from '@/pages/AuthSuccessPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ChatPage } from '@/pages/ChatPage'
import { FilesPage } from '@/pages/FilesPage'
import { QuizPage } from '@/pages/QuizPage'
import { MindMapPage } from '@/pages/MindMapPage'
import { AudioPage } from '@/pages/AudioPage'
import { SubjectSelectionPage } from '@/pages/SubjectSelectionPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  const { setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/success" element={<AuthSuccessPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="subject-selection" element={<SubjectSelectionPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="files" element={<FilesPage />} />
        <Route path="quizzes" element={<QuizPage />} />
        <Route path="mindmaps" element={<MindMapPage />} />
        <Route path="audio" element={<AudioPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
