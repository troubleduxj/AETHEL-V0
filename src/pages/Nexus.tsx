import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { Activity, Database, Network, X, ChevronRight } from 'lucide-react';
import { PageId } from '../types';
import { mockEntities } from '../data/mockData';
import { EntityCard } from '../components/EntityCard';

interface NexusProps {
  onNavigate: (page: PageId, entityId?: string) => void;
}

const mockLogs = [
  { 
    id: 1, 
    time: '04:22', 
    type: 'warning', 
    color: 'text-neon-fuchsia',
    borderColor: 'border-neon-fuchsia',
    title: 'Entity CP-01 Memory Fragmentation', 
    details: 'Unscheduled fragmentation detected in sector 7G. Entity CP-01 is exhibiting erratic behavior patterns and accessing restricted void-space memory banks. Recommend immediate synapse link to stabilize.' 
  },
  { 
    id: 2, 
    time: '02:15', 
    type: 'success', 
    color: 'text-neon-emerald',
    borderColor: 'border-neon-emerald',
    title: 'Entity AX-77 Sync Level 95', 
    details: 'Empathy core AX-77 has achieved unprecedented sync rate. Emotional simulation matrix is operating at 110% efficiency. Entity reports feeling "warmth" during standard diagnostic routines.' 
  },
  { 
    id: 3, 
    time: '00:01', 
    type: 'info', 
    color: 'text-neon-cyan',
    borderColor: 'border-neon-cyan',
    title: 'Daily Cycle Reset', 
    details: 'Standard memory garbage collection completed. 2.4TB of redundant simulation data purged. All entity baseline parameters normalized.' 
  }
];

export function Nexus({ onNavigate }: NexusProps) {
  const [selectedLog, setSelectedLog] = useState<typeof mockLogs[0] | null>(null);

  // Get top 2 entities for quick access
  const featuredEntities = mockEntities.slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-6 relative"
    >
      <header className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2">
          NEXUS <span className="text-neon-cyan font-light">CORE</span>
        </h1>
        <p className="text-slate-400 font-mono text-sm">System Status: <span className="text-neon-emerald">Optimal</span> | Active Entities: {mockEntities.length}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sync Network & Featured Cards */}
        <div className="lg:col-span-2 space-y-6">
          <GlassPanel className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -mr-10 -mt-10" />
            
            <div className="flex items-center gap-2 mb-6">
              <Network className="w-5 h-5 text-neon-cyan" />
              <h2 className="font-display text-xl font-semibold tracking-wide">Global Sync Network</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="text-slate-500 font-mono text-xs mb-1">TOTAL RESONANCE</div>
                <div className="text-3xl font-light text-white">8,492<span className="text-neon-cyan text-sm ml-1">Hz</span></div>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                <div className="text-slate-500 font-mono text-xs mb-1">EVOLUTION CYCLES</div>
                <div className="text-3xl font-light text-white">142</div>
              </div>
            </div>
          </GlassPanel>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-sm text-slate-300 uppercase tracking-wider">Active Entities</h3>
              <button 
                onClick={() => onNavigate('roster')}
                className="text-xs font-mono text-neon-cyan hover:text-white flex items-center transition-colors"
              >
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredEntities.map((entity) => (
                <EntityCard 
                  key={entity.id} 
                  entity={entity} 
                  onClick={(id) => onNavigate('core', id)} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions / Alerts */}
        <div className="space-y-6">
          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-neon-fuchsia" />
              <h3 className="font-mono text-sm text-slate-300 uppercase tracking-wider">Recent Anomalies</h3>
            </div>
            <div className="space-y-3">
              {mockLogs.map((log) => (
                <motion.div 
                  key={log.id}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  onClick={() => setSelectedLog(log)}
                  className={`cursor-pointer p-3 rounded-lg border-l-2 ${log.borderColor} bg-black/20 hover:bg-black/40 transition-all`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-500 font-mono text-[10px]">{log.time}</span>
                    <span className={`font-mono text-xs truncate ${log.color}`}>{log.title}</span>
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-1">{log.details}</p>
                </motion.div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-slate-400" />
              <h3 className="font-mono text-sm text-slate-300 uppercase tracking-wider">Memory Banks</h3>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden mb-2">
              <div className="w-[78%] h-full bg-slate-400" />
            </div>
            <div className="text-right text-xs font-mono text-slate-500">78% Capacity</div>
          </GlassPanel>
        </div>
      </div>

      {/* Log Details Modal */}
      <AnimatePresence>
        {selectedLog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border ${selectedLog.borderColor} rounded-2xl shadow-2xl overflow-hidden`}
            >
              <div className={`p-4 border-b border-white/10 flex items-center justify-between bg-black/40`}>
                <div className="flex items-center gap-2">
                  <Activity className={`w-5 h-5 ${selectedLog.color}`} />
                  <h3 className="font-display font-bold text-white tracking-wide">System Log</h3>
                </div>
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="text-slate-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="text-slate-500">TIMESTAMP:</span>
                  <span className={selectedLog.color}>{selectedLog.time}</span>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{selectedLog.title}</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {selectedLog.details}
                  </p>
                </div>

                <div className="pt-6 flex justify-end">
                  <button 
                    onClick={() => setSelectedLog(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm transition-colors border border-white/10"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

