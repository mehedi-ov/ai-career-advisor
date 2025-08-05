// src/components/roadmap/RoadmapBuilder.tsx (Final, Complete, and Corrected)

import React from 'react';
import type { PanInfo } from 'framer-motion';
import type { RoadmapNode as RoadmapNodeType } from '../../types';
import RoadmapNode from './RoadmapNode';

interface BuilderProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  nodes: RoadmapNodeType[];
  isLoading: boolean;
  onUpdatePosition: (id: string, info: PanInfo) => void;
  onDeleteNode: (id: string) => void;
  onEditNode: (node: RoadmapNodeType) => void;
  children: React.ReactNode;
}

const RoadmapBuilder = ({ 
    canvasRef, 
    nodes, 
    isLoading, 
    onUpdatePosition, 
    onDeleteNode, 
    onEditNode, 
    children 
}: BuilderProps) => {
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500 font-semibold">Loading Roadmap...</p>
        </div>
    );
  }

  return (
    <div ref={canvasRef} className="w-full h-full relative">
      {/* Render the background and lines passed as children */}
      {children}
      
      {/* Render the interactive nodes on top */}
      {nodes.map((node) => (
        <RoadmapNode
          key={node.id}
          node={node}
          onUpdatePosition={onUpdatePosition}
          onDelete={onDeleteNode}
          constraintsRef={canvasRef}
          onEdit={() => onEditNode(node)}
        />
      ))}
    </div>
  );
};

export default RoadmapBuilder;