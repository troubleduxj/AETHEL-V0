import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { MapPin, AlertCircle, ShieldCheck, HelpCircle, X, Navigation, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const cities = [
  { id: 'city-nexus-prime', name: 'Nexus Prime', status: 'Safe', coordinates: { x: 50, y: 50 }, activeEntities: ['1', '2'], type: 'Social / Trade Hub' },
  { id: 'city-silicon-wastes', name: 'The Silicon Wastes', status: 'Unknown', coordinates: { x: 20, y: 30 }, activeEntities: [], type: 'Exploration / Scavenging' },
  { id: 'city-sector-7g', name: 'Sector 7G', status: 'Contested', coordinates: { x: 80, y: 20 }, activeEntities: ['3'], type: 'Combat / High Risk' },
  { id: 'city-neural-archives', name: 'The Neural Archives', status: 'Safe', coordinates: { x: 30, y: 70 }, activeEntities: ['4'], type: 'Lore / Experimental' },
  { id: 'city-aegis-bulwark', name: 'Aegis Bulwark', status: 'Safe', coordinates: { x: 70, y: 80 }, activeEntities: [], type: 'Defense / Faction Hub' },
  { id: 'city-synth-sea', name: 'The Synth-Sea', status: 'Unknown', coordinates: { x: 85, y: 55 }, activeEntities: ['5'], type: 'Exploration / Anomalies' }
];

interface WorldMapProps {
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function WorldMap({ onNavigate }: WorldMapProps) {
  const { roster } = useAppContext();
  const [selectedRegion, setSelectedRegion] = useState<typeof cities[0] | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.5));
  const handleResetZoom = () => setScale(1);

  const handleWheel = (e: React.WheelEvent) => {
    // Prevent default scrolling behavior is handled by CSS overscroll-none
    setScale(prev => {
      const newScale = prev - e.deltaY * 0.002;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Safe': return <ShieldCheck className="w-4 h-4 text-neon-emerald" />;
      case 'Contested': return <AlertCircle className="w-4 h-4 text-neon-fuchsia" />;
      default: return <HelpCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Safe': return 'border-neon-emerald/50 bg-neon-emerald/10';
      case 'Contested': return 'border-neon-fuchsia/50 bg-neon-fuchsia/10';
      default: return 'border-slate-500/50 bg-slate-500/10';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col"
    >
      <header className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tighter mb-1">
          WORLD <span className="text-neon-cyan font-light">MAP</span>
        </h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Global Entity Tracking & Auto-Activity</p>
      </header>

      <div 
        className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0f] overscroll-none touch-none"
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
          {/* Map Grid Background */}
          <div 
            className="absolute inset-[-100%] opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: 'center'
            }}
          />

          {/* Map Regions & Nodes */}
          {cities.map(region => (
            <motion.div
              key={region.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRegion(region);
              }}
              whileHover={{ scale: 1.1 }}
            >
            {/* Pulse effect for contested */}
            {region.status === 'Contested' && (
              <div className="absolute inset-0 rounded-full bg-neon-fuchsia/30 animate-ping" />
            )}
            
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center backdrop-blur-md relative z-10 ${getStatusColor(region.status)}`}>
              {getStatusIcon(region.status)}
            </div>

            {/* Region Label */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-center pointer-events-none">
              <div className="font-mono text-xs text-white font-bold drop-shadow-md">{region.name}</div>
              <div className="font-mono text-[10px] text-neon-cyan">{region.type}</div>
            </div>

            {/* Active Entity Avatars */}
            {region.activeEntities.length > 0 && (
              <div className="absolute -top-4 -right-4 flex -space-x-2">
                {region.activeEntities.map(entId => {
                  const ent = roster.find(e => e.id === entId);
                  if (!ent) return null;
                  return (
                    <div key={entId} className="w-6 h-6 rounded-full border border-neon-cyan overflow-hidden bg-black">
                      <img src={ent.imageUrl} alt={ent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
        </motion.div>

        {/* Selected Region Overlay */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-80"
            >
              <GlassPanel className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-1">{selectedRegion.name}</h3>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      {getStatusIcon(selectedRegion.status)}
                      <span className="text-slate-300 uppercase">{selectedRegion.status}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedRegion(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-mono text-[10px] text-slate-500 uppercase mb-2">Active Entities in Sector</h4>
                    {selectedRegion.activeEntities.length > 0 ? (
                      <div className="space-y-2">
                        {selectedRegion.activeEntities.map(entId => {
                          const ent = roster.find(e => e.id === entId);
                          if (!ent) return null;
                          return (
                            <div 
                              key={entId} 
                              className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 hover:border-neon-cyan/30 cursor-pointer transition-colors"
                              onClick={() => onNavigate('logs')}
                            >
                              <div className="flex items-center gap-2">
                                <img src={ent.imageUrl} alt={ent.name} className="w-8 h-8 rounded border border-white/10 object-cover" referrerPolicy="no-referrer" />
                                <div>
                                  <div className="font-bold text-sm text-white">{ent.name}</div>
                                  <div className="font-mono text-[10px] text-neon-cyan">{ent.status}</div>
                                </div>
                              </div>
                              <Navigation className="w-4 h-4 text-slate-500" />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 font-mono italic">No entities detected.</div>
                    )}
                  </div>

                  {selectedRegion.status === 'Contested' && (
                    <button 
                      onClick={() => onNavigate('combat')}
                      className="w-full py-2 rounded bg-neon-fuchsia/20 border border-neon-fuchsia/50 text-neon-fuchsia font-mono text-sm hover:bg-neon-fuchsia hover:text-white transition-colors"
                    >
                      ENGAGE COMBAT
                    </button>
                  )}
                  
                  <button 
                    onClick={() => onNavigate(selectedRegion.id as PageId)}
                    className="w-full py-2 rounded bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan font-mono text-sm hover:bg-neon-cyan hover:text-slate-900 transition-colors"
                  >
                    ENTER REGION
                  </button>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
