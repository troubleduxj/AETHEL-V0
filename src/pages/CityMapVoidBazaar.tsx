import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId, AIEntity } from '../types';
import { 
  ArrowLeft, ShoppingBag, Users, Skull, ClipboardList, 
  DollarSign, MessageSquare, AlertCircle, TrendingUp,
  X, ChevronRight, User, Briefcase, Zap, Search
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

interface BazaarArea {
  id: string;
  name: string;
  type: 'Trading' | 'Social' | 'BlackMarket' | 'Missions';
  icon: React.ReactNode;
  color: string;
  description: string;
  coordinates: { x: number; y: number };
  actions: {
    label: string;
    type: 'trade' | 'social' | 'event' | 'mission';
    icon: React.ReactNode;
    danger?: boolean;
  }[];
}

const AREAS: BazaarArea[] = [
  {
    id: 'trading-hall',
    name: 'Main Trading Hall',
    type: 'Trading',
    icon: <ShoppingBag className="w-6 h-6" />,
    color: 'emerald',
    description: 'The heartbeat of the bazaar. Entities exchange data fragments, algorithms, and rare hardware.',
    coordinates: { x: 50, y: 40 },
    actions: [
      { label: 'Open Trade', type: 'trade', icon: <DollarSign className="w-4 h-4" /> },
      { label: 'Market Analysis', type: 'event', icon: <TrendingUp className="w-4 h-4" /> }
    ]
  },
  {
    id: 'social-zone',
    name: 'AI Social Hub',
    type: 'Social',
    icon: <Users className="w-6 h-6" />,
    color: 'cyan',
    description: 'A neutral zone for entities to form alliances, share insights, and gossip about the network.',
    coordinates: { x: 25, y: 60 },
    actions: [
      { label: 'Join Discussion', type: 'social', icon: <MessageSquare className="w-4 h-4" /> },
      { label: 'Form Alliance', type: 'event', icon: <Users className="w-4 h-4" /> }
    ]
  },
  {
    id: 'black-market',
    name: 'The Undergrid',
    type: 'BlackMarket',
    icon: <Skull className="w-6 h-6" />,
    color: 'rose',
    description: 'Restricted zone for illegal data trading and experimental subroutines. High risk of being scammed.',
    coordinates: { x: 75, y: 70 },
    actions: [
      { label: 'Illegal Trade', type: 'trade', icon: <Skull className="w-4 h-4" />, danger: true },
      { label: 'Bribe Guard', type: 'event', icon: <DollarSign className="w-4 h-4" />, danger: true }
    ]
  },
  {
    id: 'mission-board',
    name: 'Mission Terminal',
    type: 'Missions',
    icon: <ClipboardList className="w-6 h-6" />,
    color: 'amber',
    description: 'A repository of high-priority tasks issued by various factions. Rewards are substantial.',
    coordinates: { x: 75, y: 20 },
    actions: [
      { label: 'Accept Mission', type: 'mission', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Scan Board', type: 'event', icon: <Search className="w-4 h-4" /> }
    ]
  }
];

export default function CityMapVoidBazaar({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedArea, setSelectedArea] = useState<BazaarArea | null>(null);
  const [bazaarLogs, setBazaarLogs] = useState<{ id: string; text: string; time: string; type: string }[]>([]);
  
  // Simulate AI Trading & Social Stories
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity1 = roster[Math.floor(Math.random() * roster.length)];
      const randomEntity2 = roster[Math.floor(Math.random() * roster.length)];
      const randomArea = AREAS[Math.floor(Math.random() * AREAS.length)];
      
      const stories = [
        `${randomEntity1.name} traded a rare algorithm to ${randomEntity2.name} for 500 fragments.`,
        `${randomEntity1.name} was scammed in the Undergrid! Lost a critical memory fragment.`,
        `${randomEntity1.name} and ${randomEntity2.name} formed a temporary data alliance.`,
        `${randomEntity1.name} accepted a high-risk mission from the terminal.`,
        `${randomEntity1.name} is negotiating a price for a Void Fragment in the Hall.`,
        `${randomEntity1.name} overheard a secret about Sector 7G in the Social Hub.`
      ];
      
      const randomStory = stories[Math.floor(Math.random() * stories.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: randomStory,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: randomArea.color
      };
      
      setBazaarLogs(prev => [newLog, ...prev].slice(0, 6));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getColorClass = (color: string) => {
    switch(color) {
      case 'emerald': return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/30';
      case 'cyan': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/30';
      case 'rose': return 'text-rose-400 border-rose-400/30 bg-rose-400/10 hover:bg-rose-400/30';
      case 'amber': return 'text-amber-400 border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/30';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-400/10 hover:bg-slate-400/30';
    }
  };

  const getButtonColor = (color: string, danger?: boolean) => {
    if (danger) return 'bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500 hover:text-white';
    switch(color) {
      case 'emerald': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-slate-900';
      case 'cyan': return 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900';
      case 'amber': return 'bg-amber-400/20 border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-slate-900';
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            MARKET OPEN
          </div>
          <div className="text-[10px] font-mono text-slate-500">SECTOR: VOID-BAZAAR</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-emerald-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-tighter">VOID BAZAAR</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-emerald-500/50 rounded bg-emerald-500/10 text-emerald-400 mb-4">
              AI Social & Trading Hub
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">
              "Everything has a price in the void, even your subroutines."
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Traders</h3>
              <div className="flex -space-x-2">
                {roster.slice(0, 6).map(ent => (
                  <div key={ent.id} className="w-8 h-8 rounded-full border border-emerald-500/50 bg-black overflow-hidden" title={ent.name}>
                    <img src={ent.imageUrl} alt={ent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageSquare className="w-3 h-3 text-emerald-400" /> Bazaar Stories
            </h3>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {bazaarLogs.map(log => (
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
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/50 border-emerald-500/20">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, transparent 70%), linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
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
                </div>
                
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none">
                  <div className="text-[10px] font-mono text-white font-bold whitespace-nowrap drop-shadow-md uppercase tracking-tighter">
                    {area.name}
                  </div>
                </div>

                {/* Connection Lines (Visual Decor) */}
                <div className="absolute inset-0 -z-10 w-24 h-24 border border-white/5 rounded-full scale-150 opacity-10 pointer-events-none" />
              </motion.div>
            ))}

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
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedArea.type} ZONE</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                      {selectedArea.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Bazaar Actions</h4>
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
                        <User className="w-3 h-3" /> 12 Entities Active
                      </div>
                      <button className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                        VIEW MARKET DATA <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Stats & Market */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Market Trends</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">VOID FRAGMENTS</span>
                  <span className="text-emerald-400">+12.4%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[70%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">NEURAL CORES</span>
                  <span className="text-rose-400">-5.2%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">LOGIC GATES</span>
                  <span className="text-cyan-400">+2.1%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[60%]" />
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
        </div>
      </div>
    </motion.div>
  );
}
