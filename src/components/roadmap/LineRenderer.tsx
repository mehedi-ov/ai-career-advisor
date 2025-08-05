// src/components/roadmap/LineRenderer.tsx (NEW FILE)

import React from 'react';
import type { RoadmapNode } from '../../types';

interface LineRendererProps {
  nodes: RoadmapNode[];
}

const LineRenderer = ({ nodes }: LineRendererProps) => {
  // We need at least two nodes to draw a line
  if (nodes.length < 2) {
    return null;
  }

  // A simple function to connect nodes in order of creation
  const paths = [];
  for (let i = 1; i < nodes.length; i++) {
    const prevNode = nodes[i - 1];
    const currNode = nodes[i];
    
    // Offset to connect from the center of the nodes (width is 256px, height is ~80px)
    const startX = prevNode.position.x + 128;
    const startY = prevNode.position.y + 40;
    const endX = currNode.position.x + 128;
    const endY = currNode.position.y + 40;

    // Create an SVG path string
    const pathData = `M ${startX} ${startY} L ${endX} ${endY}`;
    paths.push(pathData);
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="#CBD5E1" // A neutral gray color for the lines
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5" // Optional: makes the line dashed
        />
      ))}
    </svg>
  );
};

export default LineRenderer;