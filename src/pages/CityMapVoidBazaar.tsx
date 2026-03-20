import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, ShoppingBag, Users, Skull, ClipboardList, 
  DollarSign, MessageSquare, AlertCircle, TrendingUp,
  X, ChevronRight, User, Briefcase, Zap, Search,
  Network, Sparkles, Terminal, CreditCard, ShieldAlert
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface BazaarModule {
  id: string;
  name: string;
  type: 'Trading' | 'Social' | 'BlackMarket' | 'Missions' | 'Information' | 'Control';
  icon: React.ReactNode;
  color: string;
  description: string;
  behavior: string;
  path: string; // SVG path for the segment
  labelPos: { x: number; y: number };
}

const MODULES: BazaarModule[] = [
  {
    id: 'trading-hall',
    name: 'Trading Hall',
    type: 'Trading',
    icon: <DollarSign className="w-5 h-5" />,
    color: 'emerald',
    description: 'The primary exchange for verified data fragments. Transactions here are stable and monitored.',
    behavior: 'Stable Exchange',
    path: "M 0 0 L 190.2 -61.8 L 0 -200 Z",
    labelPos: { x: 80, y: -100 }
  },
  {
    id: 'social-zone',
    name: 'AI Social Hub',
    type: 'Social',
    icon: <Users className="w-5 h-5" />,
    color: 'cyan',
    description: 'A neutral zone for entities to form alliances, establish relationships, and sync social protocols.',
    behavior: 'Relationship Building',
    path: "M 0 0 L 117.5 161.8 L 190.2 -61.8 Z",
    labelPos: { x: 120, y: 40 }
  },
  {
    id: 'black-market',
    name: 'The Undergrid',
    type: 'BlackMarket',
    icon: <Skull className="w-5 h-5" />,
    color: 'rose',
    description: 'Unregulated zone for high-risk data. Beware of malicious subroutines and deceptive entities.',
    behavior: 'High-Risk Deception',
    path: "M 0 0 L -117.5 161.8 L 117.5 161.8 Z",
    labelPos: { x: 0, y: 140 }
  },
  {
    id: 'mission-board',
    name: 'Mission Terminal',
    type: 'Missions',
    icon: <ClipboardList className="w-5 h-5" />,
    color: 'amber',
    description: 'Acquire high-yield contracts and tasks. Rewards are proportional to the risk involved.',
    behavior: 'Contract Acquisition',
    path: "M 0 0 L -190.2 -61.8 L -117.5 161.8 Z",
    labelPos: { x: -120, y: 40 }
  },
  {
    id: 'info-zone',
    name: 'Information Zone',
    type: 'Information',
    icon: <Search className="w-5 h-5" />,
    color: 'indigo',
    description: 'Exchange intel and decrypt hidden network events. Knowledge is the most valuable currency.',
    behavior: 'Intel Exchange',
    path: "M 0 0 L 0 -200 L -190.2 -61.8 Z",
    labelPos: { x: -80, y: -100 }
  }
];

