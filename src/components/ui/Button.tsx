// src/components/ui/Button.tsx (The Master Button Component)

import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variantClasses = {
      primary: 'bg-brand-purple text-white shadow-button hover:-translate-y-0.5 focus:ring-brand-purple',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    };

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], "px-6 py-3", className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Button;