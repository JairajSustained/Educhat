import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  Languages,
  Landmark,
  Globe,
  Scale,
  TrendingUp,
  Monitor,
  Briefcase
} from 'lucide-react'
import { useChatStore } from '@/stores'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SUBJECTS, CBSE_CLASSES } from '@/utils/constants'
import type { Subject, CBSEClass } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  Languages,
  Landmark,
  Globe,
  Scale,
  TrendingUp,
  Monitor,
  Briefcase,
}

export function SubjectSelectionPage() {
  const navigate = useNavigate()
  const { setSelectedSubject, setSelectedClass } = useChatStore()
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
  
  const handleClassSelect = (classId: number) => {
    setSelectedClassId(classId)
  }
  
  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubjectId(subjectId)
  }
  
  const handleContinue = () => {
    if (step === 1 && selectedClassId) {
      const cbseClass = CBSE_CLASSES.find(c => c.id === selectedClassId)
      if (cbseClass) {
        setSelectedClass(cbseClass)
        setStep(2)
      }
    } else if (step === 2 && selectedSubjectId) {
      const subject = SUBJECTS.find(s => s.id === selectedSubjectId)
      if (subject) {
        setSelectedSubject(subject)
        navigate('/chat')
      }
    }
  }
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedSubjectId(null)
    } else {
      navigate('/')
    }
  }
  
  const selectedClass = CBSE_CLASSES.find(c => c.id === selectedClassId)
  const selectedSubject = SUBJECTS.find(s => s.id === selectedSubjectId)
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 1 ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-700'
            }`}>
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className="w-12 h-0.5 bg-gray-200">
              <div 
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: step === 2 ? '100%' : '0%' }}
              />
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          {step === 1 ? 'Select Your Class' : 'Select Your Subject'}
        </h1>
        <p className="text-gray-600 text-center mt-2">
          {step === 1 
            ? 'Choose your current class to personalize your learning experience'
            : selectedClass 
              ? `Choose a subject for ${selectedClass.name}` 
              : 'Choose a subject to start learning'}
        </p>
      </div>
      
      {/* Selection Grid */}
      {step === 1 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CBSE_CLASSES.map((cbseClass) => (
            <Card
              key={cbseClass.id}
              hover
              onClick={() => handleClassSelect(cbseClass.id)}
              className={`p-6 text-center cursor-pointer transition-all ${
                selectedClassId === cbseClass.id 
                  ? 'ring-2 ring-primary-500 border-primary-500' 
                  : ''
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                selectedClassId === cbseClass.id 
                  ? 'bg-primary-100' 
                  : 'bg-gray-100'
              }`}>
                <span className={`text-2xl font-bold ${
                  selectedClassId === cbseClass.id 
                    ? 'text-primary-600' 
                    : 'text-gray-600'
                }`}>
                  {cbseClass.id}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{cbseClass.name}</h3>
              <p className="text-sm text-gray-500 mt-1">CBSE</p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SUBJECTS.map((subject) => {
            const Icon = iconMap[subject.icon]
            return (
              <Card
                key={subject.id}
                hover
                onClick={() => handleSubjectSelect(subject.id)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedSubjectId === subject.id 
                    ? 'ring-2 ring-primary-500 border-primary-500' 
                    : ''
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ 
                    backgroundColor: selectedSubjectId === subject.id 
                      ? `${subject.color}30`
                      : `${subject.color}15`,
                  }}
                >
                  <Icon 
                    className="w-6 h-6" 
                    style={{ color: subject.color }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{subject.name}</h3>
                <p className="text-xs text-gray-500 mt-1">CBSE</p>
              </Card>
            )
          })}
        </div>
      )}
      
      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={step === 1 ? !selectedClassId : !selectedSubjectId}
          className="min-w-[200px]"
        >
          {step === 1 ? 'Continue' : 'Start Learning'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
      
      {/* Selection Summary */}
      {(selectedClassId || selectedSubjectId) && (
        <div className="mt-8 p-4 bg-primary-50 rounded-xl">
          <h3 className="text-sm font-medium text-primary-900 mb-2">Your Selection:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedClass && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-primary-700 border border-primary-200">
                {selectedClass.name}
              </span>
            )}
            {selectedSubject && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-primary-700 border border-primary-200">
                {selectedSubject.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
