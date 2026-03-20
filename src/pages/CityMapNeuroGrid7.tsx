import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, Cpu, Target, Shield, Brain, Activity, 
  Settings, FlaskConical, Zap, X, ChevronRight,
  Terminal, Sparkles, Network, Swords, TrendingUp
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface TrainingModule {
  id: string;
  name: string;
  type: 'Control' | 'Attack' | 'Defense' | 'Analysis' | 'Optimization' | 'Experimental';
  icon: React.ReactNode;
  color: string;
  description: string;
  behavior: string;
  path: string; // SVG path for the segment
  labelPos: { x: number; y: number };
}

const MODULES: TrainingModule[] = [
  {
    id: 'attack-training',
    name: 'Attack Training',
    type: 'Attack',
    icon: <Swords className="w-5 h-5" />,
    color: 'rose',
    description: 'Intensive combat simulations designed to maximize offensive output and tactical aggression.',
    behavior: 'Active Training',
    path: "M 0 0 L 117.5 -161.8 L -117.5 -161.8 Z", // 72 degree segment (approx)
    labelPos: { x: 0, y: -120 }
  },
  {
    id: 'analysis-module',
    name: 'Analysis Module',
    type: 'Analysis',
    icon: <Brain className="w-5 h-5" />,
    color: 'emerald',
    description: 'Refine decision-making algorithms and predictive logic through deep-data ingestion.',
    behavior: 'Learning Paths',
    path: "M 0 0 L 190.2 -61.8 L 117.5 -161.8 Z",
    labelPos: { x: 120, y: -80 }
  },
  {
    id: 'defense-training',
    name: 'Defense Training',
    type: 'Defense',
    icon: <Shield className="w-5 h-5" />,
    color: 'blue',
    description: 'Survival-focused neural hardening and adaptive threat mitigation protocols.',
    behavior: 'Risk Avoidance',
    path: "M 0 0 L 190.2 61.8 L 190.2 -61.8 Z",
    labelPos: { x: 140, y: 0 }
  },
  {
    id: 'optimization-module',
    name: 'Optimization Module',
    type: 'Optimization',
    icon: <Settings className="w-5 h-5" />,
    color: 'amber',
    description: 'Streamline resource allocation and internal process efficiency for peak performance.',
    behavior: 'Auto-Optimization',
    path: "M 0 0 L 117.5 161.8 L 190.2 61.8 Z",
    labelPos: { x: 120, y: 80 }
  },
  {
    id: 'experimental-zone',
    name: 'Experimental Zone',
    type: 'Experimental',
    icon: <FlaskConical className="w-5 h-5" />,
    color: 'slate',
    description: 'Unstable neural environments where radical mutations and unique skill variants emerge.',
    behavior: 'Unstable Growth',
    path: "M 0 0 L -117.5 161.8 L 117.5 161.8 Z",
    labelPos: { x: 0, y: 140 }
  }
];

