// src/pages/DashboardPage.tsx (Final, Fully Functional, and Corrected)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Roadmap, SuggestionHistoryItem, RoadmapNode } from '../types';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { PlusIcon, PencilIcon, TrashIcon, BookOpenIcon, ClockIcon, SparklesIcon, LightBulbIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { GridPattern } from '../components/ui/grid-pattern';
import AddToRoadmapModal from '../components/dashboard/AddToRoadmapModal';

const NODE_COLORS = ['bg-pink-200', 'bg-yellow-200', 'bg-green-200', 'bg-teal-200', 'bg-orange-200', 'bg-blue-200'];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestionHistoryItem | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const roadmapsQuery = query(collection(db, 'roadmaps'), where('userId', '==', user.uid));
        const suggestionsQuery = query(collection(db, 'suggestions'), where('userId', '==', user.uid));
        
        const [roadmapsSnapshot, suggestionsSnapshot] = await Promise.all([ getDocs(roadmapsQuery), getDocs(suggestionsQuery) ]);

        const roadmapsData = roadmapsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Roadmap));
        const suggestionsData = suggestionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SuggestionHistoryItem));

        roadmapsData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
        suggestionsData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());

        setRoadmaps(roadmapsData);
        setSuggestions(suggestionsData);
      } catch (error) {
        toast.error('Failed to load dashboard data.');
        console.error("Firestore fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);
  
  // --- ALL HANDLER FUNCTIONS ARE NOW CORRECTLY INSIDE THE COMPONENT ---

  const handleOpenAddToRoadmapModal = (suggestion: SuggestionHistoryItem) => {
    setSelectedSuggestion(suggestion);
    setIsModalOpen(true);
  };
  
  const handleConfirmAddToRoadmap = async (roadmapId: string) => {
    if (!selectedSuggestion) {
      toast.error("Error: No suggestion was selected. Please try again.");
      return;
    }
    const toastId = toast.loading('Adding suggestions to roadmap...');
    try {
      const roadmapRef = doc(db, 'roadmaps', roadmapId);
      const roadmapSnap = await getDoc(roadmapRef);
      if (!roadmapSnap.exists()) throw new Error("Roadmap not found.");
      
      const existingNodes = roadmapSnap.data().nodes || [];
      const newNodes = selectedSuggestion.suggestions.learningPath.map((step, index) => {
        const colorIndex = (existingNodes.length + index) % NODE_COLORS.length;
        const gridCols = 4; const xSpacing = 300; const ySpacing = 150;
        const x = 50 + ((existingNodes.length + index) % gridCols) * xSpacing;
        const y = 50 + Math.floor((existingNodes.length + index) / gridCols) * ySpacing;
        
        const newNode: RoadmapNode = { id: `${Date.now()}-${index}`, title: step, description: "From AI Suggestion", position: { x, y }, color: NODE_COLORS[colorIndex] };
        return newNode;
      });

      const combinedNodes = [...existingNodes, ...newNodes];
      await updateDoc(roadmapRef, { nodes: combinedNodes });

      toast.success('Learning path added to your roadmap!', { id: toastId });
      setIsModalOpen(false);
      setSelectedSuggestion(null);
      navigate(`/roadmap/${roadmapId}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add suggestions.', { id: toastId });
    }
  };

  const handleCreateNewRoadmap = async () => {
    if (!user) return;
    const newRoadmapName = prompt('Enter a name for your new roadmap:', 'My Career Plan');
    if (newRoadmapName && newRoadmapName.trim() !== '') {
      const toastId = toast.loading('Creating new roadmap...');
      try {
        const docRef = await addDoc(collection(db, 'roadmaps'), { name: newRoadmapName, userId: user.uid, createdAt: serverTimestamp(), nodes: [] });
        toast.success('Roadmap created!', { id: toastId });
        navigate(`/roadmap/${docRef.id}`);
      } catch (error) {
        toast.error('Failed to create roadmap.', { id: toastId });
      }
    }
  };

  const handleDeleteRoadmap = async (id: string) => {
    if(window.confirm('Are you sure you want to delete this roadmap? This action cannot be undone.')) {
        try {
            await deleteDoc(doc(db, 'roadmaps', id));
            setRoadmaps(roadmaps.filter(r => r.id !== id));
            toast.success('Roadmap deleted.');
        } catch (error) {
            toast.error('Failed to delete roadmap.');
        }
    }
  };

  return (
    <>
      <AddToRoadmapModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        roadmaps={roadmaps}
        suggestion={selectedSuggestion}
        onConfirm={handleConfirmAddToRoadmap}
      />
      <div className="relative flex w-full min-h-screen">
        <GridPattern className="[mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
        <aside className="w-64 bg-white/30 p-4 h-screen sticky top-0 backdrop-blur-md border-r">
          <div className="text-2xl font-bold text-brand-purple mb-10 mt-4 px-2">ARO</div>
          <Sidebar />
        </aside>
        <main className="flex-1 p-8 sm:p-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Button onClick={handleCreateNewRoadmap}><PlusIcon className="w-5 h-5 mr-2" />New Roadmap</Button>
          </div>
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Roadmaps</h2>
            {isLoading ? <p>Loading...</p> : roadmaps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="bg-white/50 p-6 rounded-2xl shadow-md hover:shadow-lg flex flex-col">
                    <h3 className="text-xl font-bold mb-2 flex-grow">{roadmap.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-4"><ClockIcon className="w-4 h-4 mr-2" />Created: {roadmap.createdAt?.toDate().toLocaleDateString() || 'N/A'}</div>
                    <div className="flex space-x-2 mt-auto">
                      <Button onClick={() => navigate(`/roadmap/${roadmap.id}`)} className="flex-1"><PencilIcon className="w-4 h-4 mr-2" />Edit</Button>
                      <Button onClick={() => handleDeleteRoadmap(roadmap.id)} variant="secondary" className="!p-2"><TrashIcon className="w-5 h-5 text-red-500" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-10 border-2 border-dashed rounded-2xl">
                    <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No roadmaps yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Click "New Roadmap" to get started.</p>
                </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">AI Suggestions History</h2>
            {isLoading ? <p>Loading...</p> : suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => handleOpenAddToRoadmapModal(item)} 
                    className="w-full text-left bg-white/50 p-5 rounded-2xl shadow-md group hover:shadow-lg hover:border-indigo-400 border border-transparent transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">Suggestion for: <span className="text-brand-purple">{item.inputs.goals}</span></p>
                        <p className="text-sm text-gray-500">Based on your skills in "{item.inputs.skills}"</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-400 pl-4">{item.createdAt?.toDate().toLocaleString() || 'N/A'}</p>
                        <div className="mt-2 flex items-center text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <PlusCircleIcon className="w-5 h-5 mr-1" />
                          <span className="text-sm font-bold">Add to Roadmap</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold flex items-center"><SparklesIcon className="w-4 h-4 mr-2 text-yellow-500" />Top suggested role: <span className="ml-1 font-bold">{item.suggestions.jobRoles[0]?.title || 'N/A'}</span></p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
                <div className="text-center py-10 border-2 border-dashed rounded-2xl">
                    <LightBulbIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No suggestion history</h3>
                    <p className="mt-1 text-sm text-gray-500">Your AI-generated advice will appear here.</p>
                </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardPage;