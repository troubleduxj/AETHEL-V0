import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, Zap, Cpu, Brain, Shield, Activity, 
  Settings, Database, Network, X, Info, ChevronRight,
  AlertTriangle, Sparkles, Terminal
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CoreModule {
  id: string;
  name: string;
  type: 'Training' | 'Analysis' | 'Defense' | 'Optimization' | 'Logic' | 'Heuristic';
  icon: React.ReactNode;
  color: string;
  description: string;
  path: string; // SVG path for the segment
  labelPos: { x: number; y: number };
}

const MODULES: CoreModule[] = [
  {
    id: 'neural-training',
    name: 'Neural Training',
    type: 'Training',
    icon: <Cpu className="w-5 h-5" />,
    color: 'cyan',
    description: 'Accelerate synaptic growth and algorithm evolution through high-intensity neural simulations.',
    path: "M 0 0 L 100 -173 L -100 -173 Z",
    labelPos: { x: 0, y: -120 }
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    type: 'Analysis',
    icon: <Database className="w-5 h-5" />,
    color: 'emerald',
    description: 'Deep-pattern recognition and predictive modeling of network-wide data streams.',
    path: "M 0 0 L 200 0 L 100 -173 Z",
    labelPos: { x: 100, y: -60 }
  },
  {
    id: 'security-defense',
    name: 'Security Defense',
    type: 'Defense',
    icon: <Shield className="w-5 h-5" />,
    color: 'rose',
    description: 'Active firewall management and intrusion detection protocols for the Aethel Core.',
    path: "M 0 0 L 200 0 L 100 173 Z",
    labelPos: { x: 100, y: 60 }
  },
  {
    id: 'system-optimization',
    name: 'System Optimization',
    type: 'Optimization',
    icon: <Settings className="w-5 h-5" />,
    color: 'amber',
    description: 'Resource allocation and load balancing across all active neural nodes.',
    path: "M 0 0 L 100 173 L -100 173 Z",
    labelPos: { x: 0, y: 120 }
  },
  {
    id: 'logic-processing',
    name: 'Logic Processing',
    type: 'Logic',
    icon: <Activity className="w-5 h-5" />,
    color: 'indigo',
    description: 'High-speed boolean operations and complex decision-tree execution.',
    path: "M 0 0 L -100 173 L -200 0 Z",
    labelPos: { x: -100, y: 60 }
  },
  {
    id: 'heuristic-learning',
    name: 'Heuristic Learning',
    type: 'Heuristic',
    icon: <Brain className="w-5 h-5" />,
    color: 'violet',
    description: 'Self-correcting algorithms and adaptive learning based on environmental feedback.',
    path: "M 0 0 L -200 0 L -100 -173 Z",
    labelPos: { x: -100, y: -60 }
  }
];

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapNexusPrime({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<CoreModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<CoreModule | null>(null);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string; color: string }[]>([]);

  // Simulate AI activity logs
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      const actions = ['optimizing', 'analyzing', 'securing', 'training', 'processing', 'learning'];
      const action = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: `${randomEntity.name} is ${action} in ${randomModule.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color
      };
      
      setActiveLogs(prev => [newLog, ...prev].slice(0, 8));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'emerald': return `rgba(52, 211, 153, ${opacity})`;
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const getModuleShadow = (color: string) => {
    switch(color) {
      case 'cyan': return 'shadow-[0_0_20px_rgba(34,211,238,0.4)]';
      case 'emerald': return 'shadow-[0_0_20px_rgba(52,211,153,0.4)]';
      case 'rose': return 'shadow-[0_0_20px_rgba(244,63,94,0.4)]';
      case 'amber': return 'shadow-[0_0_20px_rgba(245,158,11,0.4)]';
      case 'indigo': return 'shadow-[0_0_20px_rgba(99,102,241,0.4)]';
      case 'violet': return 'shadow-[0_0_20px_rgba(139,92,246,0.4)]';
      default: return 'shadow-[0_0_20px_rgba(148,163,184,0.4)]';
    }
  };

  // Moving AI light points
  const aiPoints = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 1.5,
      duration: 8 + Math.random() * 4
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            CORE SYNC: OPTIMAL
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">AETHEL CORE INTERFACE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Core Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-cyan-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tighter">NEXUS PRIME</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-cyan-500/50 rounded bg-cyan-500/10 text-cyan-400 mb-4">
              Aethel Core Interface
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The primary processing center of the Aethel network. Here, all neural data is synthesized, optimized, and secured.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Core Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">CPU LOAD</div>
                  <div className="text-lg font-bold text-white font-mono">42.8%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">SYNC RATE</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono">99.9%</div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5 h-[350px] flex flex-col">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-cyan-400" /> Neural Activity Stream
            </h3>
            <div className="flex-1 overflow-hidden space-y-2 font-mono text-[10px]">
              <AnimatePresence initial={false}>
                {activeLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2 border-l-2 pl-2 py-1"
                    style={{ borderColor: getModuleColor(log.color) }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className="text-slate-300">{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Core Interface */}
        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/80 border-cyan-500/20 flex items-center justify-center">
            {/* Background Grid & Scanline */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 70%), linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }} />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-20 w-full z-0"
              animate={{ top: ['-20%', '120%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

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
                    {/* Segment Shape */}
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

                    {/* Flowing Current on Border (Animated Dash) */}
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

                    {/* Module Icon & Label */}
                    <foreignObject 
                      x={mod.labelPos.x - 40} 
                      y={mod.labelPos.y - 40} 
                      width="80" 
                      height="80"
                      className="pointer-events-none"
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <motion.div 
                          className={`p-2 rounded-full border bg-black/50 ${isSelected ? 'scale-125 border-white' : ''}`}
                          style={{ 
                            color: getModuleColor(mod.color),
                            borderColor: getModuleColor(mod.color, 0.5)
                          }}
                          animate={isSelected ? { scale: [1.25, 1.35, 1.25] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
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

              {/* Central AI Core */}
              <g className="cursor-pointer" onClick={() => setSelectedModule(null)}>
                <motion.circle
                  r="40"
                  fill="rgba(0, 0, 0, 0.8)"
                  stroke="rgba(34, 211, 238, 0.5)"
                  strokeWidth="2"
                  animate={{ 
                    strokeWidth: [2, 4, 2],
                    strokeOpacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  r="30"
                  fill="rgba(34, 211, 238, 0.1)"
                  stroke="rgba(34, 211, 238, 0.8)"
                  strokeWidth="1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Zap className="w-8 h-8 text-cyan-400 transform -translate-x-4 -translate-y-4" />
                
                {/* Core Pulse Waves */}
                <motion.circle
                  r="40"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.4)"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                />
              </g>

              {/* AI Moving Points */}
              {aiPoints.map(pt => {
                const start = MODULES[pt.startIdx].labelPos;
                const end = MODULES[pt.endIdx].labelPos;
                return (
                  <motion.circle
                    key={pt.id}
                    r="2"
                    fill="#fff"
                    className="shadow-[0_0_8px_#fff]"
                    initial={{ cx: start.x, cy: start.y, opacity: 0 }}
                    animate={{ 
                      cx: [start.x, 0, end.x], 
                      cy: [start.y, 0, end.y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: pt.duration, 
                      repeat: Infinity, 
                      delay: pt.delay,
                      ease: "easeInOut"
                    }}
                  />
                );
              })}

              {/* Connection Line to Selected Module */}
              {selectedModule && (
                <motion.line
                  x1="0" y1="0"
                  x2={selectedModule.labelPos.x} y2={selectedModule.labelPos.y}
                  stroke={getModuleColor(selectedModule.color, 0.8)}
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
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
                    <button 
                      onClick={() => setSelectedModule(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getModuleShadow(selectedModule.color)}`} style={{ color: getModuleColor(selectedModule.color), borderColor: getModuleColor(selectedModule.color, 0.5) }}>
                        {selectedModule.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-bold text-white tracking-tight">{selectedModule.name}</h2>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedModule.type} MODULE</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                      {selectedModule.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Module Operations</h4>
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white`}>
                        <Activity className="w-4 h-4" /> RUN DIAGNOSTICS
                      </button>
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2`} style={{ backgroundColor: getModuleColor(selectedModule.color, 0.2), borderColor: getModuleColor(selectedModule.color, 0.5), color: getModuleColor(selectedModule.color) }}>
                        <Zap className="w-4 h-4" /> OPTIMIZE THROUGHPUT
                      </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <Network className="w-3 h-3" /> 4.2 GB/s Flow
                      </div>
                      <button className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                        VIEW LOGS <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Analytics & Top Entities */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Neural Analytics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">COHERENCE</span>
                  <span className="text-cyan-400">98.2%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[98%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">ADAPTABILITY</span>
                  <span className="text-emerald-400">76.5%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[76%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">STABILITY</span>
                  <span className="text-rose-400">89.1%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[89%]" />
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Top Core Contributors</h3>
            <div className="space-y-3">
              {roster.slice(0, 3).map(ent => (
                <div key={ent.id} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5">
                  <img src={ent.imageUrl} alt={ent.name} className="w-10 h-10 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-2 h-2" /> 450 SYNC PTS
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 bg-rose-500/5 border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">System Alert</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-tight">
              Minor neural fluctuation detected in Sector 7G. Security protocols standing by.
            </p>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
