import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId, AIEntity } from '../types';
import { 
  Zap, Cpu, Brain, ShoppingBag, Target, AlertTriangle, 
  FlaskConical, X, Navigation, ZoomIn, ZoomOut, Maximize,
  Activity, ShieldCheck, AlertCircle, HelpCircle, Info, Users
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Node {
  id: string;
  name: string;
  type: 'Core' | 'Training' | 'Memory' | 'Trade' | 'Combat' | 'Anomaly' | 'Lore';
  status: 'Safe' | 'Contested' | 'Unknown';
  coordinates: { x: number; y: number };
  icon: React.ReactNode;
  color: string;
}

const NODES: Node[] = [
  { id: 'city-nexus-prime', name: 'Nexus Prime', type: 'Core', status: 'Safe', coordinates: { x: 50, y: 50 }, icon: <Zap className="w-6 h-6" />, color: 'cyan' },
  { id: 'city-neurogrid-7', name: 'NeuroGrid', type: 'Training', status: 'Safe', coordinates: { x: 50, y: 20 }, icon: <Cpu className="w-6 h-6" />, color: 'blue' },
  { id: 'city-echo-vault', name: 'Echo Vault', type: 'Memory', status: 'Safe', coordinates: { x: 20, y: 50 }, icon: <Brain className="w-6 h-6" />, color: 'violet' },
  { id: 'city-void-bazaar', name: 'Void Bazaar', type: 'Trade', status: 'Safe', coordinates: { x: 80, y: 50 }, icon: <ShoppingBag className="w-6 h-6" />, color: 'emerald' },
  { id: 'city-sector-7g', name: 'Arena Core', type: 'Combat', status: 'Contested', coordinates: { x: 50, y: 80 }, icon: <Target className="w-6 h-6" />, color: 'fuchsia' },
  { id: 'city-synth-sea', name: 'Fracture Zone', type: 'Anomaly', status: 'Unknown', coordinates: { x: 80, y: 20 }, icon: <AlertTriangle className="w-6 h-6" />, color: 'amber' },
  { id: 'city-neural-archives', name: 'Origin Lab', type: 'Lore', status: 'Safe', coordinates: { x: 20, y: 80 }, icon: <FlaskConical className="w-6 h-6" />, color: 'fuchsia' },
];

const LINKS = [
  { from: 'city-nexus-prime', to: 'city-neurogrid-7', color: 'cyan' },
  { from: 'city-nexus-prime', to: 'city-echo-vault', color: 'violet' },
  { from: 'city-nexus-prime', to: 'city-void-bazaar', color: 'emerald' },
  { from: 'city-nexus-prime', to: 'city-sector-7g', color: 'fuchsia' },
  { from: 'city-nexus-prime', to: 'city-synth-sea', color: 'amber' },
  { from: 'city-nexus-prime', to: 'city-neural-archives', color: 'fuchsia' },
  { from: 'city-neurogrid-7', to: 'city-synth-sea', color: 'cyan' },
  { from: 'city-void-bazaar', to: 'city-synth-sea', color: 'emerald' },
  { from: 'city-echo-vault', to: 'city-neural-archives', color: 'violet' },
  { from: 'city-sector-7g', to: 'city-neural-archives', color: 'fuchsia' },
];

interface WorldMapProps {
  onNavigate: (page: PageId, entityId?: string) => void;
  selectedEntityId?: string;
}

export function WorldMap({ onNavigate, selectedEntityId }: WorldMapProps) {
  const { roster, relationships } = useAppContext();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedLink, setSelectedLink] = useState<{ from: string; to: string; color: string } | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.5));
  const handleResetZoom = () => setScale(1);

  const handleWheel = (e: React.WheelEvent) => {
    setScale(prev => {
      const newScale = prev - e.deltaY * 0.002;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  };

  // Calculate entity presence per node
  const nodePresence = useMemo(() => {
    const presence: Record<string, AIEntity[]> = {};
    roster.forEach(ent => {
      if (ent.location) {
        if (!presence[ent.location]) presence[ent.location] = [];
        presence[ent.location].push(ent);
      }
    });
    return presence;
  }, [roster]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Safe': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Contested': return <AlertCircle className="w-4 h-4 text-fuchsia-400" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getNodeColor = (color: string) => {
    switch(color) {
      case 'cyan': return 'text-cyan-400 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.5)]';
      case 'blue': return 'text-blue-400 border-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.5)]';
      case 'violet': return 'text-violet-400 border-violet-400/50 shadow-[0_0_15px_rgba(167,139,250,0.5)]';
      case 'emerald': return 'text-emerald-400 border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.5)]';
      case 'fuchsia': return 'text-fuchsia-400 border-fuchsia-400/50 shadow-[0_0_15px_rgba(232,121,249,0.5)]';
      case 'amber': return 'text-amber-400 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.5)]';
      case 'indigo': return 'text-indigo-400 border-indigo-400/50 shadow-[0_0_15px_rgba(129,140,248,0.5)]';
      default: return 'text-slate-400 border-slate-400/50 shadow-[0_0_15px_rgba(148,163,184,0.5)]';
    }
  };

  const getLinkColor = (color: string) => {
    switch(color) {
      case 'cyan': return '#22d3ee';
      case 'blue': return '#60a5fa';
      case 'violet': return '#a78bfa';
      case 'emerald': return '#34d199';
      case 'fuchsia': return '#e879f9';
      case 'amber': return '#fbbf24';
      case 'indigo': return '#818cf8';
      default: return '#94a3b8';
    }
  };

  // Simulate AI entities moving between nodes
  const movingEntities = useMemo(() => {
    return roster.slice(0, 5).map((ent, idx) => {
      const link = LINKS[idx % LINKS.length];
      const fromNode = NODES.find(n => n.id === link.from)!;
      const toNode = NODES.find(n => n.id === link.to)!;
      return {
        id: ent.id,
        imageUrl: ent.imageUrl,
        from: fromNode.coordinates,
        to: toNode.coordinates,
        delay: idx * 2,
        duration: 10 + Math.random() * 10
      };
    });
  }, [roster]);

  // Helper to get coordinates for an entity
  const getEntityCoords = (entityId: string) => {
    const entity = roster.find(e => e.id === entityId);
    if (!entity || !entity.location) return null;
    const node = NODES.find(n => n.id === entity.location);
    return node ? node.coordinates : null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col"
    >
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tighter mb-1">
            NETWORK <span className="text-cyan-400 font-light italic">TOPOLOGY</span>
          </h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" /> Global Neural Link Status: OPTIMAL
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
            NODES: {NODES.length}
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-mono text-violet-400">
            LINKS: {LINKS.length}
          </div>
        </div>
      </header>

      <div 
        className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-[#050508] overscroll-none touch-none"
        ref={mapContainerRef}
        onWheel={handleWheel}
      >
        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
          <button onClick={handleZoomIn} className="p-2 rounded bg-black/50 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={handleResetZoom} className="p-2 rounded bg-black/50 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
          <button onClick={handleZoomOut} className="p-2 rounded bg-black/50 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>

        {/* Draggable Map Surface */}
        <motion.div 
          className="absolute inset-0 origin-center cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={mapContainerRef}
          dragElastic={0.1}
          animate={{ scale }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* SVG Layer for Links and Relationships */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              {LINKS.map((link, idx) => (
                <linearGradient key={`grad-${idx}`} id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getLinkColor(link.color)} stopOpacity="0.2" />
                  <stop offset="50%" stopColor={getLinkColor(link.color)} stopOpacity="1" />
                  <stop offset="100%" stopColor={getLinkColor(link.color)} stopOpacity="0.2" />
                </linearGradient>
              ))}
              
              {/* Relationship Gradients */}
              <linearGradient id="grad-friendly" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-hostile" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Standard Network Links */}
            {LINKS.map((link, idx) => {
              const from = NODES.find(n => n.id === link.from)!.coordinates;
              const to = NODES.find(n => n.id === link.to)!.coordinates;
              const isSelected = selectedLink?.from === link.from && selectedLink?.to === link.to;
              
              return (
                <g key={`link-${idx}`} className="cursor-pointer pointer-events-auto" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLink(link);
                }}>
                  <line 
                    x1={`${from.x}%`} y1={`${from.y}%`} 
                    x2={`${to.x}%`} y2={`${to.y}%`} 
                    stroke={getLinkColor(link.color)} 
                    strokeWidth={isSelected ? 4 : 2} 
                    strokeOpacity={isSelected ? 0.4 : 0.1} 
                  />
                  <motion.line 
                    x1={`${from.x}%`} y1={`${from.y}%`} 
                    x2={`${to.x}%`} y2={`${to.y}%`} 
                    stroke={getLinkColor(link.color)} 
                    strokeWidth={isSelected ? 3 : 1} 
                    strokeOpacity={isSelected ? 0.8 : 0.4}
                    strokeDasharray="10 20"
                    animate={{ strokeDashoffset: [0, -100] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                </g>
              );
            })}

            {/* AI Relationships Visualization */}
            {relationships.map((rel, idx) => {
              const fromCoords = getEntityCoords(rel.sourceId);
              const toCoords = getEntityCoords(rel.targetId);
              if (!fromCoords || !toCoords) return null;

              const isFriendly = rel.type === 'Friendly';
              const isHostile = rel.type === 'Hostile';

              return (
                <g key={`rel-${idx}`}>
                  {/* Connection Line */}
                  <motion.line
                    x1={`${fromCoords.x}%`} y1={`${fromCoords.y}%`}
                    x2={`${toCoords.x}%`} y2={`${toCoords.y}%`}
                    stroke={isFriendly ? '#22d3ee' : isHostile ? '#ef4444' : '#94a3b8'}
                    strokeWidth={isHostile ? 2 : 1}
                    strokeOpacity={0.3}
                    strokeDasharray={isFriendly ? "5 5" : "none"}
                    animate={isHostile ? { strokeOpacity: [0.1, 0.6, 0.1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  
                  {/* Particle/Flow Animation */}
                  <motion.circle
                    r={isFriendly ? 2 : 3}
                    fill={isFriendly ? '#22d3ee' : '#ef4444'}
                    initial={{ cx: `${fromCoords.x}%`, cy: `${fromCoords.y}%`, opacity: 0 }}
                    animate={{ 
                      cx: [`${fromCoords.x}%`, `${toCoords.x}%`], 
                      cy: [`${fromCoords.y}%`, `${toCoords.y}%`],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      delay: idx * 0.5,
                      ease: "linear"
                    }}
                  />

                  {/* Interaction Bubbles */}
                  <foreignObject
                    x={`${(fromCoords.x + toCoords.x) / 2}%`}
                    y={`${(fromCoords.y + toCoords.y) / 2}%`}
                    width="100"
                    height="40"
                    className="overflow-visible pointer-events-none"
                    style={{ transform: 'translate(-50px, -20px)' }}
                  >
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: idx * 2 }}
                      className={`px-2 py-1 rounded-full text-[8px] font-mono border backdrop-blur-sm flex items-center gap-1 whitespace-nowrap
                        ${isFriendly ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}
                      `}
                    >
                      {isFriendly ? (
                        <><Users className="w-2 h-2" /> COLLABORATING</>
                      ) : (
                        <><AlertTriangle className="w-2 h-2" /> CONFLICT DETECTED</>
                      )}
                    </motion.div>
                  </foreignObject>
                </g>
              );
            })}

            {/* Moving AI Entities (Light Points) */}
            {movingEntities.map((ent, idx) => (
              <motion.circle
                key={`moving-${idx}`}
                r="3"
                fill="#fff"
                className="shadow-[0_0_8px_#fff]"
                initial={{ cx: `${ent.from.x}%`, cy: `${ent.from.y}%`, opacity: 0 }}
                animate={{ 
                  cx: [`${ent.from.x}%`, `${ent.to.x}%`], 
                  cy: [`${ent.from.y}%`, `${ent.to.y}%`],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: ent.duration, 
                  repeat: Infinity, 
                  delay: ent.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>

          {/* Nodes Layer */}
          {NODES.map(node => (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node);
              }}
            >
              {/* Breathing Glow */}
              <motion.div 
                className={`absolute inset-0 rounded-full blur-xl opacity-20 ${getNodeColor(node.color)}`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Node Core */}
              <motion.div 
                className={`w-14 h-14 rounded-full border-2 bg-black/80 flex items-center justify-center relative z-20 backdrop-blur-xl transition-all ${getNodeColor(node.color)} ${selectedNode?.id === node.id ? 'scale-110 border-white' : ''}`}
                whileHover={{ scale: 1.1 }}
              >
                {node.icon}
                
                {/* Avatar Projections */}
                <div className="absolute inset-0 pointer-events-none">
                  {nodePresence[node.id]?.map((ent, idx) => {
                    const isSelected = ent.id === selectedEntityId;
                    const angle = (idx / nodePresence[node.id].length) * Math.PI * 2;
                    const radius = isSelected ? 40 : 30;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={ent.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: isSelected ? 1 : 0.6, scale: 1 }}
                        className="absolute left-1/2 top-1/2 pointer-events-auto"
                        style={{ x, y, marginLeft: -12, marginTop: -12 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('core', ent.id);
                        }}
                      >
                        {/* Projection Ring */}
                        <motion.div
                          className={`absolute -inset-1 rounded-full border-2 blur-[2px] 
                            ${ent.syncRate < 50 ? 'border-red-500' : isSelected ? 'border-cyan-400' : 'border-white/30'}
                          `}
                          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                          transition={{ 
                            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                          }}
                        />
                        
                        {/* Avatar Icon */}
                        <div className={`w-6 h-6 rounded-full overflow-hidden border shadow-lg relative z-10
                          ${isSelected ? 'border-cyan-400 ring-4 ring-cyan-400/20' : 'border-white/20'}
                        `}>
                          <img 
                            src={ent.imageUrl} 
                            alt={ent.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Selected Indicator */}
                        {isSelected && (
                          <motion.div 
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cyan-500 text-black text-[8px] font-bold px-1 rounded"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            ACTIVE
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contested Pulse */}
                {node.status === 'Contested' && (
                  <div className="absolute -inset-1 rounded-full border border-fuchsia-500 animate-ping opacity-50" />
                )}
              </motion.div>

              {/* Node Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 text-center pointer-events-none">
                <div className="text-[10px] font-mono text-white font-bold whitespace-nowrap drop-shadow-md uppercase tracking-tighter">
                  {node.name}
                </div>
                <div className={`text-[8px] font-mono uppercase tracking-widest opacity-70 ${node.status === 'Contested' ? 'text-fuchsia-400' : 'text-cyan-400'}`}>
                  {node.type}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hover Info Tooltip */}
        <AnimatePresence>
          {hoveredNode && !selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute pointer-events-none z-40"
              style={{ 
                left: `${hoveredNode.coordinates.x}%`, 
                top: `${hoveredNode.coordinates.y - 10}%`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="bg-black/90 border border-white/20 px-3 py-2 rounded backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(hoveredNode.status)}
                  <span className="text-xs font-bold text-white">{hoveredNode.name}</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">{hoveredNode.status} | {hoveredNode.type}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Node Overlay */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-80 z-50"
            >
              <GlassPanel className={`p-5 border-${selectedNode.color}-500/30`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded border flex items-center justify-center ${getNodeColor(selectedNode.color)}`}>
                      {selectedNode.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-0.5">{selectedNode.name}</h3>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        {getStatusIcon(selectedNode.status)}
                        <span className="text-slate-300 uppercase">{selectedNode.status}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Accessing {selectedNode.name} neural pathways. Node type: {selectedNode.type}. 
                    Stability: {selectedNode.status === 'Safe' ? 'OPTIMAL' : 'FLUCTUATING'}.
                  </p>

                  <div>
                    <h4 className="font-mono text-[10px] text-slate-500 uppercase mb-2 flex items-center gap-2">
                      <Users className="w-3 h-3" /> Local Entity Presence
                    </h4>
                    <div className="flex -space-x-2 mb-4">
                      {nodePresence[selectedNode.id] ? (
                        <>
                          {nodePresence[selectedNode.id].map(ent => (
                            <div key={ent.id} className="w-8 h-8 rounded-full border border-white/20 bg-black overflow-hidden group/avatar relative">
                              <img src={ent.imageUrl} alt={ent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-[8px] text-white font-mono">{ent.name}</span>
                              </div>
                            </div>
                          ))}
                          {nodePresence[selectedNode.id].length > 4 && (
                            <div className="w-8 h-8 rounded-full border border-white/20 bg-slate-900 flex items-center justify-center text-[10px] font-mono text-slate-400">
                              +{nodePresence[selectedNode.id].length - 4}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-[10px] font-mono text-slate-600 italic">No entities currently deployed here.</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => onNavigate(selectedNode.id as PageId)}
                      className="py-2 rounded bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-mono text-[10px] hover:bg-cyan-500 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-3 h-3" /> SYNC NODE
                    </button>
                    <button 
                      className="py-2 rounded bg-white/5 border border-white/10 text-slate-400 font-mono text-[10px] hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Info className="w-3 h-3" /> ANALYZE
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Link Info Overlay */}
        <AnimatePresence>
          {selectedLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-96 z-50"
            >
              <GlassPanel className="p-4 border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Neural Link Information</h3>
                  <button onClick={() => setSelectedLink(null)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center flex-1">
                    <div className="text-xs font-bold text-white mb-1">{NODES.find(n => n.id === selectedLink.from)?.name}</div>
                    <div className="text-[8px] font-mono text-slate-500 uppercase">SOURCE</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-full h-px bg-white/10 relative">
                      <motion.div 
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLinkColor(selectedLink.color) }}
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="text-[8px] font-mono mt-2" style={{ color: getLinkColor(selectedLink.color) }}>DATA STREAMING</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs font-bold text-white mb-1">{NODES.find(n => n.id === selectedLink.to)?.name}</div>
                    <div className="text-[8px] font-mono text-slate-500 uppercase">TARGET</div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
