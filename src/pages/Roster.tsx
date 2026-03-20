import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EntityCard } from '../components/EntityCard';
import { NeuralLinkModal } from '../components/NeuralLinkModal';
import { useAppContext } from '../context/AppContext';
import { AIEntity, PageId } from '../types';
import { Filter } from 'lucide-react';

interface RosterProps {
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function Roster({ onNavigate }: RosterProps) {
  const { roster, updateEntity } = useAppContext();
  const [selectedForLink, setSelectedForLink] = useState<AIEntity | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tighter mb-1">
            ENTITY <span className="text-neon-fuchsia font-light">ROSTER</span>
          </h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">Digital Lifeform Collection</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-sm font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/5 text-sm font-mono text-slate-400">
            Total: <span className="text-white">{roster.length}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {roster.map((entity, index) => (
          <motion.div
            key={entity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EntityCard 
              entity={entity} 
              onClick={(id) => onNavigate('core', id)} 
              onLinkConfig={(ent) => setSelectedForLink(ent)}
            />
          </motion.div>
        ))}
      </div>

      {selectedForLink && (
        <NeuralLinkModal 
          entity={selectedForLink}
          isOpen={!!selectedForLink}
          onClose={() => setSelectedForLink(null)}
          onSave={(config) => {
            updateEntity({ ...selectedForLink, neuralConfig: config });
          }}
        />
      )}
    </motion.div>
  );
}
