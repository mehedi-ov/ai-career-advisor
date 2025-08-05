import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Meteors } from '../components/ui/Meteors';

const LoginPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-8rem)] p-4 overflow-hidden">
      <LoginForm />
      <Meteors number={20} />
    </div>
  );
};

export default LoginPage;