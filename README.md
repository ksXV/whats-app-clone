# WhatsApp Clone

A real-time messaging application built with React, Redux, and Firebase, enabling users to communicate worldwide with Google authentication integration.

## Overview

This project is a full-featured WhatsApp clone that provides seamless communication capabilities while leveraging Google's authentication system for secure access. Users can chat in real-time, manage contacts, and enjoy a familiar messaging interface.

## Features

- **User Authentication**
  - Google account integration
  - Secure login/logout functionality
  - Persistent user sessions

- **Real-time Messaging**
  - Instant message delivery
  - Read receipts
  - Online status indicators (TBA)
  - Typing indicators (TBA)

- **User Interface**
  - Chat list view
  - Individual chat windows
  - Contact management
  - Profile settings
  - Message status indicators (TBA)
  - Last seen functionality (TBA)

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux
- **Backend/Database**: Firebase
  - Firestore for messages and user data
  - Firebase Authentication
  - Firebase Hosting
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Firebase account
- Google Cloud Platform account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ksXV/whats-app-clone.git
cd whats-app-clone
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Google Authentication
   - Create a web app in your Firebase project
   - Copy your Firebase configuration

4. Create a `.env` file in the root directory and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

5. Start the development server:
```bash
npm start
```

6. Login using these crendtials or use a Google account:
```text
Email: test@email.com
Password: 12345678
```
## Project Structure

```
whats-app-clone/
├── src/
│   ├── components/     # React components
│   ├── redux/         # Redux store and slices
│   ├── firebase/      # Firebase configuration
│   ├── types/         # TypeScript interfaces
│   ├── utils/         # Utility functions
│   └── App.tsx        # Main application component
├── public/
└── package.json
```

## Development

### Running the Application

For development:
```bash
npm start
```

For production build:
```bash
npm run build
```

### Firebase Setup

1. Enable Authentication:
   - Go to Firebase Console
   - Navigate to Authentication
   - Enable Google sign-in method

2. Configure Firestore:
   - Create a new Firestore database
   - Set up security rules for your database
   - Initialize collections for users and chats

### State Management

The application uses Redux for state management with the following main slices:
- User state (authentication, profile)
- Chat state (messages, active chats)
- UI state (theme, notifications) (TBA)

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```
