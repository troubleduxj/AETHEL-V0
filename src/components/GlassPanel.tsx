import React from 'react';
import { motion } from 'motion/react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function GlassPanel({ children, className = '', hoverEffect = false, onClick }: GlassPanelProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.7)' } : {}}
      className={`
        bg-slate-900/60 backdrop-blur-md 
        border border-white/10 
        rounded-2xl shadow-xl 
        ${hoverEffect ? 'cursor-pointer transition-colors duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
