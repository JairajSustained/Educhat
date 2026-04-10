# Educhat Frontend

A modern React-based frontend for the Educhat AI-powered learning platform.

## Features

- **Google OAuth Authentication** - Secure sign-in with Google
- **Subject Selection** - Choose from CBSE classes (1-12) and subjects
- **AI Chat Interface** - Interactive chat with AI tutor
- **File Upload** - Upload and manage study materials
- **Quiz Generation** - Create and take quizzes
- **Mind Maps** - Visual concept mapping with ReactFlow
- **Audio Notes** - Convert text to speech

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **ReactFlow** - Mind map visualization
- **React Markdown** - Markdown rendering

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Google OAuth Client ID

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your Google Client ID
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `VITE_API_URL` | Backend API URL (optional) | No |

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components (Sidebar, Header, MainLayout)
│   │   └── ui/          # Reusable UI components (Button, Card, Modal, Input)
│   ├── pages/           # Page components
│   ├── stores/          # Zustand state stores
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilities and constants
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Security Note

This project uses the native `fetch` API instead of axios to minimize dependencies and potential security vulnerabilities.
