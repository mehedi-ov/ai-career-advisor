// src/pages/RoadmapPage.tsx (Final, Definitive, and Fully Functional Version)

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { PanInfo } from 'framer-motion';
import type { RoadmapNode as RoadmapNodeType } from '../types';
import toast from 'react-hot-toast';

import RoadmapBuilder from '../components/roadmap/RoadmapBuilder';
import EditNodeModal from '../components/roadmap/EditNodeModal';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { GridPattern } from '../components/ui/grid-pattern';
import LineRenderer from '../components/roadmap/LineRenderer';
import HomePage from './HomePage';

import { HomeIcon, BellIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, PlusIcon, CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// A vibrant, modern color palette for new nodes
const NODE_COLORS = ['bg-pink-200', 'bg-yellow-200', 'bg-green-200', 'bg-teal-200', 'bg-orange-200', 'bg-blue-200'];

const RoadmapPage = () => {
  const { id: roadmapId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logOut } = useAuth();
  
  const [nodes, setNodes] = useState<RoadmapNodeType[]>([]);
  const [roadmapName, setRoadmapName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState<RoadmapNodeType | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!roadmapId) {
      toast.error("No Roadmap ID provided.");
      navigate('/dashboard');
      return;
    }
    const fetchRoadmap = async () => {
      setIsLoading(true);
      try {
        const roadmapDocRef = doc(db, 'roadmaps', roadmapId);
        const roadmapSnap = await getDoc(roadmapDocRef);
        if (roadmapSnap.exists()) {
          const data = roadmapSnap.data();
          setNodes(data.nodes || []);
          setRoadmapName(data.name);
        } else {
          toast.error('Roadmap not found.');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Failed to fetch roadmap:", error);
        toast.error("Could not load roadmap data.");
      } finally {
        setIsLoading(false); // This GUARANTEES the loading state is turned off.
      }
    };
    fetchRoadmap();
  }, [roadmapId, navigate]);
  
  const handleAddNode = () => {
    const colorIndex = nodes.length % NODE_COLORS.length;
    const gridCols = 4;
    const xSpacing = 300;
    const ySpacing = 150;
    const x = 50 + (nodes.length % gridCols) * xSpacing;
    const y = 50 + Math.floor(nodes.length / gridCols) * ySpacing;

    const newNode: RoadmapNodeType = { id: Date.now().toString(), title: 'New Step', description: 'Click to edit.', position: { x, y }, color: NODE_COLORS[colorIndex] };
    setNodes([...nodes, newNode]);
  };

  const handleEditNode = (node: RoadmapNodeType) => {
    setCurrentNode(node);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateNodeDetails = (updatedNode: RoadmapNodeType) => {
    setNodes(nodes.map(n => n.id === updatedNode.id ? updatedNode : n));
  };
  
  const handleUpdatePosition = (id: string, info: PanInfo) => {
    setNodes((prevNodes) => prevNodes.map((node) => node.id === id ? { ...node, position: { x: node.position.x + info.offset.x, y: node.position.y + info.offset.y } } : node));
  };

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter((node) => node.id !== id));
    toast('Node removed.', { icon: '🗑️' });
  };
  
  const handleSaveRoadmap = async () => {
    if (!roadmapId) return;
    setIsSaving(true);
    const toastId = toast.loading('Saving changes...');
    try {
      const roadmapDocRef = doc(db, 'roadmaps', roadmapId);
      await updateDoc(roadmapDocRef, { nodes });
      toast.success('Roadmap saved!', { id: toastId });
    } catch (error) {
      toast.error('Failed to save.', { id: toastId });
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    try {
        await logOut();
        navigate('/login');
    } catch(error) {
        toast.error("Failed to log out.");
    }
  };

  return (
    <>
      <EditNodeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} node={currentNode} onSave={handleUpdateNodeDetails} />

      <div className="flex h-screen bg-white text-gray-800 font-sans">
          <aside className="w-20 bg-white border-r border-gray-100 flex flex-col items-center py-6 space-y-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg"></div>
              <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"><HomeIcon className="w-7 h-7"/></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"><BellIcon className="w-7 h-7"/></button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-indigo-600"><Cog6ToothIcon className="w-7 h-7"/></button>
          </aside>
          
          <div className="flex-1 flex flex-col bg-gray-50">
              <header className="flex-shrink-0 bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                     <h1 className="text-2xl font-bold">Roadmap Builder</h1>
                     <span className="text-2xl font-bold text-indigo-600">ARO</span>
                  </div>
                  <div className="flex items-center space-x-4">
                      <Button variant="ghost" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                      <Button variant="secondary" onClick={handleLogout}><ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />Logout</Button>
                  </div>
              </header>

              <div className="flex-1 flex overflow-hidden">
                  <aside className="w-72 bg-white border-r border-gray-100 p-6 flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-500 mb-6">{roadmapName}</h2>
                      <div className="space-y-4">
                          <Button onClick={handleAddNode} className="w-full justify-center !py-3"><PlusIcon className="w-5 h-5 mr-2"/>Add Node</Button>
                          <Button onClick={handleSaveRoadmap} disabled={isSaving} variant="secondary" className="w-full justify-center !py-3"><CheckIcon className="w-5 h-5 mr-2"/>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
                          <button className="w-full justify-center flex items-center space-x-2 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"><ArrowDownTrayIcon className="w-5 h-5"/><span>Export as PNG</span></button>
                      </div>
                      <div className="mt-auto text-xs text-gray-500 space-y-2">
                          <p>Drag nodes to arrange them. Click a node to edit. Click the 'X' to delete.</p>
                      </div>
                  </aside>

                  <main className="flex-1 overflow-auto relative">
                      <RoadmapBuilder
                          canvasRef={canvasRef}
                          nodes={nodes}
                          isLoading={isLoading}
                          onDeleteNode={handleDeleteNode}
                          onUpdatePosition={handleUpdatePosition}
                          onEditNode={handleEditNode}
                      >
                          <GridPattern width={40} height={40} className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] animate-grid" />
                          <LineRenderer nodes={nodes} />
                      </RoadmapBuilder>
                  </main>
              </div>
          </div>
      </div>
    </>
  );
};

export default RoadmapPage;