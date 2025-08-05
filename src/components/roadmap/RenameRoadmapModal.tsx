// src/components/roadmap/RenameRoadmapModal.tsx (NEW FILE)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
}

const RenameRoadmapModal = ({ isOpen, onClose, currentName, onSave }: RenameModalProps) => {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewName(currentName);
    }
  }, [isOpen, currentName]);

  const handleSave = () => {
    if (newName.trim() !== '') {
      onSave(newName);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Rename Roadmap</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Roadmap Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mt-1 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
                autoFocus
              />
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave}>Save Name</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RenameRoadmapModal;