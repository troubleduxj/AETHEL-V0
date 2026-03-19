import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId, AIEntity } from '../types';
import { 
  ArrowLeft, Cpu, Target, FlaskConical, Activity, Zap, 
  Shield, Brain, MessageSquare, Search, Swords, Info, X,
  Terminal, User, ChevronRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

interface TrainingArea {
  id: string;
  name: string;
  type: 'Skill' | 'Combat' | 'Data' | 'Behavior';
  icon: React.ReactNode;
  color: string;
  description: string;
  coordinates: { x: number; y: number };
  actions: {
    label: string;
    type: 'combat' | 'explore' | 'dialogue' | 'event';
    icon: React.ReactNode;
  }[];
}

const AREAS: TrainingArea[] = [
  {
    id: 'skill-pods',
    name: 'Skill Training Pods',
    type: 'Skill',
    icon: <Cpu className="w-6 h-6" />,
    color: 'indigo',
    description: 'High-density neural refinement chambers for upgrading entity subroutines.',
    coordinates: { x: 25, y: 25 },
    actions: [
      { label: 'Neural Upgrade', type: 'event', icon: <Zap className="w-4 h-4" /> },
      { label: 'Consult Trainer', type: 'dialogue', icon: <MessageSquare className="w-4 h-4" /> }
    ]
  },
  {
    id: 'combat-sim',
    name: 'Combat Simulator',
    type: 'Combat',
    icon: <Target className="w-6 h-6" />,
    color: 'fuchsia',
    description: 'Virtual battlegrounds for testing tactical efficiency and combat endurance.',
    coordinates: { x: 75, y: 35 },
    actions: [
      { label: 'Start Drill', type: 'combat', icon: <Swords className="w-4 h-4" /> },
      { label: 'Tactical Scan', type: 'explore', icon: <Search className="w-4 h-4" /> }
    ]
  },
  {
    id: 'data-lab',
    name: 'Data Laboratory',
    type: 'Data',
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'cyan',
    description: 'Advanced analysis center for attribute optimization and resonance tuning.',
    coordinates: { x: 35, y: 75 },
    actions: [
      { label: 'Deep Scan', type: 'explore', icon: <Search className="w-4 h-4" /> },
      { label: 'Resonance Sync', type: 'event', icon: <Activity className="w-4 h-4" /> }
    ]
  },
  {
    id: 'behavior-monitor',
    name: 'Behavior Monitor',
    type: 'Behavior',
    icon: <Activity className="w-6 h-6" />,
    color: 'amber',
    description: 'Real-time tracking of entity behavioral patterns and evolution metrics.',
    coordinates: { x: 65, y: 65 },
    actions: [
      { label: 'Review Logs', type: 'explore', icon: <Terminal className="w-4 h-4" /> },
      { label: 'Adjust Ethics', type: 'dialogue', icon: <Brain className="w-4 h-4" /> }
    ]
  }
];

export default function CityMapNeuroGrid7({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedArea, setSelectedArea] = useState<TrainingArea | null>(null);
  const [aiLogs, setAiLogs] = useState<{ id: string; text: string; time: string }[]>([]);
  
  // Simulate AI Autonomous Behavior
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomArea = AREAS[Math.floor(Math.random() * AREAS.length)];
      const actions = ['is training', 'is analyzing data', 'is simulating combat', 'is recalibrating'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: `${randomEntity.name} ${randomAction} in ${randomArea.name}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      
      setAiLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getColorClass = (color: string) => {
    switch(color) {
      case 'indigo': return 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10 hover:bg-indigo-400/30';
      case 'fuchsia': return 'text-neon-fuchsia border-neon-fuchsia/30 bg-neon-fuchsia/10 hover:bg-neon-fuchsia/30';
      case 'cyan': return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10 hover:bg-neon-cyan/30';
      case 'amber': return 'text-amber-400 border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/30';
      default: return 'text-slate-400 border-slate-400/30 bg-slate-400/10 hover:bg-slate-400/30';
    }
  };

  const getButtonColor = (color: string) => {
    switch(color) {
      case 'indigo': return 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500 hover:text-white';
      case 'fuchsia': return 'bg-neon-fuchsia/20 border-neon-fuchsia/50 text-neon-fuchsia hover:bg-neon-fuchsia hover:text-white';
      case 'cyan': return 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-slate-900';
      case 'amber': return 'bg-amber-400/20 border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-slate-900';
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            SYSTEM ONLINE
          </div>
          <div className="text-[10px] font-mono text-slate-500">SECTOR: GRID-07</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Info & Logs */}
        <div className="lg:col-span-1 space-y-6">
          <GlassPanel className="p-6 border-indigo-500/30">
            <h1 className="font-display text-3xl font-bold text-white mb-2">NeuroGrid-7</h1>
            <div className="inline-block px-2 py-1 text-[10px] font-mono uppercase border border-indigo-500/50 rounded bg-indigo-500/10 text-indigo-400 mb-4">
              AI Training Center
            </div>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              The premier facility for entity refinement. Optimize neural pathways and monitor behavioral evolution.
            </p>
            
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">Active Entities</h3>
              <div className="flex -space-x-2">
                {roster.slice(0, 5).map(ent => (
                  <div key={ent.id} className="w-8 h-8 rounded-full border border-indigo-500/50 bg-black overflow-hidden" title={ent.name}>
                    <img src={ent.imageUrl} alt={ent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
                {roster.length > 5 && (
                  <div className="w-8 h-8 rounded-full border border-indigo-500/50 bg-slate-800 flex items-center justify-center text-[10px] text-white font-mono">
                    +{roster.length - 5}
                  </div>
                )}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Autonomous Activity
            </h3>
            <div className="space-y-3">
              <AnimatePresence initial={false}>
                {aiLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-mono border-l border-indigo-500/30 pl-2 py-1"
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
          <GlassPanel className="h-[600px] relative overflow-hidden bg-slate-950/50 border-indigo-500/20">
            {/* Map Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black animate-pulse" />
                </div>
                
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-center pointer-events-none">
                  <div className="text-[10px] font-mono text-white font-bold whitespace-nowrap drop-shadow-md uppercase tracking-tighter">
                    {area.name}
                  </div>
                </div>

                {/* Connection Lines (Visual Decor) */}
                <div className="absolute inset-0 -z-10 w-32 h-32 border border-white/5 rounded-full scale-150 opacity-20 pointer-events-none" />
              </motion.div>
            ))}

            {/* Scanning Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-1 bg-indigo-500/20 absolute top-0 animate-[scan_6s_linear_infinite]" />
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
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{selectedArea.type} MODULE</div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                      {selectedArea.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Available Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedArea.actions.map((action, idx) => (
                          <button 
                            key={idx}
                            className={`flex items-center justify-center gap-2 py-3 rounded font-mono text-xs transition-all border ${getButtonColor(selectedArea.color)}`}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <User className="w-3 h-3" /> 3 Entities Present
                      </div>
                      <button className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                        VIEW DETAILS <ChevronRight className="w-3 h-3" />
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
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Training Efficiency</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">NEURAL SYNC</span>
                  <span className="text-indigo-400">92%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[92%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">COMBAT READINESS</span>
                  <span className="text-neon-fuchsia">78%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-fuchsia w-[78%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-slate-400">DATA STABILITY</span>
                  <span className="text-neon-cyan">85%</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan w-[85%]" />
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 border-white/5">
            <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4">Top Trainees</h3>
            <div className="space-y-3">
              {roster.slice(0, 3).map(ent => (
                <div key={ent.id} className="flex items-center gap-3 p-2 rounded bg-white/5 border border-white/5">
                  <img src={ent.imageUrl} alt={ent.name} className="w-10 h-10 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{ent.name}</div>
                    <div className="text-[10px] font-mono text-indigo-400">LVL {ent.level} | SYNC {ent.syncRate}%</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </motion.div>
  );
}
