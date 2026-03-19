import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { useAppContext } from './context/AppContext';
import { Nexus } from './pages/Nexus';
import { Roster } from './pages/Roster';
import { EntityCore } from './pages/EntityCore';
import { Synapse } from './pages/Synapse';
import { WorldMap } from './pages/WorldMap';
import { BehaviorLogs } from './pages/BehaviorLogs';
import { Combat } from './pages/Combat';
import { AethelShowcase } from './pages/AethelShowcase';
import { Summon } from './pages/Summon';
import { SpecOverlay } from './components/SpecOverlay';
import { LayoutDashboard, Users, Info, Map, Activity, Swords, Sparkles, Database } from 'lucide-react';

import CityMapNexusPrime from './pages/CityMapNexusPrime';
import CityMapSiliconWastes from './pages/CityMapSiliconWastes';
import CityMapSector7G from './pages/CityMapSector7G';
import CityMapNeuralArchives from './pages/CityMapNeuralArchives';
import CityMapAegisBulwark from './pages/CityMapAegisBulwark';
import CityMapSynthSea from './pages/CityMapSynthSea';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('aethel');
  const [selectedEntityId, setSelectedEntityId] = useState<string | undefined>();
  const [showSpec, setShowSpec] = useState(false);
  const { roster, dataFragments } = useAppContext();

  const handleNavigate = (page: PageId, entityId?: string) => {
    setCurrentPage(page);
    if (entityId) setSelectedEntityId(entityId);
  };

  const selectedEntity = selectedEntityId ? roster.find(e => e.id === selectedEntityId) : undefined;

  // Spec Data based on current page
  const specData = {
    nexus: {
      name: 'Nexus Core (Dashboard)',
      structure: 'Top-level overview. Left: Main status & navigation. Right: Activity logs & storage.',
      components: 'GlassPanel (container), Neon Typography, Progress Bars.',
      interaction: 'Click "Access Entity Roster" to view collection.'
    },
    roster: {
      name: 'Entity Roster (Collection)',
      structure: 'Grid layout of all available AI entities.',
      components: 'EntityCard (hover effects, dynamic progress bars, rarity badges).',
      interaction: 'Click any card to view detailed Entity Core.'
    },
    core: {
      name: 'Entity Core (Details)',
      structure: 'Split view. Left: Visuals & primary action. Right: Detailed stats & memory logs.',
      components: 'StatBar (animated), MemoryFragment list, Primary Action Button (glow).',
      interaction: 'Click "INITIATE SYNAPSE LINK" to chat/train the entity.'
    },
    synapse: {
      name: 'Synapse Link (Interaction)',
      structure: 'Chat interface. Header with status, scrollable message area, input field.',
      components: 'MessageBubble (differentiated by sender), TypingIndicator, Terminal Input.',
      interaction: 'Type a message and press enter to simulate training/interaction.'
    },
    map: {
      name: 'World Map (Exploration)',
      structure: 'Interactive grid map showing global entity tracking and active regions.',
      components: 'Map Node, Region Overlay, Active Entity Avatars.',
      interaction: 'Click a region to view details and dispatch entities.'
    },
    logs: {
      name: 'Behavior Logs (Monitoring)',
      structure: 'Chronological list of entity actions and system events.',
      components: 'Log Entry, Filter Tabs, Status Indicators.',
      interaction: 'Review historical data of entity decisions.'
    },
    combat: {
      name: 'Combat (Simulation)',
      structure: 'Battle arena view with entity stats, skills, and action logs.',
      components: 'Health Bar, Skill Button, Combat Log, Entity Sprite.',
      interaction: 'Select skills to engage in simulated combat.'
    },
    aethel: {
      name: 'Aethel Showcase',
      structure: 'Showcase of the 3 new AI entities with Glassmorphism cards.',
      components: 'AethelCard, RadarChart, 3D Tilt Effect.',
      interaction: 'Hover over cards to see 3D tilt and skill tooltips.'
    },
    summon: {
      name: 'Summoning Portal',
      structure: 'Gacha interface to acquire new AI entities.',
      components: 'Portal Animation, Summon Button, Entity Reveal.',
      interaction: 'Click Extract to spend Data Fragments and summon an entity.'
    }
  };

  const currentSpec = specData[currentPage as keyof typeof specData] || specData.nexus;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-neon-cyan/30">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="font-display font-bold text-xl tracking-widest text-white flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-neon-cyan to-neon-fuchsia flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            AETHEL
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <button 
              onClick={() => handleNavigate('aethel')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${currentPage === 'aethel' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Sparkles className="w-4 h-4" /> Showcase
            </button>
            <button 
              onClick={() => handleNavigate('summon')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${currentPage === 'summon' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Database className="w-4 h-4" /> Summon
            </button>
            <button 
              onClick={() => handleNavigate('nexus')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${currentPage === 'nexus' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Nexus
            </button>
            <button 
              onClick={() => handleNavigate('roster')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${currentPage === 'roster' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Users className="w-4 h-4" /> Roster
            </button>
            <button 
              onClick={() => handleNavigate('combat')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2 ${currentPage === 'combat' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              <Swords className="w-4 h-4" /> Combat
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/5 text-sm font-mono text-neon-cyan">
            <Database className="w-4 h-4" />
            {dataFragments} DF
          </div>
          <button 
            onClick={() => setShowSpec(!showSpec)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${showSpec ? 'bg-neon-fuchsia/20 border-neon-fuchsia/50 text-neon-fuchsia' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
          >
            <Info className="w-3 h-3" />
            {showSpec ? 'Hide Spec' : 'Show Spec'}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <AnimatePresence mode="wait">
          {currentPage === 'aethel' && <AethelShowcase key="aethel" onNavigate={handleNavigate} />}
          {currentPage === 'summon' && <Summon key="summon" onNavigate={handleNavigate} />}
          {currentPage === 'nexus' && <Nexus key="nexus" onNavigate={handleNavigate} />}
          {currentPage === 'roster' && <Roster key="roster" onNavigate={handleNavigate} />}
          {currentPage === 'core' && selectedEntity && <EntityCore key="core" entity={selectedEntity} onNavigate={handleNavigate} />}
          {currentPage === 'synapse' && selectedEntity && <Synapse key="synapse" entity={selectedEntity} onNavigate={handleNavigate} />}
          {currentPage === 'map' && <WorldMap key="map" onNavigate={handleNavigate} />}
          {currentPage === 'city-nexus-prime' && <CityMapNexusPrime key="city-nexus-prime" onNavigate={handleNavigate} />}
          {currentPage === 'city-silicon-wastes' && <CityMapSiliconWastes key="city-silicon-wastes" onNavigate={handleNavigate} />}
          {currentPage === 'city-sector-7g' && <CityMapSector7G key="city-sector-7g" onNavigate={handleNavigate} />}
          {currentPage === 'city-neural-archives' && <CityMapNeuralArchives key="city-neural-archives" onNavigate={handleNavigate} />}
          {currentPage === 'city-aegis-bulwark' && <CityMapAegisBulwark key="city-aegis-bulwark" onNavigate={handleNavigate} />}
          {currentPage === 'city-synth-sea' && <CityMapSynthSea key="city-synth-sea" onNavigate={handleNavigate} />}
          {currentPage === 'logs' && <BehaviorLogs key="logs" onNavigate={handleNavigate} />}
          {currentPage === 'combat' && <Combat key="combat" onNavigate={handleNavigate} />}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav (visible only on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 z-40 flex items-center justify-around px-2">
        <button 
          onClick={() => handleNavigate('aethel')}
          className={`flex flex-col items-center gap-1 p-2 ${currentPage === 'aethel' ? 'text-neon-cyan' : 'text-slate-500'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase">Showcase</span>
        </button>
        <button 
          onClick={() => handleNavigate('summon')}
          className={`flex flex-col items-center gap-1 p-2 ${currentPage === 'summon' ? 'text-neon-cyan' : 'text-slate-500'}`}
        >
          <Database className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase">Summon</span>
        </button>
        <button 
          onClick={() => handleNavigate('roster')}
          className={`flex flex-col items-center gap-1 p-2 ${currentPage === 'roster' ? 'text-neon-cyan' : 'text-slate-500'}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase">Roster</span>
        </button>
        <button 
          onClick={() => handleNavigate('combat')}
          className={`flex flex-col items-center gap-1 p-2 ${currentPage === 'combat' ? 'text-neon-cyan' : 'text-slate-500'}`}
        >
          <Swords className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase">Combat</span>
        </button>
      </div>

      {/* Design Spec Overlay */}
      <SpecOverlay 
        isOpen={showSpec}
        pageName={currentSpec.name}
        structure={currentSpec.structure}
        components={currentSpec.components}
        interaction={currentSpec.interaction}
      />
    </div>
  );
}
