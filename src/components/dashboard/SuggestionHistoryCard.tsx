// src/components/dashboard/SuggestionHistoryCard.tsx

import type { SuggestionHistoryItem } from '../../types';
import { SparklesIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

interface SuggestionCardProps {
  item: SuggestionHistoryItem;
  onClick: () => void;
}

const SuggestionHistoryCard = ({ item, onClick }: SuggestionCardProps) => {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left bg-white p-5 rounded-2xl shadow-md border border-gray-100 group hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-800">
            Suggestion for: <span className="font-bold text-brand-purple">{item.inputs.goals}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Based on your skills in "{item.inputs.skills}"
          </p>
        </div>
        <div className="flex flex-col items-end">
            <p className="text-xs text-gray-400 whitespace-nowrap pl-4">
            {item.createdAt?.toDate().toLocaleString() || 'N/A'}
            </p>
            <div className="mt-2 flex items-center text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlusCircleIcon className="w-5 h-5 mr-1" />
                <span className="text-sm font-bold">Add to Roadmap</span>
            </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-600 flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2 text-yellow-500" />
          Top suggested role: <span className="ml-2 font-bold text-gray-800">{item.suggestions.jobRoles[0]?.title || 'N/A'}</span>
        </p>
      </div>
    </button>
  );
};

export default SuggestionHistoryCard;