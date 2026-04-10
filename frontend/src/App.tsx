import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/stores'
import { MainLayout } from '@/components/layout/MainLayout'
import { LoginPage } from '@/pages/LoginPage'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
    // Check for existing auth on mount
    setLoading(false)
  }, [setLoading])
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
