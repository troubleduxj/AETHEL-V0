import React from 'react';
import { motion } from 'motion/react';
import { AIEntity, EntityMood } from '../types';
import { MapPin, Activity } from 'lucide-react';
import { RadarChart } from './RadarChart';

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

const moodColors: Record<EntityMood, { bg: string; shadow: string; hex: string }> = {
  Stable: { bg: 'bg-emerald-500', shadow: 'shadow-[0_0_8px_rgba(16,185,129,0.8)]', hex: '#10b981' },
  Excited: { bg: 'bg-fuchsia-500', shadow: 'shadow-[0_0_8px_rgba(217,70,239,0.8)]', hex: '#d946ef' },
  Unstable: { bg: 'bg-red-500', shadow: 'shadow-[0_0_8px_rgba(239,68,68,0.8)]', hex: '#ef4444' },
  Melancholy: { bg: 'bg-blue-400', shadow: 'shadow-[0_0_8px_rgba(96,165,250,0.8)]', hex: '#60a5fa' },
  Analytical: { bg: 'bg-amber-500', shadow: 'shadow-[0_0_8px_rgba(245,158,11,0.8)]', hex: '#f59e0b' },
};

const locationNames: Record<string, string> = {
  'city-nexus-prime': 'Nexus Prime',
  'city-neural-archives': 'Origin Lab',
  'city-synth-sea': 'Synth Sea',
  'city-sector-7g': 'Sector 7G',
  'city-void-node': 'Void Node',
};

export function EntityCard({ entity, onClick }: EntityCardProps) {
  const moodInfo = moodColors[entity.mood || 'Stable'];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(entity.id)}
      className={`relative group cursor-pointer h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] ${entity.syncRate < 50 ? 'hover:glitch-active' : ''}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={entity.imageUrl} 
          alt={entity.name} 
          className={`w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity duration-500 ${entity.imageUrl.includes('picsum') ? 'grayscale contrast-125 brightness-75' : ''}`}
          referrerPolicy="no-referrer"
        />
        {/* Geometric Overlay for non-SVG images */}
        {entity.imageUrl.includes('picsum') && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" className="text-white">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="50%" cy="50%" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" className="animate-[spin_20s_linear_infinite]" />
              <rect x="20%" y="20%" width="60%" height="60%" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 15" className="animate-[spin_30s_linear_infinite_reverse]" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-5">
        <div className="flex justify-between items-start">
          <div className="relative">
            {/* Mood Pulse Ring */}
            <div className={`absolute -inset-4 rounded-full opacity-20 animate-pulse-ring ${moodInfo.bg}`} />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-mono text-[10px] text-neon-cyan/70 tracking-widest uppercase">{entity.designation}</div>
                {entity.mood && (
                  <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-black/40 border border-white/10">
                    <div className={`w-1.5 h-1.5 rounded-full ${moodInfo.bg} ${moodInfo.shadow}`} />
                    <span className="text-[8px] font-mono text-slate-300 uppercase tracking-tighter">{entity.mood}</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-neon-cyan transition-colors">{entity.name}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`px-2 py-1 text-[10px] font-mono uppercase border rounded-full backdrop-blur-sm ${rarityColors[entity.rarity]}`}>
              {entity.rarity}
            </div>
          </div>
        </div>

        {/* Center: Radar Chart */}
        {entity.radarStats && (
          <div className="flex justify-center py-2 opacity-60 group-hover:opacity-100 transition-opacity">
            <RadarChart 
              stats={entity.radarStats} 
              color={moodInfo.hex} 
              size={100}
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">SYNC RATE</span>
            <span className={entity.syncRate < 50 ? 'text-red-400 animate-pulse' : 'text-neon-cyan'}>{entity.syncRate}%</span>
          </div>
          {/* Progress Bar */}
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${entity.syncRate}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full ${entity.syncRate < 50 ? 'bg-red-500' : 'bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]'}`}
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
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </motion.div>
  );
}
