import { useState } from 'react'
import { 
  Volume2, 
  Plus, 
  Play, 
  Pause, 
  Download, 
  Trash2,
  Sparkles,
  Clock,
  FileAudio,
  Headphones
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useChatStore } from '@/stores'
import { generateId, formatDate } from '@/utils/helpers'
import type { AudioNote } from '@/types'

const MOCK_AUDIO_NOTES: AudioNote[] = [
  {
    id: '1',
    title: 'Photosynthesis Summary',
    text: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. The process occurs in the chloroplasts, specifically using chlorophyll, the green pigment involved in photosynthesis.',
    audioUrl: '#',
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion',
    text: 'First Law: An object remains at rest or in uniform motion unless acted upon by a force. Second Law: Force equals mass times acceleration. Third Law: For every action, there is an equal and opposite reaction.',
    audioUrl: '#',
    createdAt: new Date(Date.now() - 86400000 * 5),
  },
]

export function AudioPage() {
  const { selectedSubject } = useChatStore()
  const [audioNotes, setAudioNotes] = useState<AudioNote[]>(MOCK_AUDIO_NOTES)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [selectedNote, setSelectedNote] = useState<AudioNote | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Form state
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  
  const handleCreateAudio = () => {
    if (!title.trim() || !text.trim()) return
    
    setIsGenerating(true)
    
    // Simulate audio generation
    setTimeout(() => {
      const newNote: AudioNote = {
        id: generateId(),
        title: title.trim(),
        text: text.trim(),
        createdAt: new Date(),
      }
      
      setAudioNotes((prev) => [newNote, ...prev])
      setIsGenerating(false)
      setShowCreateModal(false)
      setTitle('')
      setText('')
    }, 2000)
  }
  
  const handlePlay = (note: AudioNote) => {
    setSelectedNote(note)
    setShowPlayerModal(true)
    setIsPlaying(true)
  }
  
  const handleDelete = (id: string) => {
    setAudioNotes((prev) => prev.filter((note) => note.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setShowPlayerModal(false)
    }
  }
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  
  const handleClosePlayer = () => {
    setShowPlayerModal(false)
    setIsPlaying(false)
    setSelectedNote(null)
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audio Notes</h1>
          <p className="text-gray-600 mt-1">
            Convert your study materials to audio for learning on the go
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Audio
        </Button>
      </div>
      
      {/* Subject Info */}
      {selectedSubject && (
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
          <p className="text-sm text-primary-800">
            Creating audio notes for: <strong>{selectedSubject.name}</strong>
          </p>
        </div>
      )}
      
      {/* Audio Notes List */}
      <div className="grid gap-4">
        {audioNotes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{note.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {note.text.substring(0, 150)}...
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(note.createdAt)}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FileAudio className="w-3 h-3" />
                    ~{Math.ceil(note.text.length / 150)} min
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlay(note)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Play"
                >
                  <Play className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {audioNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Volume2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No audio notes yet</h3>
          <p className="text-gray-500 mt-2">
            Create your first audio note to study on the go
          </p>
          <Button onClick={() => setShowCreateModal(true)} className="mt-4">
            Create Audio Note
          </Button>
        </div>
      )}
      
      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Audio Note"
        description="Enter text to convert to speech"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Photosynthesis Summary"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your notes or study material here..."
              className="textarea min-h-[200px]"
            />
            <p className="text-xs text-gray-500 mt-1">
              {text.length} characters • ~{Math.ceil(text.length / 150)} minutes
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateAudio}
              disabled={!title.trim() || !text.trim() || isGenerating}
              isLoading={isGenerating}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Audio
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Player Modal */}
      <Modal
        isOpen={showPlayerModal}
        onClose={handleClosePlayer}
        title={selectedNote?.title || 'Audio Player'}
        size="md"
      >
        {selectedNote && (
          <div className="space-y-6">
            {/* Visualizer */}
            <div className="h-24 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl flex items-center justify-center gap-1 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-white/50 rounded-full transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    height: isPlaying 
                      ? `${Math.random() * 60 + 20}%` 
                      : '20%',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <span className="sr-only">Previous</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>
              
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>
              
              <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <span className="sr-only">Next</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>
            </div>
            
            {/* Progress */}
            <div className="space-y-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 transition-all duration-1000"
                  style={{ width: isPlaying ? '60%' : '30%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1:24</span>
                <span>{Math.ceil(selectedNote.text.length / 150)}:00</span>
              </div>
            </div>
            
            {/* Text Preview */}
            <div className="p-4 bg-gray-50 rounded-lg max-h-40 overflow-y-auto">
              <p className="text-sm text-gray-600">{selectedNote.text}</p>
            </div>
            
            {/* Actions */}
            <div className="flex justify-center gap-3">
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Download MP3
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
