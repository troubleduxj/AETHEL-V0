import React from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SpecOverlayProps {
  isOpen: boolean;
  pageName: string;
  structure: string;
  components: string;
  interaction: string;
}

export function SpecOverlay({ isOpen, pageName, structure, components, interaction }: SpecOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-20 right-4 w-80 z-50 pointer-events-none"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl border border-neon-fuchsia/30 rounded-xl p-5 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <Info className="w-4 h-4 text-neon-fuchsia" />
              <h4 className="font-display text-sm font-bold text-white tracking-wider uppercase">Design Spec</h4>
            </div>
            
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1 font-mono">PAGE</span>
                <span className="text-neon-cyan font-medium">{pageName}</span>
              </div>
              
              <div>
                <span className="text-slate-400 block mb-1 font-mono">STRUCTURE</span>
                <p className="text-slate-300 leading-relaxed">{structure}</p>
              </div>
              
              <div>
                <span className="text-slate-400 block mb-1 font-mono">COMPONENTS</span>
                <p className="text-slate-300 leading-relaxed">{components}</p>
              </div>
              
              <div>
                <span className="text-slate-400 block mb-1 font-mono">INTERACTION</span>
                <p className="text-slate-300 leading-relaxed">{interaction}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
