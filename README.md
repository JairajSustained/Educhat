# Educhat

An intelligent educational platform designed for CBSE students to enhance their learning experience through AI-powered features.

## About This Project

Educhat is an innovative learning companion that helps CBSE students across all classes interact with their subjects in a more engaging and interactive way. Whether you're studying for exams, working through homework, or exploring new concepts, Educhat has you covered.

## Features

### 📚 Subject-Based Learning
- Select your class and subject
- Chat with an LLM (Large Language Model) to discuss and clarify subject concepts
- Get personalized explanations tailored to your curriculum

### 📁 File Upload & Chat
- Upload educational files such as:
  - Homework assignments
  - Exam papers
  - Study materials
  - Class notes
- Chat with your uploaded documents to get instant insights and explanations
- Ask questions about specific content in your files

### 🎯 Interactive Learning Tools
- **Quiz Generation**: Create custom quizzes based on your subjects and uploaded materials
- **Audio Generation**: Convert text to audio for auditory learning
- **Mind Maps**: Generate visual mind maps to organize and memorize concepts

### 🔐 Secure Authentication
- Sign in seamlessly using your Google account
- Safe and secure access to your learning data

## Getting Started

### Prerequisites
- Python 3.8+
- Django 4.0+
- Google OAuth credentials (for authentication)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Educhat
   ```

2. Install uv (if not already installed):
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. Create a virtual environment and install dependencies:
   ```bash
   uv sync
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Run the development server:
   ```bash
   python manage.py runserver
   ```

6. Open your browser and navigate to `http://localhost:8000`

## Configuration

### Google OAuth Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Set up OAuth 2.0 credentials (clientid and client secret)
3. Add the credentials to your Django settings

## Usage

1. **Sign In**: Use your Google account to authenticate
2. **Select Subject**: Choose your class and subject
3. **Chat & Learn**: Start chatting with the AI about your subject
4. **Upload Files**: Upload homework or exam papers to analyze
5. **Generate Resources**: Create quizzes, audio notes, and mind maps

## Technology Stack

- **Backend**: Django, Python
- **AI/LLM**: Integration with Large Language Models
- **Authentication**: Google OAuth 2.0
- **Database**: PostgreSQL with pgvector (for vector embeddings)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

(Add your license information here)

## Support

For issues or questions, please open an issue on the repository or contact the development team.

Happy Learning! 📖✨
