import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  File, 
  FileText, 
  FileImage, 
  FileSpreadsheet,
  MoreVertical,
  Trash2,
  Download,
  MessageSquare,
  X,
  Search,
  Filter
} from 'lucide-react'
import { useChatStore } from '@/stores'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { formatFileSize, generateId, formatDate } from '@/utils/helpers'
import type { UploadedFile } from '@/types'

const FILE_ICONS: Record<string, React.ElementType> = {
  'application/pdf': FileText,
  'image': FileImage,
  'application/vnd.ms-excel': FileSpreadsheet,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FileSpreadsheet,
  'default': File,
}

const MOCK_FILES: UploadedFile[] = [
  {
    id: '1',
    name: 'Mathematics_Formulas.pdf',
    type: 'application/pdf',
    size: 2457600,
    uploadDate: new Date(Date.now() - 86400000 * 2),
    url: '#',
  },
  {
    id: '2',
    name: 'Physics_Notes_Chapter_5.pdf',
    type: 'application/pdf',
    size: 1843200,
    uploadDate: new Date(Date.now() - 86400000 * 5),
    url: '#',
  },
  {
    id: '3',
    name: 'Chemistry_Lab_Manual.pdf',
    type: 'application/pdf',
    size: 3686400,
    uploadDate: new Date(Date.now() - 86400000 * 7),
    url: '#',
  },
]

export function FilesPage() {
  const { uploadedFiles, addUploadedFile, removeUploadedFile } = useChatStore()
  const [files, setFiles] = useState<UploadedFile[]>([...MOCK_FILES, ...uploadedFiles])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true)
    
    // Simulate upload delay
    setTimeout(() => {
      const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
        id: generateId(),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        url: URL.createObjectURL(file),
      }))
      
      setFiles((prev) => [...newFiles, ...prev])
      newFiles.forEach(addUploadedFile)
      setIsUploading(false)
    }, 1500)
  }, [addUploadedFile])
  
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc', '.docx'],
      'text/plain': ['.txt'],
    },
    noClick: true,
  })
  
  const handleDelete = () => {
    if (selectedFile) {
      setFiles((prev) => prev.filter((f) => f.id !== selectedFile.id))
      removeUploadedFile(selectedFile.id)
      setShowDeleteModal(false)
      setSelectedFile(null)
    }
  }
  
  const handleChatWithFile = (file: UploadedFile) => {
    // Navigate to chat with file context
    console.log('Chat with file:', file.name)
  }
  
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return FILE_ICONS.image
    return FILE_ICONS[type] || FILE_ICONS.default
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Files</h1>
          <p className="text-gray-600 mt-1">
            Upload and manage your study materials
          </p>
        </div>
        <Button onClick={open}>
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
      </div>
      
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-900">
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-gray-500 mt-2">
          or{' '}
          <button onClick={open} className="text-primary-600 hover:text-primary-700 font-medium">
            browse files
          </button>
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Supports PDF, Images, Word documents (max 10MB)
        </p>
        
        {isUploading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        )}
      </div>
      
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
        <Button variant="secondary" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>
      
      {/* Files List */}
      {filteredFiles.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <File className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No files found</h3>
          <p className="text-gray-500 mt-2">
            {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card
                key={file.id}
                className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileIcon className="w-6 h-6 text-primary-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleChatWithFile(file)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Chat with file"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <a
                    href={file.url}
                    download={file.name}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => {
                      setSelectedFile(file)
                      setShowDeleteModal(true)
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
      
      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete File"
        description={`Are you sure you want to delete "${selectedFile?.name}"? This action cannot be undone.`}
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
