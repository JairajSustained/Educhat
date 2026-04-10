import { create } from 'zustand'
import type { ChatMessage, Subject, CBSEClass, UploadedFile } from '@/types'

interface ChatState {
  messages: ChatMessage[];
  selectedSubject: Subject | null;
  selectedClass: CBSEClass | null;
  uploadedFiles: UploadedFile[];
  isGenerating: boolean;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setSelectedSubject: (subject: Subject | null) => void;
  setSelectedClass: (cbseClass: CBSEClass | null) => void;
  addUploadedFile: (file: UploadedFile) => void;
  removeUploadedFile: (fileId: string) => void;
  setIsGenerating: (generating: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  selectedSubject: null,
  selectedClass: null,
  uploadedFiles: [],
  isGenerating: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setSelectedSubject: (subject) => set({ selectedSubject: subject }),
  setSelectedClass: (cbseClass) => set({ selectedClass: cbseClass }),
  addUploadedFile: (file) => set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  removeUploadedFile: (fileId) => set((state) => ({ 
    uploadedFiles: state.uploadedFiles.filter(f => f.id !== fileId) 
  })),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
}))
