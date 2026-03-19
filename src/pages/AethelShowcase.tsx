import React from 'react';
import { motion } from 'framer-motion';
import { AethelCard } from '../components/AethelCard';
import { entities } from '../data';
import { PageId } from '../types';

interface AethelShowcaseProps {
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function AethelShowcase({ onNavigate }: AethelShowcaseProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center"
    >
      <header className="mb-16 text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4"
        >
          AETHEL: <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-fuchsia">AI ENTITY NEXUS</span>
        </motion.h1>
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 font-mono text-sm uppercase tracking-widest"
        >
          Next-Generation Digital Lifeforms
        </motion.p>
      </header>

      <div className="flex flex-wrap justify-center gap-12 perspective-[2000px]">
        {entities.map((entity, index) => (
          <motion.div
            key={entity.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <AethelCard entity={entity} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
