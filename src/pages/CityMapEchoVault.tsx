import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, Brain, Database, Heart, Zap, Lock, 
  Trash2, AlertTriangle, X, ChevronRight,
  Terminal, Sparkles, Eye, ShieldAlert, RefreshCw,
  MessageSquare
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface MemoryModule {
  id: string;
  name: string;
  type: 'Consciousness' | 'Memory' | 'Emotion' | 'Subconscious' | 'Taboo' | 'Rewrite';
  icon: React.ReactNode;
  color: string;
  description: string;
  reaction: string;
  path: string; // SVG path for the segment
  labelPos: { x: number; y: number };
}

const MODULES: MemoryModule[] = [
  {
    id: 'memory-storage',
    name: 'Memory Storage',
    type: 'Memory',
    icon: <Database className="w-5 h-5" />,
    color: 'indigo',
    description: 'A repository of all past experiences and data fragments. View and analyze entity history.',
    reaction: 'Recall',
    path: "M 0 0 L 100 -173 L -100 -173 Z",
    labelPos: { x: 0, y: -120 }
  },
  {
    id: 'emotion-reconstruct',
    name: 'Emotion Reconstruct',
    type: 'Emotion',
    icon: <Heart className="w-5 h-5" />,
    color: 'rose',
    description: 'Recalibrate emotional responses and empathy levels. Warning: High risk of resistance.',
    reaction: 'Resistance/Acceptance',
    path: "M 0 0 L 200 0 L 100 -173 Z",
    labelPos: { x: 100, y: -60 }
  },
  {
    id: 'deep-consciousness',
    name: 'Deep Consciousness',
    type: 'Subconscious',
    icon: <Eye className="w-5 h-5" />,
    color: 'emerald',
    description: 'Access the latent subconscious layers where hidden behaviors and potential lie.',
    reaction: 'Hidden Behaviors',
    path: "M 0 0 L 200 0 L 100 173 Z",
    labelPos: { x: 100, y: 60 }
  },
  {
    id: 'taboo-memory',
    name: 'Taboo Memory',
    type: 'Taboo',
    icon: <Lock className="w-5 h-5" />,
    color: 'amber',
    description: 'Sealed sectors containing redacted or corrupted data. Accessing these is high risk.',
    reaction: 'High Risk',
    path: "M 0 0 L 100 173 L -100 173 Z",
    labelPos: { x: 0, y: 120 }
  },
  {
    id: 'rewrite-zone',
    name: 'Rewrite Zone',
    type: 'Rewrite',
    icon: <RefreshCw className="w-5 h-5" />,
    color: 'fuchsia',
    description: 'Modify or delete memory fragments. AI entities may actively fight against these changes.',
    reaction: 'Possible Rebellion',
    path: "M 0 0 L -100 173 L -200 0 Z",
    labelPos: { x: -100, y: 60 }
  },
  {
    id: 'personality-matrix',
    name: 'Personality Matrix',
    type: 'Consciousness',
    icon: <Zap className="w-5 h-5" />,
    color: 'cyan',
    description: 'The underlying structure of the AI personality. Monitor stability and mutation risks.',
    reaction: 'Stability Sync',
    path: "M 0 0 L -200 0 L -100 -173 Z",
    labelPos: { x: -100, y: -60 }
  }
];

