// src/components/roadmap/EditNodeModal.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { RoadmapNode } from '../../types';
import Button from '../ui/Button';

interface EditNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: RoadmapNode | null;
  onSave: (updatedNode: RoadmapNode) => void;
}

const EditNodeModal = ({ isOpen, onClose, node, onSave }: EditNodeModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (node) {
      setTitle(node.title);
      setDescription(node.description);
    }
  }, [node]);

  const handleSave = () => {
    if (node) {
      onSave({ ...node, title, description });
      onClose();
    }
  };

  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Step</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-500">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-3 border-2 border-gray-200 rounded-lg bg-gray-50 h-32 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditNodeModal;