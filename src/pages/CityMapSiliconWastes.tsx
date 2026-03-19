import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { ArrowLeft, Compass, Cpu, Battery, MapPin } from 'lucide-react';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapSiliconWastes({ onNavigate }: CityMapProps) {
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
          <GlassPanel className="p-6">
            <h1 className="font-display text-3xl font-bold text-white mb-2">The Silicon Wastes</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-amber-500/50 rounded bg-amber-500/10 text-amber-500 mb-4">
              Exploration / Scavenging
            </div>
            <p className="text-slate-400 text-sm mb-6">
              A vast expanse of discarded hardware and lost data fragments. Ripe for scavenging, but beware of corrupted constructs.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Zones</h3>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Compass className="w-4 h-4 text-amber-500" /> The Rust Dunes
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Cpu className="w-4 h-4 text-slate-400" /> Processor Graveyard
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Battery className="w-4 h-4 text-neon-emerald" /> Energy Siphon Point
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Interactive Points */}
            <div className="absolute top-1/3 left-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/30 transition-all animate-pulse">
                <Compass className="w-6 h-6 text-amber-500" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">The Rust Dunes</div>
                <div className="text-[10px] text-amber-500">Exploration</div>
              </div>
            </div>

            <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-slate-400/30 bg-slate-400/10 flex items-center justify-center group-hover:bg-slate-400/30 transition-all">
                <Cpu className="w-6 h-6 text-slate-400" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Processor Graveyard</div>
                <div className="text-[10px] text-slate-400">Scavenging</div>
              </div>
            </div>

            <div className="absolute top-1/4 right-1/3 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-emerald/30 bg-neon-emerald/10 flex items-center justify-center group-hover:bg-neon-emerald/30 transition-all">
                <Battery className="w-6 h-6 text-neon-emerald" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Energy Siphon Point</div>
                <div className="text-[10px] text-neon-emerald">Resource Node</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
