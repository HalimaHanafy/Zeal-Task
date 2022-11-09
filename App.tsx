import React from 'react';
import { Router } from './src/routes/Router';
import { AuthProvider } from './src/contexts/Auth';
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>

        <Router />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
