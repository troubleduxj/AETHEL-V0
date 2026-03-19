import React from 'react';
import { motion } from 'motion/react';
import { AIEntity } from '../types';

interface EntityCardProps {
  entity: AIEntity;
  onClick: (id: string) => void;
}

const rarityColors = {
  Common: 'text-slate-400 border-slate-400/30',
  Rare: 'text-blue-400 border-blue-400/30',
  Epic: 'text-fuchsia-400 border-fuchsia-400/30',
  Anomaly: 'text-red-500 border-red-500/30 animate-pulse',
};

export function EntityCard({ entity, onClick }: EntityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(entity.id)}
      className="relative group cursor-pointer h-80 rounded-2xl overflow-hidden border border-white/10 bg-slate-900/80"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={entity.imageUrl} 
          alt={entity.name} 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-mono text-xs text-neon-cyan/70 tracking-widest uppercase">{entity.designation}</div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">{entity.name}</h3>
          </div>
          <div className={`px-2 py-1 text-[10px] font-mono uppercase border rounded-full backdrop-blur-sm ${rarityColors[entity.rarity]}`}>
            {entity.rarity}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">SYNC RATE</span>
            <span className="text-neon-cyan">{entity.syncRate}%</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${entity.syncRate}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            />
          </div>
          
          <div className="flex justify-between items-end pt-2">
            <div className="text-xs text-slate-400">
              LVL <span className="text-white font-mono text-sm">{entity.level}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${entity.status === 'Idle' ? 'bg-slate-500' : entity.status === 'Processing' ? 'bg-neon-emerald' : entity.status === 'Fragmented' ? 'bg-red-500' : 'bg-neon-fuchsia'}`}></span>
              {entity.status}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 z-20 border-2 border-transparent group-hover:border-neon-cyan/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}
