import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { ArrowLeft, BookOpen, BrainCircuit, Lightbulb, MapPin } from 'lucide-react';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapNeuralArchives({ onNavigate }: CityMapProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <button 
        onClick={() => onNavigate('map')}
        className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to World Map
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-blue-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2">The Neural Archives</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-blue-500/50 rounded bg-blue-500/10 text-blue-400 mb-4">
              Lore / Experimental
            </div>
            <p className="text-slate-400 text-sm mb-6">
              A massive repository of ancient human knowledge and experimental AI algorithms. Unlock new skills and uncover the past.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Zones</h3>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <BookOpen className="w-4 h-4 text-blue-400" /> The Great Library
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <BrainCircuit className="w-4 h-4 text-neon-fuchsia" /> Algorithm Forge
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Memory Restoration
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Interactive Points */}
            <div className="absolute top-1/4 left-1/3 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-blue-400/30 bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/30 transition-all animate-pulse">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">The Great Library</div>
                <div className="text-[10px] text-blue-400">Lore & History</div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-fuchsia/30 bg-neon-fuchsia/10 flex items-center justify-center group-hover:bg-neon-fuchsia/30 transition-all">
                <BrainCircuit className="w-6 h-6 text-neon-fuchsia" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Algorithm Forge</div>
                <div className="text-[10px] text-neon-fuchsia">Skill Upgrades</div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-amber-400/30 bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-400/30 transition-all">
                <Lightbulb className="w-6 h-6 text-amber-400" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Memory Restoration</div>
                <div className="text-[10px] text-amber-400">Entity Awakening</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
