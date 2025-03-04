import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import AadhaarVerification from './components/auth/AadhaarVerification';
import PanVerification from './components/auth/PanVerification';
import FaceRecognition from './components/auth/FaceRecognition';
import AudioRecognition from './components/auth/AudioRecognition';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SecurityMessage from './components/auth/SecurityMessage';
import QuerySubmission from './components/auth/QuerySubmission';
import Profile from './components/Profile';
import ChatBot from './components/ChatBot';
import VideoAuth from './components/auth/VideoAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/scmsg" element={<SecurityMessage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/aadhaar" element={<AadhaarVerification />} />
        <Route path="/verify/pan" element={<PanVerification />} />
        <Route path="/verify/video" element={<VideoAuth />} />
        <Route path="/verify/voice" element={<AudioRecognition />} />
        <Route path="/query-submission" element={<QuerySubmission />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat-bot" element={<ChatBot />} />



        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;