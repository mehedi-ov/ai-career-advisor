// src/components/auth/LoginForm.tsx (Corrected)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button'; // <-- Correctly importing our styled button
import Input from '../ui/Input';
import Card from '../ui/Card';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logIn(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in.');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-gray-500">Log in to continue your journey.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {/* THIS IS THE FIX - Using the <Button> component */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Log In'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-brand-purple hover:underline">
          Sign Up
        </Link>
      </p>
    </Card>
  );
};

export default LoginForm;