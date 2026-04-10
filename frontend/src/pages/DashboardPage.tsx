import { useNavigate } from 'react-router-dom'
import { 
  MessageSquare, 
  FileText, 
  Brain, 
  Network, 
  Volume2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  Target
} from 'lucide-react'
import { useAuthStore, useChatStore } from '@/stores'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SUBJECTS, FEATURES } from '@/utils/constants'
import { generateId } from '@/utils/helpers'

const iconMap: Record<string, React.ElementType> = {
  MessageCircle: MessageSquare,
  Upload: FileText,
  HelpCircle: Brain,
  Headphones: Volume2,
  GitBranch: Network,
}

const recentActivity = [
  { id: '1', type: 'chat', title: 'Mathematics - Algebra', time: '2 hours ago' },
  { id: '2', type: 'quiz', title: 'Physics Quiz - Mechanics', time: 'Yesterday' },
  { id: '3', type: 'file', title: 'Uploaded: Chemistry Notes.pdf', time: '2 days ago' },
]

export function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { selectedSubject, selectedClass } = useChatStore()
  
  const handleStartLearning = () => {
    navigate('/subject-selection')
  }
  
  const handleQuickAction = (featureId: string) => {
    switch (featureId) {
      case 'chat':
        navigate('/chat')
        break
      case 'files':
        navigate('/files')
        break
      case 'quiz':
        navigate('/quizzes')
        break
      case 'audio':
        navigate('/audio')
        break
      case 'mindmap':
        navigate('/mindmaps')
        break
    }
  }
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Hello, {user?.name?.split(' ')[0] || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to learn something new today?
          </p>
        </div>
        <Button onClick={handleStartLearning}>
          <Sparkles className="w-4 h-4 mr-2" />
          Start Learning
        </Button>
      </div>
      
      {/* Current Subject Banner */}
      {selectedSubject && selectedClass && (
        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">Currently Studying</p>
              <h2 className="text-2xl font-bold mt-1">
                {selectedSubject.name} - {selectedClass.name}
              </h2>
              <p className="text-primary-100 mt-2">
                Continue where you left off
              </p>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/chat')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <Card
                key={feature.id}
                hover
                onClick={() => handleQuickAction(feature.id)}
                className="p-4 text-center cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Popular Subjects */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUBJECTS.slice(0, 6).map((subject) => (
              <Card
                key={subject.id}
                hover
                onClick={() => navigate('/subject-selection')}
                className="p-4 cursor-pointer"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  <BookOpen className="w-5 h-5" style={{ color: subject.color }} />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{subject.name}</h3>
                <p className="text-xs text-gray-500 mt-1">CBSE Curriculum</p>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Stats & Activity */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <Card.Header>
              <Card.Title>Your Progress</Card.Title>
            </Card.Header>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Study Time</p>
                  <p className="font-semibold text-gray-900">12.5 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Quizzes Completed</p>
                  <p className="font-semibold text-gray-900">8 quizzes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Questions Asked</p>
                  <p className="font-semibold text-gray-900">156 questions</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <Card.Header>
              <Card.Title>Recent Activity</Card.Title>
            </Card.Header>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