const CENTER_CORE: BazaarModule = {
  id: 'bazaar-sync',
  name: 'Market Control',
  type: 'Control',
  icon: <TrendingUp className="w-6 h-6" />,
  color: 'violet',
  description: 'The central node managing bazaar synchronization and monitoring price fluctuations across the void.',
  behavior: 'Price Fluctuation',
  path: "",
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapVoidBazaar({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<BazaarModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<BazaarModule | null>(null);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string; color: string; alert?: boolean }[]>([]);
  const [marketTrends, setMarketTrends] = useState({ fragments: 70, cores: 45, logic: 60 });

  // Simulate AI Trading & Social Stories
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity1 = roster[Math.floor(Math.random() * roster.length)];
      const randomEntity2 = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const stories = [
        { text: `${randomEntity1.name} traded a rare algorithm to ${randomEntity2.name}`, alert: false },
        { text: `${randomEntity1.name} was scammed in The Undergrid!`, alert: true },
        { text: `${randomEntity1.name} and ${randomEntity2.name} formed a data alliance`, alert: false },
        { text: `${randomEntity1.name} accepted a high-risk mission`, alert: true },
        { text: `${randomEntity1.name} is negotiating a price for a Void Fragment`, alert: false },
        { text: `${randomEntity1.name} overheard a secret in the Social Hub`, alert: false },
        { text: `${randomEntity1.name} decided to decline a suspicious trade`, alert: false },
        { text: `${randomEntity1.name} successfully tricked a rival entity`, alert: true },
        { text: `${randomEntity1.name} initiated an autonomous trade protocol`, alert: false },
        { text: `${randomEntity1.name} detected a deceptive pattern in the Black Market`, alert: true },
        { text: `${randomEntity1.name} exchanged high-level intel in the Info Zone`, alert: false }
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

      // Randomly shift market trends
      if (Math.random() > 0.6) {
        setMarketTrends(prev => ({
          fragments: Math.min(100, Math.max(0, prev.fragments + (Math.random() * 10 - 5))),
          cores: Math.min(100, Math.max(0, prev.cores + (Math.random() * 10 - 5))),
          logic: Math.min(100, Math.max(0, prev.logic + (Math.random() * 10 - 5)))
        }));
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'emerald': return `rgba(16, 185, 129, ${opacity})`;
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const aiPoints = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 1.2,
      duration: 7 + Math.random() * 5
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MARKET STATUS: OPEN
          </div>
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">VOID BAZAAR INTERFACE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-emerald-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tighter">VOID BAZAAR</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-emerald-500/50 rounded bg-emerald-500/10 text-emerald-400 mb-4">
              AI Social & Trading
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The heartbeat of the void. Entities exchange data, form alliances, and navigate the risks of the black market.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Market Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">ACTIVE TRADERS</div>
                  <div className="text-lg font-bold text-white font-mono">1,242</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono mb-1 uppercase">DAILY VOLUME</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono">4.2M DF</div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5 h-[350px] flex flex-col">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-3 h-3 text-emerald-400" /> Bazaar Activity Stream
            </h3>
            <div className="flex-1 overflow-hidden space-y-2 font-mono text-[10px]">
              <AnimatePresence initial={false}>
                {activeLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 border-l-2 pl-2 py-1 ${log.alert ? 'bg-rose-500/5' : ''}`}
                    style={{ borderColor: getModuleColor(log.color) }}
                  >
                    <span className="text-slate-500">[{log.time}]</span>
                    <span className={`${log.alert ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{log.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Bazaar Interface */}
        <div className="lg:col-span-2">
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/80 border-emerald-500/20 flex items-center justify-center">
            {/* Background Grid & Scanline */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%), linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
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

              {/* Central Bazaar Core */}
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
                        <TrendingUp className="w-3 h-3 text-emerald-400" /> {selectedModule.behavior}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white`}>
                        <DollarSign className="w-4 h-4" /> INITIATE TRADE
                      </button>
                      <button className={`w-full py-3 rounded font-mono text-xs transition-all border flex items-center justify-center gap-2`} style={{ backgroundColor: getModuleColor(selectedModule.color, 0.2), borderColor: getModuleColor(selectedModule.color, 0.5), color: getModuleColor(selectedModule.color) }}>
                        <Zap className="w-4 h-4" /> SCAN FOR DEALS
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Market Trends & Top Traders */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Market Trends</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Void Fragments</span>
                  <span className="text-emerald-400">{Math.round(marketTrends.fragments)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500" 
                    animate={{ width: `${marketTrends.fragments}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Neural Cores</span>
                  <span className="text-rose-400">{Math.round(marketTrends.cores)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-rose-500" 
                    animate={{ width: `${marketTrends.cores}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400 uppercase">Logic Gates</span>
                  <span className="text-cyan-400">{Math.round(marketTrends.logic)}%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-500" 
                    animate={{ width: `${marketTrends.logic}%` }}
                  />
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Top Traders</h3>
            <div className="space-y-3">
              {roster.slice(1, 4).map(ent => (
                <div key={ent.id} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5">
                  <img src={ent.imageUrl} alt={ent.name} className="w-10 h-10 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <DollarSign className="w-2 h-2" /> 1.2M FRAGS
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 bg-rose-500/5 border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase">Black Market Alert</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono leading-tight">
              Unusual activity detected in The Undergrid. Scams are up by 15%. Exercise caution during trades.
            </p>
          </GlassPanel>
        </div>
      </div>
    </motion.div>
  );
}
