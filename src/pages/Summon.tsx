import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { summonPool } from '../data/mockData';
import { AethelCard } from '../components/AethelCard';
import { EntityCard } from '../components/EntityCard';
import { NeuralLinkModal } from '../components/NeuralLinkModal';
import { Sparkles, Database, Loader2, Cpu } from 'lucide-react';
import { AIEntity, PageId } from '../types';
import { entities } from '../data';

export function Summon({ onNavigate }: { onNavigate: (page: PageId, entityId?: string) => void }) {
  const { dataFragments, spendDataFragments, addEntityToRoster, updateEntity } = useAppContext();
  const [isSummoning, setIsSummoning] = useState(false);
  const [summonedEntity, setSummonedEntity] = useState<AIEntity | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SUMMON_COST = 100;

  const handleSummon = async () => {
    if (dataFragments < SUMMON_COST) {
      setError('Insufficient Data Fragments');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsSummoning(true);
    setSummonedEntity(null);
    setError(null);

    // Deduct cost
    spendDataFragments(SUMMON_COST);

    // Simulate summoning delay for animation
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Select random entity from pool
    const randomIndex = Math.floor(Math.random() * summonPool.length);
    const newEntity = { ...summonPool[randomIndex], id: `summoned_${Date.now()}` }; // Ensure unique ID

    addEntityToRoster(newEntity);
    setSummonedEntity(newEntity);
    setIsSummoning(false);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[800px] h-[800px] bg-neon-cyan/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute w-[600px] h-[600px] bg-neon-fuchsia/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="z-10 text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          SUMMONING PORTAL
        </h1>
        <p className="text-slate-400 font-mono text-sm max-w-md mx-auto">
          Expend Data Fragments to materialize new AI Entities from the digital ether.
        </p>
      </div>

      {/* Portal UI */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12"
          animate={{ rotate: isSummoning ? 360 : 0 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-neon-cyan/30 rounded-full" />
          {/* Inner Ring */}
          <div className="absolute inset-4 border border-neon-fuchsia/40 rounded-full" />
          {/* Core */}
          <div className={`absolute inset-12 rounded-full bg-slate-900 border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.2)] flex items-center justify-center overflow-hidden transition-all duration-500 ${isSummoning ? 'shadow-[0_0_100px_rgba(255,0,255,0.6)] scale-110' : ''}`}>
             <Sparkles className={`w-12 h-12 text-white/50 ${isSummoning ? 'animate-ping text-neon-fuchsia' : ''}`} />
          </div>
        </motion.div>

        {/* Summon Button & Cost */}
        <div className="flex flex-col items-center gap-4 mb-20">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Database className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-white font-bold">{dataFragments}</span>
            <span className="text-slate-500 text-xs uppercase">Available</span>
          </div>

          <button
            onClick={handleSummon}
            disabled={isSummoning}
            className="relative overflow-hidden group bg-white text-black font-display font-bold text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-fuchsia opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="relative flex items-center gap-2">
              {isSummoning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  MATERIALIZING...
                </>
              ) : (
                <>
                  INITIATE SEQUENCE
                  <span className="text-xs font-mono bg-black/10 px-2 py-1 rounded ml-2">
                    -{SUMMON_COST} DF
                  </span>
                </>
              )}
            </span>
          </button>
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 font-mono text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Showcase Section */}
        <div className="w-full max-w-7xl px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <h2 className="font-display text-2xl font-bold text-white tracking-[0.2em] uppercase flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-neon-cyan" />
              Entity Showcase
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 perspective-[2000px]">
            {entities.map((entity) => (
              <div key={entity.id} className="relative">
                <AethelCard entity={entity} />
                {/* Rarity Overlay for Showcase */}
                <div className="absolute top-4 left-4 z-30 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white/70 uppercase tracking-wider">
                    Pool Item
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summon Result Modal */}
      <AnimatePresence>
        {summonedEntity && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-sm w-full"
            >
              <div className="absolute -top-12 left-0 right-0 text-center">
                <h2 className="text-2xl font-display font-bold text-neon-cyan tracking-widest uppercase animate-pulse">
                  Entity Acquired
                </h2>
              </div>
              
              <EntityCard 
                entity={summonedEntity} 
                onClick={() => {}} 
                onLinkConfig={() => setShowLinkModal(true)}
              />
              
              <div className="mt-8 flex flex-col items-center gap-4">
                <button 
                  onClick={() => setShowLinkModal(true)}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan font-mono text-xs hover:bg-neon-cyan/30 transition-all animate-bounce"
                >
                  <Cpu className="w-4 h-4" />
                  INITIALIZE NEURAL LINK
                </button>

                <button 
                  onClick={() => setSummonedEntity(null)}
                  className="text-slate-400 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-1"
                >
                  Acknowledge & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {summonedEntity && showLinkModal && (
        <NeuralLinkModal 
          entity={summonedEntity}
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          onSave={(config) => {
            const updated = { ...summonedEntity, neuralConfig: config };
            updateEntity(updated);
            setSummonedEntity(updated);
          }}
        />
      )}
    </div>
  );
}
