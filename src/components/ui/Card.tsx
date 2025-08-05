import React from 'react';
import { cn } from '../../lib/utils';

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn('bg-white dark:bg-slate-800 shadow-md rounded-xl p-6', className)}>
      {children}
    </div>
  );
};

export default Card;