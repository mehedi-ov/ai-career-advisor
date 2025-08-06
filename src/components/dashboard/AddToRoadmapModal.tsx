// src/components/dashboard/AddToRoadmapModal.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';
import type { Roadmap } from '../../types';

interface AddToRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmaps: Roadmap[];
  learningStep: string | null;
  onConfirm: (roadmapId: string) => void;
}

const AddToRoadmapModal = ({
  isOpen,
  onClose,
  roadmaps,
  learningStep,
  onConfirm,
}: AddToRoadmapModalProps) => {
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && roadmaps.length > 0) {
      setSelectedRoadmapId(roadmaps[0].id);
    } else {
      setSelectedRoadmapId(null);
    }
  }, [isOpen, roadmaps]);

  const handleConfirm = () => {
    if (selectedRoadmapId) {
      onConfirm(selectedRoadmapId);
    }
  };

  // Don't render anything if there's no learning step to add
  if (!learningStep) return null;

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
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add Step to Roadmap</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Select a roadmap to add the learning step: "<span className="font-bold text-brand-purple">{learningStep}</span>"
            </p>

            {roadmaps.length > 0 ? (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-500">Your Roadmaps</label>
                <div className="max-h-48 overflow-y-auto pr-2 border-y dark:border-slate-700 py-2">
                  {roadmaps.map(roadmap => (
                    <div 
                      key={roadmap.id}
                      onClick={() => setSelectedRoadmapId(roadmap.id)}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${selectedRoadmapId === roadmap.id ? 'bg-indigo-50 dark:bg-indigo-900/50' : 'hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                    >
                      <input
                        type="radio"
                        name="roadmap-selection"
                        checked={selectedRoadmapId === roadmap.id}
                        readOnly
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="ml-3 font-semibold text-gray-800 dark:text-gray-200">{roadmap.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-700">No roadmaps found.</p>
                <p className="text-sm text-gray-500">Please create a new roadmap first to add suggestions.</p>
              </div>
            )}
            
            <div className="mt-8 flex justify-end space-x-3">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button onClick={handleConfirm} disabled={!selectedRoadmapId}>Confirm & Add Step</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddToRoadmapModal;