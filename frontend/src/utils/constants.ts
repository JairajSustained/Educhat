import type { Subject, CBSEClass } from '@/types'

export const CBSE_CLASSES: CBSEClass[] = [
  { id: 1, name: 'Class 1' },
  { id: 2, name: 'Class 2' },
  { id: 3, name: 'Class 3' },
  { id: 4, name: 'Class 4' },
  { id: 5, name: 'Class 5' },
  { id: 6, name: 'Class 6' },
  { id: 7, name: 'Class 7' },
  { id: 8, name: 'Class 8' },
  { id: 9, name: 'Class 9' },
  { id: 10, name: 'Class 10' },
  { id: 11, name: 'Class 11' },
  { id: 12, name: 'Class 12' },
]

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: 'Calculator', color: '#3b82f6' },
  { id: 'physics', name: 'Physics', icon: 'Atom', color: '#8b5cf6' },
  { id: 'chemistry', name: 'Chemistry', icon: 'FlaskConical', color: '#10b981' },
  { id: 'biology', name: 'Biology', icon: 'Dna', color: '#22c55e' },
  { id: 'english', name: 'English', icon: 'BookOpen', color: '#f59e0b' },
  { id: 'hindi', name: 'Hindi', icon: 'Languages', color: '#ef4444' },
  { id: 'history', name: 'History', icon: 'Landmark', color: '#f97316' },
  { id: 'geography', name: 'Geography', icon: 'Globe', color: '#06b6d4' },
  { id: 'political-science', name: 'Political Science', icon: 'Scale', color: '#6366f1' },
  { id: 'economics', name: 'Economics', icon: 'TrendingUp', color: '#84cc16' },
  { id: 'computer', name: 'Computer Science', icon: 'Monitor', color: '#14b8a6' },
  { id: 'accounts', name: 'Accountancy', icon: 'Calculator', color: '#ec4899' },
  { id: 'business', name: 'Business Studies', icon: 'Briefcase', color: '#a855f7' },
]

export const FEATURES = [
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'Chat with an AI tutor about any subject',
    icon: 'MessageCircle',
  },
  {
    id: 'files',
    title: 'File Upload',
    description: 'Upload and chat with your documents',
    icon: 'Upload',
  },
  {
    id: 'quiz',
    title: 'Quiz Generation',
    description: 'Generate custom quizzes for practice',
    icon: 'HelpCircle',
  },
  {
    id: 'audio',
    title: 'Audio Notes',
    description: 'Convert text to audio for learning',
    icon: 'Headphones',
  },
  {
    id: 'mindmap',
    title: 'Mind Maps',
    description: 'Visualize concepts with mind maps',
    icon: 'GitBranch',
  },
] as const

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'chat', label: 'Chat', icon: 'MessageSquare' },
  { id: 'files', label: 'My Files', icon: 'FileText' },
  { id: 'quizzes', label: 'Quizzes', icon: 'Brain' },
  { id: 'mindmaps', label: 'Mind Maps', icon: 'Network' },
  { id: 'audio', label: 'Audio Notes', icon: 'Volume2' },
] as const
