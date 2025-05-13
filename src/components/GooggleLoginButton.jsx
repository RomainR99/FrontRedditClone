// src/components/GoogleLoginButton.jsx
import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:1337/api/connect/google';
  };

  return (
    <button onClick={handleGoogleLogin}>
      Se connecter avec Google
    </button>
  );
};

export default GoogleLoginButton;