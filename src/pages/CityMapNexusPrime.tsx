import React from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { ArrowLeft, Users, Database, Network, MapPin } from 'lucide-react';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapNexusPrime({ onNavigate }: CityMapProps) {
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
            <h1 className="font-display text-3xl font-bold text-white mb-2">Nexus Prime</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-neon-cyan/50 rounded bg-neon-cyan/10 text-neon-cyan mb-4">
              Social / Trade Hub
            </div>
            <p className="text-slate-400 text-sm mb-6">
              The central processing hub where entities gather to exchange data, form alliances, and upgrade their core systems.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Zones</h3>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Users className="w-4 h-4 text-neon-cyan" /> The Grand Plaza
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Database className="w-4 h-4 text-neon-emerald" /> Data Exchange Market
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Network className="w-4 h-4 text-neon-fuchsia" /> Synapse Relay Station
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-900/50">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />
            
            {/* Interactive Points */}
            <div className="absolute top-1/4 left-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-cyan/30 bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/30 transition-all animate-pulse">
                <Users className="w-6 h-6 text-neon-cyan" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">The Grand Plaza</div>
                <div className="text-[10px] text-neon-cyan">Social Hub</div>
              </div>
            </div>

            <div className="absolute top-1/2 right-1/4 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-emerald/30 bg-neon-emerald/10 flex items-center justify-center group-hover:bg-neon-emerald/30 transition-all">
                <Database className="w-6 h-6 text-neon-emerald" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Data Exchange Market</div>
                <div className="text-[10px] text-neon-emerald">Trade</div>
              </div>
            </div>

            <div className="absolute bottom-1/4 left-1/3 group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-neon-fuchsia/30 bg-neon-fuchsia/10 flex items-center justify-center group-hover:bg-neon-fuchsia/30 transition-all">
                <Network className="w-6 h-6 text-neon-fuchsia" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-xs font-mono text-white whitespace-nowrap">Synapse Relay Station</div>
                <div className="text-[10px] text-neon-fuchsia">Fast Travel</div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
