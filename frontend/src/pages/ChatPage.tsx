import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Send, 
  Paperclip, 
  Sparkles, 
  Bot,
  User,
  MoreVertical,
  Trash2,
  Download,
  BookOpen
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChatStore, useAuthStore } from '@/stores'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { generateId, formatTime } from '@/utils/helpers'
import type { ChatMessage } from '@/types'

const SUGGESTED_QUESTIONS = [
  'Explain this topic in simple terms',
  'Give me practice problems',
  'Create a summary of key points',
  'What are the important formulas?',
  'Help me understand this concept',
]

export function ChatPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { 
    messages, 
    addMessage, 
    clearMessages, 
    selectedSubject, 
    selectedClass,
    isGenerating,
    setIsGenerating,
  } = useChatStore()
  
  const [input, setInput] = useState('')
  const [showClearModal, setShowClearModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])
  
  const handleSend = async () => {
    if (!input.trim() || isGenerating) return
    
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }
    
    addMessage(userMessage)
    setInput('')
    setIsGenerating(true)
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: generateMockResponse(userMessage.content),
        timestamp: new Date(),
      }
      addMessage(aiMessage)
      setIsGenerating(false)
    }, 1500)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    textareaRef.current?.focus()
  }
  
  const handleClearChat = () => {
    clearMessages()
    setShowClearModal(false)
  }
  
  // Mock response generator (replace with actual API)
  const generateMockResponse = (userInput: string): string => {
    const responses = [
      `That's a great question about **${selectedSubject?.name || 'this subject'}**! Let me explain it step by step.\n\n## Key Concepts\n\n1. **Understanding the basics**: Start with the fundamental principles\n2. **Practice regularly**: Solve different types of problems\n3. **Review mistakes**: Learn from errors to improve\n\nWould you like me to provide some practice problems or explain a specific concept in more detail?`,
      
      `I'd be happy to help you with that! Here's what you need to know:\n\n### Important Points\n\n- This topic builds on previous concepts you've learned\n- Make sure to understand the definitions clearly\n- Try to relate it to real-world examples\n\n> **Tip**: Create a mind map to visualize the connections between different concepts.\n\nDo you have any specific doubts about this topic?`,
      
      `Great question! Let me break this down for you:\n\n\`\`\`\nKey Formula: Remember the basic structure\nPractice + Understanding = Mastery\n\`\`\`\n\n## Steps to Master This Topic\n\n1. Read the theory carefully
2. Solve examples from your textbook
3. Try additional practice questions
4. Review and revise regularly\n\nWould you like me to generate a quiz on this topic?`,
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  if (!selectedSubject || !selectedClass) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">No Subject Selected</h2>
        <p className="text-gray-600 mt-2 max-w-md">
          Please select a subject and class first to start chatting with the AI tutor.
        </p>
        <Button onClick={() => navigate('/subject-selection')} className="mt-6">
          Select Subject
        </Button>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] -m-6">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI Tutor</h2>
            <p className="text-sm text-gray-500">
              {selectedSubject.name} • {selectedClass.name}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowClearModal(true)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to AI Tutor!
            </h3>
            <p className="text-gray-600 text-center max-w-md mb-8">
              I'm here to help you learn {selectedSubject.name}. Ask me anything about your curriculum!
            </p>
            
            <div className="w-full max-w-lg">
              <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.role} animate-fade-in`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {message.role === 'assistant' ? (
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                        {user?.picture ? (
                          <img
                            src={user.picture}
                            alt={user.name}
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {message.role === 'assistant' ? 'AI Tutor' : user?.name || 'You'}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="markdown prose prose-sm max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isGenerating && (
              <div className="chat-message assistant">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            <button
              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your subject..."
                className="textarea min-h-[52px] max-h-32 pr-12"
                rows={1}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="px-4 py-3"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            AI Tutor may produce inaccurate information. Verify important information from your textbooks.
          </p>
        </div>
      </div>
      
      {/* Clear Chat Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Chat History"
        description="Are you sure you want to clear all messages? This action cannot be undone."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleClearChat}>
            Clear Chat
          </Button>
        </div>
      </Modal>
    </div>
  )
}
