import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import VideoBackground from '../components/VideoBackground';
import LoginForm from '../components/LoginForm';
import { MEDIA_URLS } from '../constants/media';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/farmer" replace />;
  }

  return (
    <VideoBackground
      videoUrl={MEDIA_URLS.farmVideo}
      className="min-h-screen"
    >
      <LoginForm onSuccess={() => window.location.href = '/farmer'} />
    </VideoBackground>
  );
};

export default Login;