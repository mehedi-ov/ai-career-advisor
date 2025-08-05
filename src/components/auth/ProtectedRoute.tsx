// src/components/auth/ProtectedRoute.tsx (Final and Complete)

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // While the auth state is being determined, show a loading indicator.
    // This prevents a "flash" of the login page for already-logged-in users.
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    // If loading is finished and there's no user, redirect them to the login page.
    // We also pass the page they were trying to access so we can redirect them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If loading is finished and a user exists, show the protected content.
  return <>{children}</>;
};

export default ProtectedRoute;