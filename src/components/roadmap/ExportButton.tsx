// src/components/roadmap/ExportButton.tsx (Corrected)

import React from 'react';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// The Props interface is where the fix is
interface Props {
  // This line correctly types the ref prop
  roadmapRef: React.RefObject<HTMLElement>;
  roadmapName: string;
}

const ExportButton = ({ roadmapRef, roadmapName }: Props) => {
  const handleExport = async () => {
    if (!roadmapRef.current) {
      toast.error('Cannot export. Roadmap element not found.');
      return;
    }

    const toastId = toast.loading('Generating image...');

    try {
      const canvas = await html2canvas(roadmapRef.current, {
        backgroundColor: '#f9fafb', // Match light theme background
        useCORS: true,
        scale: 1.5, // Increase for better resolution
      });
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${roadmapName.replace(/\s+/g, '_') || 'roadmap'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Roadmap exported!', { id: toastId });
    } catch (error) {
      console.error('Failed to export roadmap:', error);
      toast.error('Export failed. Please try again.', { id: toastId });
    }
  };

  return (
    <Button onClick={handleExport} variant="secondary">
      <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
      Export as PNG
    </Button>
  );
};

export default ExportButton;