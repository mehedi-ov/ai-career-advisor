// src/components/advisor/CareerAdvisorForm.tsx (Final, Corrected Syntax)

import React, { useState } from 'react';
import { getAiSuggestions } from '../../lib/openrouter';
import type { AIResponse } from '../../types';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { PlusIcon, BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SuggestionsPanel from './SuggestionsPanel';

// --- THIS IS THE FIX ---
// The placeholder comment has been replaced with the actual, working code.
const TagButton = ({ text, active }: { text: string; active?: boolean }) => (
  <button
    type="button"
    className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 border-2 transition-colors ${
      active
        ? 'bg-indigo-600 border-indigo-600 text-white'
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
    }`}
  >
    {text === 'Interests' && !active && <PlusIcon className="w-4 h-4" />}
    {text}
  </button>
);

const CareerAdvisorForm = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState('');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIResponse | null>(null);
  const [currentInputs, setCurrentInputs] = useState({ skills: '', goals: '' });
  const [isSaved, setIsSaved] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error('You must be logged in.');
    setLoading(true);
    setSuggestions(null);
    setIsSaved(false);
    const toastId = toast.loading('Getting AI suggestions...');
    try {
      const response = await getAiSuggestions(skills, 'User interests not specified in this UI', goals);
      setSuggestions(response);
      setCurrentInputs({ skills, goals });
      toast.success('Suggestions received!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.', { id: toastId });
      setIsSaved(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSuggestion = async () => {
    if (!user || !suggestions || !currentInputs) return toast.error('No suggestion to save.');
    const toastId = toast.loading('Saving suggestion...');
    try {
      await addDoc(collection(db, 'suggestions'), {
        userId: user.uid,
        createdAt: serverTimestamp(),
        inputs: { ...currentInputs, interests: 'Not specified' },
        suggestions: suggestions,
      });
      toast.success('Suggestion saved!', { id: toastId });
      setIsSaved(true);
    } catch (error) {
      toast.error('Failed to save.', { id: toastId });
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 grid grid-cols-1 lg:grid-cols-[2fr,1.2fr] gap-12">
      {/* Left Column: Form */}
      <div className="lg:pr-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Inputting skills & career goals</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="font-semibold mb-3 block text-gray-700">Inputting skills</label>
            <div className="flex flex-wrap gap-3 items-center">
              <TagButton text="Skille Fir" />
              <TagButton text="Soilli" />
              <TagButton text="Interests" active />
            </div>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Add more skills here (e.g., Python, Figma)..."
              className="mt-4 w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
          <div>
            <label className="font-semibold mb-3 block text-gray-700">Career goals</label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Describe your main career objective..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 h-32 focus:bg-white focus:ring-2 focus:ring-indigo-300 transition"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-200 disabled:bg-indigo-300"
          >
            {loading ? 'Analyzing...' : 'Get AI suggestions'}
          </button>
        </form>
      </div>

      {/* Right Column: Suggestions */}
      <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">AI Suggestions</h2>
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
            <button
              onClick={handleSaveSuggestion}
              disabled={isSaved || !suggestions}
              title="Save Suggestion"
              className="p-2 rounded-full hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent"
            >
              <BookmarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <SuggestionsPanel isLoading={loading} suggestions={suggestions} />
      </div>
    </div>
  );
};

export default CareerAdvisorForm;