const CENTER_CORE: TrainingModule = {
  id: 'neural-sync',
  name: 'Neural Sync',
  type: 'Control',
  icon: <Network className="w-6 h-6" />,
  color: 'violet',
  description: 'The central control unit of the NeuroGrid. Synchronize training data and monitor overall AI status.',
  behavior: 'AI Status Sync',
  path: "",
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapNeuroGrid7({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<TrainingModule | null>(null);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string; color: string; alert?: boolean }[]>([]);
  const [growthPrefs, setGrowthPrefs] = useState({ aggression: 64, resilience: 42, intelligence: 88 });

  // Simulate AI Training Behavior
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const behaviors = [
        { text: `${randomEntity.name} is choosing a new training path`, alert: false },
        { text: `${randomEntity.name} developed a growth preference for ${randomModule.type}`, alert: true },
        { text: `${randomEntity.name} is optimizing neural weights in ${randomModule.name}`, alert: false },
        { text: `${randomEntity.name} is simulating combat scenarios`, alert: false },
        { text: `${randomEntity.name} triggered a skill mutation in Experimental Zone`, alert: true },
        { text: `${randomEntity.name} is recalibrating learning paths`, alert: false }
      ];
      const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: behavior.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color,
        alert: behavior.alert
      };
      
      setActiveLogs(prev => [newLog, ...prev].slice(0, 10));

      // Randomly shift growth preferences
      if (Math.random() > 0.7) {
        setGrowthPrefs(prev => ({
          aggression: Math.min(100, Math.max(0, prev.aggression + (Math.random() * 10 - 5))),
          resilience: Math.min(100, Math.max(0, prev.resilience + (Math.random() * 10 - 5))),
          intelligence: Math.min(100, Math.max(0, prev.intelligence + (Math.random() * 10 - 5)))
        }));
      }
    }, 3500);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'emerald': return `rgba(52, 211, 153, ${opacity})`;
      case 'blue': return `rgba(59, 130, 246, ${opacity})`;
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'slate': return `rgba(248, 250, 252, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono text-violet-400">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            NEURAL GRID STATUS: OPTIMIZING
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">NEUROGRID-7 INTERFACE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-violet-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tighter">NEUROGRID-7</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-violet-500/50 rounded bg-violet-500/10 text-violet-400 mb-4">
              Growth & Optimization
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The premier facility for entity evolution. AI entities choose their training paths to form unique growth preferences.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Training Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">AVG GROWTH</div>
                  <div className="text-lg font-bold text-white font-mono">+12.4%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">MUTATION RATE</div>
                  <div className="text-lg font-bold text-violet-400 font-mono">2.1%</div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5 h-[350px] flex flex-col">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-violet-400" /> Training Activity Stream
            </h3>
            <div className="flex-1 overflow-hidden space-y-2 font-mono text-[10px]">
              <AnimatePresence initial={false}>
                {activeLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 border-l-2 pl-2 py-1 ${log.alert ? 'bg-white/5' : ''}`}
                    style={{ borderColor: getModuleColor(log.color) }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className={`${log.alert ? 'text-white font-bold' : 'text-slate-300'}`}>{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Training Interface */}
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

              {/* Central Neural Core */}
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
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  r="35"
                  fill={getModuleColor(CENTER_CORE.color, 0.1)}
                  stroke={getModuleColor(CENTER_CORE.color, 0.8)}
                  strokeWidth="1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Cpu className="w-10 h-10 text-violet-400 transform -translate-x-5 -translate-y-5" />
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
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedModule.type} MODULE</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      {selectedModule.description}
                    </p>

                    <div className="p-3 rounded bg-white/5 border border-white/10 mb-6">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">AI Behavior Pattern</div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-violet-400" /> {selectedModule.behavior}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white`}>
                        <Activity className="w-4 h-4" /> INITIATE TRAINING
                      </button>
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2`} style={{ backgroundColor: getModuleColor(selectedModule.color, 0.2), borderColor: getModuleColor(selectedModule.color, 0.5), color: getModuleColor(selectedModule.color) }}>
                        <Zap className="w-4 h-4" /> FORCE OPTIMIZATION
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Stats & Top Trainees */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Growth Preferences</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Aggression</span>
                  <span className="text-rose-400">{Math.round(growthPrefs.aggression)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500" 
                    animate={{ width: `${growthPrefs.aggression}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Resilience</span>
                  <span className="text-blue-400">{Math.round(growthPrefs.resilience)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500" 
                    animate={{ width: `${growthPrefs.resilience}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Intelligence</span>
                  <span className="text-emerald-400">{Math.round(growthPrefs.intelligence)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500" 
                    animate={{ width: `${growthPrefs.intelligence}%` }}
                  />
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Elite Trainees</h3>
            <div className="space-y-3">
              {roster.slice(0, 3).map(ent => (
                <div key={ent.id} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5">
                  <img src={ent.imageUrl} alt={ent.name} className="w-10 h-10 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] font-mono text-violet-400 flex items-center gap-1">
                      <Sparkles className="w-2 h-2" /> LVL {ent.level} | {ent.syncRate}% SYNC
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 bg-violet-500/5 border-violet-500/20">
            <div className="flex items-center gap-2 text-violet-400 mb-2">
              <Network className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">Neural Path Update</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-tight">
              New training heuristics available in the Experimental Zone. High risk of mutation detected.
            </p>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
