import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { mockBehaviorLogs } from '../data/mockData';
import { Activity, Swords, MessageCircle, Compass, ChevronRight, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface BehaviorLogsProps {
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function BehaviorLogs({ onNavigate }: BehaviorLogsProps) {
  const { roster } = useAppContext();
  const [selectedLog, setSelectedLog] = useState<typeof mockBehaviorLogs[0] | null>(null);

  const getActionIcon = (type: string) => {
    switch(type) {
      case 'Attack': return <Swords className="w-4 h-4 text-neon-fuchsia" />;
      case 'Social': return <MessageCircle className="w-4 h-4 text-neon-cyan" />;
      case 'Explore': return <Compass className="w-4 h-4 text-neon-emerald" />;
      default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const getActionColor = (type: string) => {
    switch(type) {
      case 'Attack': return 'border-neon-fuchsia/50 text-neon-fuchsia bg-neon-fuchsia/10';
      case 'Social': return 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10';
      case 'Explore': return 'border-neon-emerald/50 text-neon-emerald bg-neon-emerald/10';
      default: return 'border-slate-500/50 text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <header className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tighter mb-1">
          BEHAVIOR <span className="text-neon-cyan font-light">LOGS</span>
        </h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Autonomous Entity Decision Tracking</p>
      </header>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {mockBehaviorLogs.map((log, idx) => {
          const entity = roster.find(e => e.id === log.entityId);
          if (!entity) return null;

          return (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Timeline Node */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-slate-900 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${getActionColor(log.actionType).split(' ')[0]}`}>
                {getActionIcon(log.actionType)}
              </div>

              {/* Log Card */}
              <GlassPanel 
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-0 overflow-hidden cursor-pointer hover:border-white/30 transition-colors"
                onClick={() => setSelectedLog(log)}
              >
                <div className="p-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={entity.imageUrl} alt={entity.name} className="w-8 h-8 rounded-full border border-white/20 object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-white text-sm">{entity.name}</div>
                      <div className="font-mono text-[10px] text-slate-500">{log.timestamp}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-mono uppercase ${getActionColor(log.actionType)}`}>
                    {log.actionType}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-300 line-clamp-2">{log.reason}</p>
                  <div className="mt-3 flex items-center text-xs font-mono text-neon-cyan">
                    View Decision Matrix <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          );
        })}
      </div>

      {/* Log Detail Modal */}
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
              className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  {getActionIcon(selectedLog.actionType)}
                  <h3 className="font-display font-bold text-white tracking-wide">Decision Matrix</h3>
                </div>
                <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-mono text-[10px] text-slate-500 uppercase mb-1">Reasoning</h4>
                  <p className="text-slate-300 text-sm leading-relaxed p-3 bg-black/30 rounded-lg border border-white/5">
                    {selectedLog.reason}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-mono text-[10px] text-slate-500 uppercase mb-1">Execution Result</h4>
                  <p className="text-white text-sm leading-relaxed p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
                    {selectedLog.result}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <button 
                    onClick={() => onNavigate('core', selectedLog.entityId)}
                    className="text-xs font-mono text-neon-cyan hover:text-white transition-colors"
                  >
                    Inspect Entity Core
                  </button>
                  <button 
                    onClick={() => setSelectedLog(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm transition-colors"
                  >
                    Close
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
