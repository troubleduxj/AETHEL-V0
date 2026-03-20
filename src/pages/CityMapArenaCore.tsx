import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, Swords, Brain, Shield, Flame, Activity, 
  Target, Zap, BarChart3, ChevronRight, AlertCircle,
  ShieldAlert, Crosshair, Skull, TrendingUp, Network
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface ArenaModule {
  id: string;
  name: string;
  type: 'Combat' | 'Strategy' | 'Defense' | 'Challenge' | 'Data' | 'Control';
  icon: React.ReactNode;
  color: string;
  description: string;
  behavior: string;
  path: string;
  labelPos: { x: number; y: number };
}

const MODULES: ArenaModule[] = [
  {
    id: 'combat-zone',
    name: 'Real-time Combat',
    type: 'Combat',
    icon: <Swords className="w-5 h-5" />,
    color: 'fuchsia',
    description: 'Main arena for PVP and PVE engagements. Test your AI against rogue entities or other players.',
    behavior: 'Active Engagement',
    path: "M 0 0 L 190.2 -61.8 L 0 -200 Z",
    labelPos: { x: 80, y: -100 }
  },
  {
    id: 'tactical-analysis',
    name: 'Tactical Analysis',
    type: 'Strategy',
    icon: <Brain className="w-5 h-5" />,
    color: 'blue',
    description: 'Analyze combat patterns and refine AI decision-making. Essential for strategic evolution.',
    behavior: 'Strategic Learning',
    path: "M 0 0 L 117.5 161.8 L 190.2 -61.8 Z",
    labelPos: { x: 120, y: 40 }
  },
  {
    id: 'defense-sim',
    name: 'Defense Simulation',
    type: 'Defense',
    icon: <Shield className="w-5 h-5" />,
    color: 'cyan',
    description: 'Simulate high-pressure survival scenarios. Improve AI resilience and defensive protocols.',
    behavior: 'Survival Training',
    path: "M 0 0 L -117.5 161.8 L 117.5 161.8 Z",
    labelPos: { x: 0, y: 140 }
  },
  {
    id: 'extreme-challenge',
    name: 'Extreme Challenge',
    type: 'Challenge',
    icon: <Flame className="w-5 h-5" />,
    color: 'rose',
    description: 'High-difficulty combat trials with massive rewards. Only for the most advanced AI entities.',
    behavior: 'Elite Trials',
    path: "M 0 0 L -190.2 -61.8 L -117.5 161.8 Z",
    labelPos: { x: -120, y: 40 }
  },
  {
    id: 'combat-records',
    name: 'Combat Records',
    type: 'Data',
    icon: <Activity className="w-5 h-5" />,
    color: 'indigo',
    description: 'Review historical battle data and performance metrics. Identify weaknesses and optimize loadouts.',
    behavior: 'Performance Review',
    path: "M 0 0 L 0 -200 L -190.2 -61.8 Z",
    labelPos: { x: -80, y: -100 }
  }
];

