// src/components/advisor/SuggestionsPanel.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import type { AIResponse, Roadmap, RoadmapNode } from '../../types';
import AddToRoadmapModal from '../dashboard/AddToRoadmapModal';
import { MapIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

const NODE_COLORS = ['bg-pink-200', 'bg-yellow-200', 'bg-green-200', 'bg-teal-200', 'bg-orange-200', 'bg-blue-200'];

// --- FIXED SuggestionCard ---
const SuggestionCard = ({ children, colorClass }: { children: React.ReactNode, colorClass: string }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className="bg-white p-4 rounded-xl border-2 border-gray-200 flex items-start space-x-4 shadow-sm w-full text-left">
      <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${colorClass}`}>
        {childrenArray[0]} {/* Icon */}
      </div>
      <div>
        {childrenArray[1]} {/* Content */}
      </div>
    </div>
  );
};

const SuggestionsPanel = ({ isLoading, suggestions }: { isLoading: boolean; suggestions: AIResponse | null }) => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepToAdd, setStepToAdd] = useState<string | null>(null);

  useEffect(() => {
    if (user && suggestions) {
      const fetchRoadmaps = async () => {
        const q = query(collection(db, 'roadmaps'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setRoadmaps(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Roadmap)));
      };
      fetchRoadmaps();
    }
  }, [user, suggestions]);

  const handleOpenModal = (step: string) => {
    setStepToAdd(step);
    setIsModalOpen(true);
  };

  const handleConfirmAddToRoadmap = async (roadmapId: string) => {
    if (!stepToAdd) return;
    const toastId = toast.loading('Adding step to roadmap...');
    try {
      const roadmapRef = doc(db, 'roadmaps', roadmapId);
      const roadmapSnap = await getDoc(roadmapRef);
      if (!roadmapSnap.exists()) throw new Error("Roadmap not found.");

      const existingNodes = roadmapSnap.data().nodes || [];
      const colorIndex = existingNodes.length % NODE_COLORS.length;
      const gridCols = 4; const xSpacing = 300; const ySpacing = 150;
      const x = 50 + (existingNodes.length % gridCols) * xSpacing;
      const y = 50 + Math.floor(existingNodes.length / gridCols) * ySpacing;

      const newNode: RoadmapNode = {
        id: `${Date.now()}`,
        title: stepToAdd,
        description: "From AI Suggestion",
        position: { x, y },
        color: NODE_COLORS[colorIndex]
      };

      await updateDoc(roadmapRef, { nodes: [...existingNodes, newNode] });

      toast.success('Step added to your roadmap!', { id: toastId });
      setIsModalOpen(false);
      setStepToAdd(null);
    } catch (error) {
      toast.error('Failed to add step.', { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-24 bg-gray-200 rounded-xl"></div>
        <div className="h-24 bg-gray-200 rounded-xl"></div>
        <div className="h-24 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!suggestions) {
    return (
      <div className="flex items-center justify-center h-full text-center text-gray-500 pt-10">
        <p>Your personalized career suggestions will appear here.</p>
      </div>
    );
  }

  return (
    <>
      <AddToRoadmapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        roadmaps={roadmaps}
        learningStep={stepToAdd}
        onConfirm={handleConfirmAddToRoadmap}
      />
      <div className="space-y-4">
        {suggestions.jobRoles.map((role, i) => (
          <a
            key={`job-${i}`}
            href={`https://www.google.com/search?q=${encodeURIComponent(role.title + " jobs")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SuggestionCard colorClass="bg-red-400">
              <BriefcaseIcon className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-bold text-gray-800">Job title</h4>
                <p className="text-sm text-gray-500 mt-1">{role.title}</p>
              </div>
            </SuggestionCard>
          </a>
        ))}
        {suggestions.learningPath.map((step, i) => (
          <button key={`path-${i}`} onClick={() => handleOpenModal(step)} className="w-full">
            <SuggestionCard colorClass={i % 2 === 0 ? "bg-orange-400" : "bg-blue-400"}>
              <MapIcon className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-bold text-gray-800">Learning Path</h4>
                <p className="text-sm text-gray-500 mt-1">{step}</p>
              </div>
            </SuggestionCard>
          </button>
        ))}
        {suggestions.recommendedCourses.map((course, i) => (
          <a
            key={`course-${i}`}
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SuggestionCard colorClass="bg-green-400">
              <AcademicCapIcon className="w-6 h-6 text-white" />
              <div>
                <h4 className="font-bold text-gray-800">Resources</h4>
                <p className="text-sm text-gray-500 mt-1">{course.name}</p>
              </div>
            </SuggestionCard>
          </a>
        ))}
      </div>
    </>
  );
};

export default SuggestionsPanel;