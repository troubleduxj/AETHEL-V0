import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { ArrowLeft, Skull, ShieldAlert, Crosshair, MapPin } from 'lucide-react';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapSector7G({ onNavigate }: CityMapProps) {
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
          <GlassPanel className="p-6 border-neon-fuchsia/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Sector 7G</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-neon-fuchsia/50 rounded bg-neon-fuchsia/10 text-neon-fuchsia mb-4">
              Combat / High Risk
            </div>
            <p className="text-slate-400 text-sm mb-6">
              A corrupted sector overrun by rogue anomalies and fragmented code. High danger, high reward. Proceed with caution.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Zones</h3>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Skull className="w-4 h-4 text-neon-fuchsia" /> The Malware Pits
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <ShieldAlert className="w-4 h-4 text-amber-500" /> Quarantine Breach
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Crosshair className="w-4 h-4 text-red-500" /> Boss Anomaly Lair
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255, 0, 85, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 85, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Interactive Points */}
            <div className="absolute top-1/2 left-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-fuchsia/30 bg-neon-fuchsia/10 flex items-center justify-center group-hover:bg-neon-fuchsia/30 transition-all animate-pulse">
                <Skull className="w-6 h-6 text-neon-fuchsia" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">The Malware Pits</div>
                <div className="text-[10px] text-neon-fuchsia">Grinding Zone</div>
              </div>
            </div>

            <div className="absolute top-1/4 right-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/30 transition-all">
                <ShieldAlert className="w-6 h-6 text-amber-500" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Quarantine Breach</div>
                <div className="text-[10px] text-amber-500">Event Area</div>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/3 group cursor-pointer">
              <div className="w-20 h-20 rounded-full border-2 border-red-500/50 bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/40 transition-all animate-pulse">
                <Crosshair className="w-8 h-8 text-red-500" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Boss Anomaly Lair</div>
                <div className="text-[10px] text-red-500">Raid</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