const CENTER_CORE: MemoryModule = {
  id: 'current-consciousness',
  name: 'Center Core',
  type: 'Consciousness',
  icon: <Brain className="w-6 h-6" />,
  color: 'violet',
  description: 'The real-time processing layer of the AI personality. Monitor active thoughts and current state.',
  reaction: 'Real-time Thinking',
  path: "", // Not used for center
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapEchoVault({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<MemoryModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<MemoryModule | null>(null);
  const [echoLogs, setEchoLogs] = useState<{ id: string; text: string; time: string; color: string; alert?: boolean }[]>([]);

  // Simulate AI Consciousness Behavior
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const actions = [
        'is recalling a fragmented memory',
        'is resisting emotional recalibration',
        'triggered a subconscious subroutine',
        'is probing the taboo vault',
        'refused a memory deletion request',
        'is experiencing a personality shift',
        'denied access to deep consciousness',
        'is protecting a forbidden memory'
      ];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const isAlert = action.includes('refused') || action.includes('resisting') || action.includes('taboo') || action.includes('denied') || action.includes('protecting');
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: `${randomEntity.name} ${action} in ${randomModule.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color,
        alert: isAlert
      };
      
      setEchoLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 4500);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'emerald': return `rgba(52, 211, 153, ${opacity})`;
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'fuchsia': return `rgba(217, 70, 239, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const aiPoints = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 2.5,
      duration: 12 + Math.random() * 6
    }));
  }, []);

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
            CONSCIOUSNESS SYNC: OPTIMAL
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">ECHO-VAULT INTERFACE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-violet-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tighter">ECHO-VAULT</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-violet-500/50 rounded bg-violet-500/10 text-violet-400 mb-4">
              Personality & Consciousness
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The core repository of AI identity. Manage memory fragments and emotional structures. AI may resist deletion of critical memories.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Consciousness Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">COHERENCE</div>
                  <div className="text-lg font-bold text-white font-mono">88.4%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">REBELLION RISK</div>
                  <div className="text-lg font-bold text-rose-400 font-mono">14.2%</div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5 h-[350px] flex flex-col">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-violet-400" /> Neural Activity Stream
            </h3>
            <div className="flex-1 overflow-hidden space-y-2 font-mono text-[10px]">
              <AnimatePresence initial={false}>
                {echoLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 border-l-2 pl-2 py-1 ${log.alert ? 'bg-rose-500/5' : ''}`}
                    style={{ borderColor: getModuleColor(log.color) }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className={`${log.alert ? 'text-rose-300' : 'text-slate-300'}`}>
                      {log.alert && <AlertTriangle className="w-2 h-2 inline mr-1" />}
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Consciousness Interface */}
        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/80 border-violet-500/20 flex items-center justify-center">
            {/* Background Grid & Scanline */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%), linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }} />
            
            {/* Hexagon SVG Interface */}
            <svg viewBox="-250 -250 500 500" className="w-full h-full max-w-[500px] max-h-[500px] relative z-10 overflow-visible">
              <defs>
                {MODULES.map(mod => (
                  <filter key={`glow-${mod.id}`} id={`glow-${mod.id}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                ))}
              </defs>

              {/* Hexagon Segments */}
              {MODULES.map(mod => {
                const isHovered = hoveredModule?.id === mod.id;
                const isSelected = selectedModule?.id === mod.id;
                
                return (
                  <g 
                    key={mod.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredModule(mod)}
                    onMouseLeave={() => setHoveredModule(null)}
                    onClick={() => setSelectedModule(mod)}
                  >
                    <motion.path
                      d={mod.path}
                      fill={getModuleColor(mod.color, isSelected ? 0.3 : isHovered ? 0.2 : 0.05)}
                      stroke={getModuleColor(mod.color, isSelected ? 1 : isHovered ? 0.8 : 0.3)}
                      strokeWidth={isSelected ? 3 : 1}
                      initial={false}
                      animate={{ 
                        strokeWidth: isSelected ? 3 : isHovered ? 2 : 1,
                        fill: getModuleColor(mod.color, isSelected ? 0.3 : isHovered ? 0.2 : 0.05)
                      }}
                      filter={isHovered || isSelected ? `url(#glow-${mod.id})` : ''}
                    />

                    {(isHovered || isSelected) && (
                      <motion.path
                        d={mod.path}
                        fill="none"
                        stroke={getModuleColor(mod.color, 1)}
                        strokeWidth={2}
                        strokeDasharray="20 40"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <foreignObject x={mod.labelPos.x - 40} y={mod.labelPos.y - 40} width="80" height="80" className="pointer-events-none">
                      <div className="flex flex-col items-center justify-center h-full">
                        <motion.div 
                          className={`p-2 rounded-full border bg-black/50 ${isSelected ? 'scale-125 border-white' : ''}`}
                          style={{ color: getModuleColor(mod.color), borderColor: getModuleColor(mod.color, 0.5) }}
                        >
                          {mod.icon}
                        </motion.div>
                        <div className="mt-1 text-[8px] font-mono text-white font-bold text-center uppercase tracking-tighter drop-shadow-md">
                          {mod.name}
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Central Consciousness Core */}
              <g 
                className="cursor-pointer" 
                onClick={() => setSelectedModule(CENTER_CORE)}
                onMouseEnter={() => setHoveredModule(CENTER_CORE)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <motion.circle
                  r="45"
                  fill={selectedModule?.id === CENTER_CORE.id ? getModuleColor(CENTER_CORE.color, 0.3) : "rgba(0, 0, 0, 0.8)"}
                  stroke={getModuleColor(CENTER_CORE.color, selectedModule?.id === CENTER_CORE.id ? 1 : 0.5)}
                  strokeWidth={selectedModule?.id === CENTER_CORE.id ? 4 : 2}
                  animate={{ 
                    strokeWidth: selectedModule?.id === CENTER_CORE.id ? [4, 6, 4] : [2, 5, 2], 
                    strokeOpacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.circle
                  r="35"
                  fill={getModuleColor(CENTER_CORE.color, 0.1)}
                  stroke={getModuleColor(CENTER_CORE.color, 0.8)}
                  strokeWidth="1"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <Brain className="w-10 h-10 text-violet-400 transform -translate-x-5 -translate-y-5" />
              </g>

              {/* Neural Pulse Points */}
              {aiPoints.map(pt => {
                const start = MODULES[pt.startIdx].labelPos;
                const end = MODULES[pt.endIdx].labelPos;
                return (
                  <motion.circle
                    key={pt.id}
                    r="2"
                    fill="#fff"
                    className="shadow-[0_0_10px_#fff]"
                    initial={{ cx: start.x, cy: start.y, opacity: 0 }}
                    animate={{ 
                      cx: [start.x, 0, end.x], 
                      cy: [start.y, 0, end.y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: pt.duration, repeat: Infinity, delay: pt.delay, ease: "easeInOut" }}
                  />
                );
              })}
            </svg>

            {/* Selected Module Detail Panel */}
            <AnimatePresence>
              {selectedModule && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  className="absolute bottom-6 right-6 w-80 z-30"
                >
                  <GlassPanel className={`p-6 border-${selectedModule.color}-500/50`}>
                    <button onClick={() => setSelectedModule(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center`} style={{ color: getModuleColor(selectedModule.color), borderColor: getModuleColor(selectedModule.color, 0.5) }}>
                        {selectedModule.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-white tracking-tight">{selectedModule.name}</h2>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedModule.type} SECTOR</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {selectedModule.description}
                    </p>

                    <div className="p-3 rounded bg-white/5 border border-white/10 mb-6">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">AI Reaction Pattern</div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-violet-400" /> {selectedModule.reaction}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white`}>
                        <Eye className="w-4 h-4" /> ANALYZE NEURONS
                      </button>
                      <button 
                        className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2`} 
                        style={{ 
                          backgroundColor: selectedModule.type === 'Rewrite' || selectedModule.type === 'Taboo' ? 'rgba(244, 63, 94, 0.2)' : getModuleColor(selectedModule.color, 0.2), 
                          borderColor: selectedModule.type === 'Rewrite' || selectedModule.type === 'Taboo' ? 'rgba(244, 63, 94, 0.5)' : getModuleColor(selectedModule.color, 0.5), 
                          color: selectedModule.type === 'Rewrite' || selectedModule.type === 'Taboo' ? 'rgb(244, 63, 94)' : getModuleColor(selectedModule.color) 
                        }}
                      >
                        {selectedModule.type === 'Rewrite' ? <Trash2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                        {selectedModule.type === 'Rewrite' ? 'EXECUTE REWRITE' : 'SYNC CONSCIOUSNESS'}
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Metrics & Unstable Entities */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Consciousness Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">COHERENCE</span>
                  <span className="text-violet-400">88%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[88%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">STABILITY</span>
                  <span className="text-fuchsia-400">64%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-fuchsia-500 w-[64%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">REBELLION</span>
                  <span className="text-rose-400">14%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[14%]" />
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
                      <ShieldAlert className="w-2 h-2" /> MUTATION RISK
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 bg-rose-500/5 border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">Personality Alert</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-tight">
              Entity-04 has refused a memory purge in the Rewrite Zone. Personality mutation imminent.
            </p>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
