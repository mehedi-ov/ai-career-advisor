// src/components/roadmap/ProfileModal.tsx (NEW FILE)

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile & Settings</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500">Email</label>
                <p className="text-lg text-gray-800 dark:text-white">{user?.email || 'Not logged in'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">User ID</label>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{user?.uid}</p>
              </div>

              <div className="border-t dark:border-slate-700 pt-4">
                <label className="text-sm font-semibold text-gray-500">Theme</label>
                <div className="mt-2">
                  <button onClick={toggleTheme} className="w-full flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-700 rounded-lg">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">
                      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </span>
                    {theme === 'light' ? <MoonIcon className="w-6 h-6 text-indigo-500"/> : <SunIcon className="w-6 h-6 text-yellow-500"/>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;