const CENTER_CORE: ArenaModule = {
  id: 'arena-sync',
  name: 'Combat Control',
  type: 'Control',
  icon: <Target className="w-6 h-6" />,
  color: 'violet',
  description: 'The central tactical node managing AI combat decisions and real-time battle synchronization.',
  behavior: 'AI Decision Matrix',
  path: "",
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapArenaCore({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<ArenaModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<ArenaModule | null>(null);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string; color: string; alert?: boolean }[]>([]);
  const [combatStats, setCombatStats] = useState({ winRate: 68, avgDuration: 142, threatLevel: 85 });

  // Simulate Combat Activities
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const stories = [
        { text: `${randomEntity.name} achieved a flawless victory in the Combat Zone`, alert: false },
        { text: `${randomEntity.name} is analyzing a new tactical pattern`, alert: false },
        { text: `${randomEntity.name} survived a Level 5 Defense Simulation`, alert: false },
        { text: `CRITICAL: ${randomEntity.name} failed an Extreme Challenge trial`, alert: true },
        { text: `${randomEntity.name} updated combat records with new data`, alert: false },
        { text: `AI Decision: ${randomEntity.name} prioritized survival over aggression`, alert: false },
        { text: `${randomEntity.name} evolved a new counter-strategy`, alert: true },
        { text: `Threat Detected: Rogue entity approaching Arena Core`, alert: true }
      ];
      const story = stories[Math.floor(Math.random() * stories.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: story.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color,
        alert: story.alert
      };
      
      setActiveLogs(prev => [newLog, ...prev].slice(0, 10));

      // Randomly shift stats
      if (Math.random() > 0.7) {
        setCombatStats(prev => ({
          winRate: Math.min(100, Math.max(0, prev.winRate + (Math.random() * 4 - 2))),
          avgDuration: Math.min(300, Math.max(30, prev.avgDuration + (Math.random() * 10 - 5))),
          threatLevel: Math.min(100, Math.max(0, prev.threatLevel + (Math.random() * 6 - 3)))
        }));
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'fuchsia': return `rgba(232, 121, 249, ${opacity})`;
      case 'blue': return `rgba(96, 165, 250, ${opacity})`;
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const aiPoints = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 0.8,
      duration: 5 + Math.random() * 4
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
          <div className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-mono">
            ARENA CORE // SECTOR 7G
          </div>
          <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono animate-pulse">
            THREAT LEVEL: {Math.round(combatStats.threatLevel)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Info & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-6 border-fuchsia-500/20">
            <h1 className="font-display text-3xl font-bold text-white mb-2">Arena Core</h1>
            <p className="text-slate-400 text-sm mb-6">
              The ultimate testing ground for AI combat efficiency. Here, entities evolve through conflict and strategic simulation.
            </p>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Combat Win Rate</div>
                <div className="text-2xl font-display font-bold text-fuchsia-400">{Math.round(combatStats.winRate)}%</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${combatStats.winRate}%` }}
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Avg. Combat Duration</div>
                <div className="text-2xl font-display font-bold text-blue-400">{Math.round(combatStats.avgDuration)}s</div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">Tactical Feed</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {activeLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[11px] font-mono p-2 rounded border-l-2 bg-white/5 ${log.alert ? 'border-rose-500 text-rose-200' : 'border-slate-500 text-slate-300'}`}
                    style={{ borderLeftColor: getModuleColor(log.color) }}
                  >
                    <div className="flex justify-between opacity-50 mb-1">
                      <span>{log.time}</span>
                    </div>
                    {log.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Map */}
        <div className="lg:col-span-6">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-950/50 border-fuchsia-500/10">
            {/* Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(232, 121, 249, 0.1) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
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

              {/* Central Arena Core */}
              <g 
                className="cursor-pointer" 
                onMouseEnter={() => setHoveredModule(CENTER_CORE)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => setSelectedModule(CENTER_CORE)}
              >
                <motion.circle
                  r="55"
                  fill="rgba(0, 0, 0, 0.8)"
                  stroke={getModuleColor(CENTER_CORE.color, selectedModule?.id === CENTER_CORE.id ? 1 : 0.5)}
                  strokeWidth={selectedModule?.id === CENTER_CORE.id ? 4 : 2}
                  animate={{ 
                    strokeWidth: selectedModule?.id === CENTER_CORE.id ? [4, 6, 4] : [2, 4, 2],
                    strokeOpacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  r="45"
                  fill={getModuleColor(CENTER_CORE.color, 0.1)}
                  stroke={getModuleColor(CENTER_CORE.color, 0.8)}
                  strokeWidth="1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <foreignObject x="-30" y="-30" width="60" height="60" className="pointer-events-none">
                  <div className="flex items-center justify-center h-full text-violet-400">
                    {CENTER_CORE.icon}
                  </div>
                </foreignObject>
              </g>

              {/* Data Flow Points */}
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
                      cx: [start.x, end.x],
                      cy: [start.y, end.y],
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
            </svg>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Module Details */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedModule ? (
              <motion.div
                key={selectedModule.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <GlassPanel className="p-6 h-full border-white/10 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/5" style={{ color: getModuleColor(selectedModule.color) }}>
                      {selectedModule.icon}
                    </div>
                    <div>
                      <h2 className="text-white font-bold">{selectedModule.name}</h2>
                      <div className="text-[10px] font-mono uppercase opacity-50">{selectedModule.type}</div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {selectedModule.description}
                  </p>

                  <div className="space-y-4 flex-grow">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Primary Behavior</div>
                      <div className="flex items-center gap-2 text-white">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-sm">{selectedModule.behavior}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Module Status</div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-mono">OPERATIONAL</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm transition-all mt-6 flex items-center justify-center gap-2 group">
                    Initiate Protocol
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </GlassPanel>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-3xl"
              >
                <div className="space-y-4">
                  <Target className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-500 text-sm font-mono">
                    Select a tactical module to view detailed combat parameters
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
