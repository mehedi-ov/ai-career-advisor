// src/components/layout/Navbar.tsx (Polished Version)

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { ArrowLeftOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    // The classes here create the modern, blurry, sticky effect
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-indigo-600">
              ARO
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="secondary" onClick={handleLogout}>
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="primary" onClick={() => navigate('/signup')}>
                   <UserPlusIcon className="h-5 w-5 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;