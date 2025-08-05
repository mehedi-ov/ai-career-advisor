// src/components/roadmap/RoadmapNode.tsx (Final High-Fidelity Version)

import React from 'react';
import { motion, PanInfo } from 'framer-motion';
import type { RoadmapNode as RoadmapNodeType } from '../../types';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { cn } from '../../lib/utils';

interface Props {
  node: RoadmapNodeType;
  onUpdatePosition: (id: string, panInfo: PanInfo) => void;
  onDelete: (id: string) => void;
  constraintsRef: React.RefObject<HTMLDivElement>;
  onEdit: () => void;
}

const RoadmapNode = ({ node, onUpdatePosition, onDelete, constraintsRef, onEdit }: Props) => {
  return (
    <motion.div
      drag dragConstraints={constraintsRef} dragMomentum={false}
      onDragEnd={(_event, info) => onUpdatePosition(node.id, info)}
      initial={{ x: node.position.x, y: node.position.y, scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="absolute z-10 cursor-grab active:cursor-grabbing"
    >
      <div 
        onClick={onEdit}
        className={cn(
          "w-64 p-5 rounded-2xl shadow-lg border border-black/5 cursor-pointer transition-all duration-300 hover:shadow-xl",
          node.color // The background color is passed in directly
        )}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
          className="absolute -top-2 -right-2 text-red-500 hover:text-red-600 transition-transform hover:scale-110"
        >
          <XCircleIcon className="w-7 h-7 bg-white rounded-full shadow" />
        </button>
        <h3 className="font-bold text-gray-800">{node.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{node.description}</p>
      </div>
    </motion.div>
  );
};

export default RoadmapNode;