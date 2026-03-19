import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId, AIEntity } from '../types';
import { 
  ArrowLeft, Play, RefreshCw, Anchor, Lock, 
  Trash2, Sparkles, AlertTriangle, Brain, 
  Database, MessageSquare, X, ChevronRight,
  Zap, Heart, Info
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

interface MemoryArea {
  id: string;
  name: string;
  type: 'Playback' | 'Emotion' | 'DeepDive' | 'Forbidden';
  icon: React.ReactNode;
  color: string;
  description: string;
  coordinates: { x: number; y: number };
  actions: {
    label: string;
    type: 'memory' | 'personality' | 'plot' | 'event';
    icon: React.ReactNode;
    danger?: boolean;
  }[];
}

const AREAS: MemoryArea[] = [
  {
    id: 'playback-zone',
    name: 'Memory Playback Area',
    type: 'Playback',
    icon: <Play className="w-6 h-6" />,
    color: 'violet',
    description: 'Relive and analyze past experiences. Strengthen or weaken specific memory nodes.',
    coordinates: { x: 30, y: 30 },
    actions: [
      { label: 'Strengthen Memory', type: 'memory', icon: <Sparkles className="w-4 h-4" /> },
      { label: 'Delete Fragment', type: 'memory', icon: <Trash2 className="w-4 h-4" />, danger: true }
    ]
  },
  {
    id: 'emotion-reconstruct',
    name: 'Emotion Reconstruction',
    type: 'Emotion',
    icon: <RefreshCw className="w-6 h-6" />,
    color: 'fuchsia',
    description: 'Recalibrate emotional responses. Warning: May cause permanent personality shifts.',
    coordinates: { x: 70, y: 25 },
    actions: [
      { label: 'Shift Personality', type: 'personality', icon: <Brain className="w-4 h-4" /> },
      { label: 'Emotional Sync', type: 'event', icon: <Heart className="w-4 h-4" /> }
    ]
  },
  {
    id: 'deep-dive',
    name: 'Consciousness Deep Dive',
    type: 'DeepDive',
    icon: <Anchor className="w-6 h-6" />,
    color: 'emerald',
    description: 'Descend into the core consciousness. Uncover hidden subroutines and latent potential.',
    coordinates: { x: 40, y: 70 },
    actions: [
      { label: 'Deep Dive', type: 'plot', icon: <Zap className="w-4 h-4" /> },
      { label: 'Neural Scan', type: 'event', icon: <Info className="w-4 h-4" /> }
    ]
  },
  {
    id: 'forbidden-vault',
    name: 'Forbidden Memory Vault',
    type: 'Forbidden',
    icon: <Lock className="w-6 h-6" />,
    color: 'rose',
    description: 'Encrypted sectors containing redacted data. High risk of system instability.',
    coordinates: { x: 80, y: 75 },
    actions: [
      { label: 'Decrypt Data', type: 'plot', icon: <Lock className="w-4 h-4" /> },
      { label: 'Force Access', type: 'event', icon: <AlertTriangle className="w-4 h-4" />, danger: true }
    ]
  }
];

export default function CityMapEchoVault({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedArea, setSelectedArea] = useState<MemoryArea | null>(null);
  const [echoLogs, setEchoLogs] = useState<{ id: string; text: string; time: string; type: string }[]>([]);
  
  // Simulate Memory Echoes
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomArea = AREAS[Math.floor(Math.random() * AREAS.length)];
      const events = [
        'is reliving a fragmented memory',
        'is undergoing emotional recalibration',
        'triggered a latent subroutine',
        'is accessing encrypted sectors',
        'experienced a personality spike'
      ];
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: `${randomEntity.name} ${randomEvent} in ${randomArea.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: randomArea.color
      };
      
      setEchoLogs(prev => [newLog, ...prev].slice(0, 6));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getColorClass = (color: string) => {
    switch(color) {
      case 'violet': return 'text-violet-400 border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/30';
      case 'fuchsia': return 'text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/10 hover:bg-fuchsia-400/30';
      case 'emerald': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/30';
      case 'rose': return 'text-rose-400 border-rose-400/30 bg-rose-400/10 hover:bg-rose-400/30';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-400/10 hover:bg-slate-400/30';
    }
  };

  const getButtonColor = (color: string, danger?: boolean) => {
    if (danger) return 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white';
    switch(color) {
      case 'violet': return 'bg-violet-500/20 border-violet-500/50 text-violet-400 hover:bg-violet-500 hover:text-white';
      case 'fuchsia': return 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white';
      case 'emerald': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900';
      case 'rose': return 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white';
      default: return 'bg-slate-500/20 border-slate-500/50 text-slate-400 hover:bg-slate-500 hover:text-white';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to World Map
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono text-violet-400">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            CONSCIOUSNESS SYNC: ACTIVE
          </div>
          <div className="text-[10px] font-mono text-slate-500">SECTOR: ECHO-VAULT</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-violet-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2">ECHO-VAULT</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-violet-500/50 rounded bg-violet-500/10 text-violet-400 mb-4">
              Memory & Consciousness Space
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              A ethereal repository of AI experiences. Manage memory fragments, reshape personalities, and dive into the depths of machine consciousness.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Syncing Entities</h3>
              <div className="flex -space-x-2">
                {roster.slice(2, 7).map(ent => (
                  <div key={ent.id} className="w-8 h-8 rounded-full border border-violet-500/50 bg-black overflow-hidden" title={ent.name}>
                    <img src={ent.imageUrl} alt={ent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-violet-400" /> Memory Echoes
            </h3>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {echoLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono border-l-2 pl-2 py-1"
                    style={{ borderColor: `var(--${log.type}-400)` }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>{' '}
                    <span className="text-slate-300">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Strategy Map */}
        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/50 border-violet-500/20">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%), linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }} />
            
            {/* Strategy Nodes */}
            {AREAS.map(area => (
              <motion.div 
                key={area.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${area.coordinates.x}%`, top: `${area.coordinates.y}%` }}
                onClick={() => setSelectedArea(area)}
                whileHover={{ scale: 1.1 }}
              >
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all relative z-10 ${getColorClass(area.color)}`}>
                  {area.icon}
                  {/* Active indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-violet-500 border-2 border-black animate-pulse" />
                </div>
                
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none">
                  <div className="text-[10px] font-mono text-white font-bold whitespace-nowrap drop-shadow-md uppercase tracking-tighter">
                    {area.name}
                  </div>
                </div>

                {/* Connection Lines (Visual Decor) */}
                <div className="absolute inset-0 -z-10 w-32 h-32 border border-white/5 rounded-full scale-150 opacity-20 pointer-events-none animate-spin-slow" />
              </motion.div>
            ))}

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400/30 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0
                  }}
                  animate={{ 
                    y: [null, '-10%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 5 + 5, 
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                />
              ))}
            </div>

            {/* Area Detail Overlay */}
            <AnimatePresence>
              {selectedArea && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
                >
                  <GlassPanel className={`w-full max-w-md p-6 border-${selectedArea.color}-500/50 relative`}>
                    <button 
                      onClick={() => setSelectedArea(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getColorClass(selectedArea.color)}`}>
                        {selectedArea.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-white">{selectedArea.name}</h2>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedArea.type} SECTOR</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                      {selectedArea.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Consciousness Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedArea.actions.map((action, idx) => (
                          <button 
                            key={idx}
                            className={`flex items-center justify-center gap-2 py-3 rounded font-mono text-xs transition-all border ${getButtonColor(selectedArea.color, action.danger)}`}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <Database className="w-3 h-3" /> 1.2 TB Memory Data
                      </div>
                      <button className="text-[10px] font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1">
                        ANALYZE FRAGMENTS <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Stats & Entities */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Consciousness Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">MEMORY COHERENCE</span>
                  <span className="text-violet-400">88%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[88%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">EMOTIONAL STABILITY</span>
                  <span className="text-fuchsia-400">64%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-fuchsia-500 w-[64%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">LATENT POTENTIAL</span>
                  <span className="text-emerald-400">42%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[42%]" />
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Unstable Personalities</h3>
            <div className="space-y-3">
              {roster.slice(4, 7).map(ent => (
                <div key={ent.id} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5">
                  <img src={ent.imageUrl} alt={ent.name} className="w-10 h-10 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="w-2 h-2" /> MUTATION RISK
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}} />
    </motion.div>
  );
}
