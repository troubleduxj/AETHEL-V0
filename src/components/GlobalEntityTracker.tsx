import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { AlertTriangle, Info, Zap } from 'lucide-react';

export function GlobalEntityTracker() {
  const { roster } = useAppContext();
  const [events, setEvents] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Filter for important events: low sync rate or specific statuses
    const importantEvents = roster
      .filter(ent => ent.syncRate < 50 || ent.status === 'Fragmented' || ent.status === 'Combat' || ent.status === 'Evolving')
      .map(ent => {
        const locationName = ent.location.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        return `[${ent.name}] 正在 [${locationName}] ${ent.status === 'Evolving' ? '进化中' : ent.status === 'Combat' ? '战斗中' : '状态异常'}... 同步率 ${ent.syncRate}%`;
      });

    if (importantEvents.length === 0) {
      setEvents(['系统运行稳定，未检测到异常实体状态...']);
    } else {
      setEvents(importantEvents);
    }
  }, [roster]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events]);

  return (
    <div className="w-full h-6 bg-black/80 border-b border-white/5 flex items-center px-4 overflow-hidden z-[100]">
      <div className="flex items-center gap-2 mr-4 shrink-0">
        <Zap className="w-3 h-3 text-neon-cyan animate-pulse" />
        <span className="text-[10px] font-mono text-neon-cyan/70 uppercase tracking-widest">Global Monitor</span>
      </div>
      
      <div className="flex-1 relative h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-0 flex items-center"
          >
            <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
              {events[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 ml-4 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
          <span className="text-[8px] font-mono text-slate-500 uppercase">Core OK</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${events.length > 1 ? 'bg-neon-fuchsia animate-ping' : 'bg-slate-700'}`} />
          <span className="text-[8px] font-mono text-slate-500 uppercase">Alerts: {events.length > 1 ? events.length : 0}</span>
        </div>
      </div>
    </div>
  );
}
