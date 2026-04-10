import { useState } from 'react'
import { 
  Brain, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Circle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { useChatStore } from '@/stores'
import { generateId } from '@/utils/helpers'
import type { Quiz, QuizResult, Question } from '@/types'

const MOCK_QUIZZES: Quiz[] = [
  {
    id: '1',
    title: 'Mathematics - Algebra Basics',
    questions: [
      {
        id: 'q1',
        text: 'What is the value of x in the equation 2x + 5 = 15?',
        options: ['5', '10', '7.5', '20'],
        correctAnswer: 0,
        explanation: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5',
      },
      {
        id: 'q2',
        text: 'Simplify: 3(x + 2) - 2x',
        options: ['x + 6', 'x + 2', '5x + 6', 'x - 6'],
        correctAnswer: 0,
        explanation: 'Expand: 3x + 6 - 2x = x + 6',
      },
      {
        id: 'q3',
        text: 'If a = 3 and b = 4, what is the value of a² + b²?',
        options: ['25', '7', '12', '49'],
        correctAnswer: 0,
        explanation: '3² + 4² = 9 + 16 = 25',
      },
    ],
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Physics - Mechanics',
    questions: [
      {
        id: 'q1',
        text: 'What is the SI unit of force?',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1,
        explanation: 'The Newton (N) is the SI unit of force.',
      },
      {
        id: 'q2',
        text: 'Which law states that every action has an equal and opposite reaction?',
        options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'],
        correctAnswer: 2,
        explanation: "Newton's Third Law of Motion states this principle.",
      },
    ],
    createdAt: new Date(),
  },
]

export function QuizPage() {
  const { selectedSubject, selectedClass } = useChatStore()
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [showResultModal, setShowResultModal] = useState(false)
  const [showExplanation, setShowExplanation] = useState<string | null>(null)
  
  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResult(null)
    setShowExplanation(null)
  }
  
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }
  
  const handleNext = () => {
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowExplanation(null)
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setShowExplanation(null)
    }
  }
  
  const handleSubmit = () => {
    if (!activeQuiz) return
    
    let correctCount = 0
    activeQuiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    
    const result: QuizResult = {
      quizId: activeQuiz.id,
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      answers: selectedAnswers,
      completedAt: new Date(),
    }
    
    setQuizResult(result)
    setShowResultModal(true)
  }
  
  const handleCloseQuiz = () => {
    setActiveQuiz(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResult(null)
    setShowExplanation(null)
  }
  
  const handleRetake = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResult(null)
    setShowExplanation(null)
    setShowResultModal(false)
  }
  
  const currentQuestion = activeQuiz?.questions[currentQuestionIndex]
  const progress = activeQuiz 
    ? ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100 
    : 0
  
  // Quiz Taking View
  if (activeQuiz) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Quiz Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleCloseQuiz}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>No time limit</span>
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-gray-900">{activeQuiz.title}</h1>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">
                Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </span>
              <span className="text-gray-600">{Math.round(progress)}% completed</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Question Card */}
        {currentQuestion && (
          <Card className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion.id] === index
                const isCorrect = index === currentQuestion.correctAnswer
                const showResult = showExplanation === currentQuestion.id
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : isSelected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200'
                        : isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-500'
                            : isSelected
                            ? 'border-red-500 bg-red-500'
                            : 'border-gray-300'
                          : isSelected
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}>
                        {showResult ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : isSelected ? (
                            <span className="text-white text-xs">✕</span>
                          ) : null
                        ) : isSelected ? (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        ) : null}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>
            
            {/* Explanation */}
            {showExplanation === currentQuestion.id && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-1">Explanation:</h4>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}
          </Card>
        )}
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowExplanation(currentQuestion?.id || null)}
              disabled={!selectedAnswers[currentQuestion?.id || '']}
            >
              Show Explanation
            </Button>
            
            {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion?.id || '']}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswers[currentQuestion?.id || '']}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Quiz List View
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
          <p className="text-gray-600 mt-1">
            Test your knowledge with AI-generated quizzes
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Generate Quiz
        </Button>
      </div>
      
      {/* Subject Info */}
      {selectedSubject && selectedClass && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
          <p className="text-sm text-primary-800">
            Generating quizzes for: <strong>{selectedSubject.name}</strong> • {selectedClass.name}
          </p>
        </div>
      )}
      
      {/* Quiz Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_QUIZZES.map((quiz) => (
          <Card key={quiz.id} hover className="cursor-pointer" onClick={() => handleStartQuiz(quiz)}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {quiz.questions.length} questions • {selectedSubject?.name}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400">
                    Created {quiz.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>
      
      {/* Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Quiz Completed!"
        size="md"
      >
        {quizResult && (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900">
              {quizResult.score} / {quizResult.totalQuestions}
            </h3>
            <p className="text-gray-600 mt-2">
              You got {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}% correct!
            </p>
            
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="secondary" onClick={handleCloseQuiz}>
                Back to Quizzes
              </Button>
              <Button onClick={handleRetake}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
