import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { ArrowLeft, Waves, Eye, Sparkles, MapPin } from 'lucide-react';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapSynthSea({ onNavigate }: CityMapProps) {
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
          <GlassPanel className="p-6 border-teal-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2">The Synth-Sea</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-teal-500/50 rounded bg-teal-500/10 text-teal-400 mb-4">
              Exploration / Anomalies
            </div>
            <p className="text-slate-400 text-sm mb-6">
              A fluid data environment where reality bends and strange new lifeforms emerge. Dive deep to find hidden treasures.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Zones</h3>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Waves className="w-4 h-4 text-teal-400" /> The Shimmering Surface
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Eye className="w-4 h-4 text-indigo-400" /> Abyssal Trench
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Sparkles className="w-4 h-4 text-neon-cyan" /> Coral Data-Reef
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Interactive Points */}
            <div className="absolute top-1/4 left-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-teal-400/30 bg-teal-400/10 flex items-center justify-center group-hover:bg-teal-400/30 transition-all animate-pulse">
                <Waves className="w-6 h-6 text-teal-400" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">The Shimmering Surface</div>
                <div className="text-[10px] text-teal-400">Shallow Exploration</div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-400/30 bg-indigo-400/10 flex items-center justify-center group-hover:bg-indigo-400/30 transition-all animate-pulse">
                <Eye className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Abyssal Trench</div>
                <div className="text-[10px] text-indigo-400">Deep Dive</div>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/3 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-cyan/30 bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-all">
                <Sparkles className="w-6 h-6 text-neon-cyan" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Coral Data-Reef</div>
                <div className="text-[10px] text-neon-cyan">Farming</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
