export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CBSEClass {
  id: number;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  url: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: Record<string, number>;
  completedAt: Date;
}

export interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  children?: MindMapNode[];
}

export interface AudioNote {
  id: string;
  title: string;
  text: string;
  audioUrl?: string;
  createdAt: Date;
}

export interface LearningSession {
  id: string;
  subjectId: string;
  classId: number;
  startedAt: Date;
  messages: ChatMessage[];
}
