import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { summonPool } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { Shield, Swords, ArrowLeft, Zap, Loader2 } from 'lucide-react';
import { generateCombatAction } from '../services/geminiService';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
}

interface CombatProps {
  onNavigate: (page: PageId) => void;
}

export function Combat({ onNavigate }: CombatProps) {
  const { roster } = useAppContext();
  
  // Pick a random player entity from roster, fallback to first if somehow empty
  const playerEntity = roster.length > 0 ? roster[Math.floor(Math.random() * roster.length)] : summonPool[0];
  // Pick a random enemy from summonPool
  const enemyEntity = summonPool[Math.floor(Math.random() * summonPool.length)];

  const [combatLog, setCombatLog] = useState<{id: number, text: string, type: 'player' | 'enemy' | 'system'}[]>([
    { id: 1, text: `Combat initiated. ${playerEntity.name} vs ${enemyEntity.name}.`, type: 'system' }
  ]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [enemyShake, setEnemyShake] = useState(false);
  const [playerShield, setPlayerShield] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const spawnParticles = (color: string, x: number, y: number) => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 100 + 50,
      color
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  const addLog = (text: string, type: 'player' | 'enemy' | 'system') => {
    setCombatLog(prev => [...prev, { id: Date.now(), text, type }]);
  };

  const handleAction = async (action: string) => {
    if (isAiThinking) return;

    addLog(`Player intervened: Command [${action}] issued.`, 'system');
    
    if (action === 'Retreat') {
      addLog(`${playerEntity.name} initiates tactical retreat.`, 'player');
      setTimeout(() => onNavigate('map'), 1500);
      return;
    }

    if (action === 'Attack') {
      addLog(`${playerEntity.name} executes attack protocol.`, 'player');
      // Trigger enemy hit effect
      setEnemyShake(true);
      spawnParticles('#f000ff', 75, 50); // Approximate center of enemy panel
      setTimeout(() => setEnemyShake(false), 500);
    } else if (action === 'Defend') {
      addLog(`${playerEntity.name} activates defensive matrix.`, 'player');
      setPlayerShield(true);
      spawnParticles('#00f3ff', 25, 50);
      setTimeout(() => setPlayerShield(false), 1000);
    }

    // AI Turn
    setIsAiThinking(true);
    
    try {
      // Pass the current log to the AI
      const currentLogForAi = combatLog.map(l => ({ text: l.text, type: l.type }));
      // Add the player's action to the log we send
      currentLogForAi.push({ text: `Player intervened: Command [${action}] issued.`, type: 'system' });
      if (action === 'Attack') currentLogForAi.push({ text: `${playerEntity.name} executes attack protocol.`, type: 'player' });
      if (action === 'Defend') currentLogForAi.push({ text: `${playerEntity.name} activates defensive matrix.`, type: 'player' });

      const aiResponse = await generateCombatAction(playerEntity, enemyEntity, currentLogForAi);
      
      addLog(aiResponse.narrative, 'enemy');
      
      // Add visual effects based on AI action
      if (aiResponse.action === 'Attack') {
        spawnParticles('#f000ff', 25, 50); // Attack hits player
      } else if (aiResponse.action === 'Defend') {
        spawnParticles('#00f3ff', 75, 50); // Enemy shields
      }
    } catch (error) {
      console.error("Combat AI Error:", error);
      addLog(`${enemyEntity.name} glitches and attacks unpredictably.`, 'enemy');
      spawnParticles('#f000ff', 25, 50);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto h-[calc(100vh-120px)] flex flex-col"
    >
      <header className="flex items-center justify-between mb-6">
        <button 
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Abort Engagement
        </button>
        <div className="px-4 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 font-mono text-xs uppercase animate-pulse">
          Active Combat Zone
        </div>
      </header>

      {/* Combat Arena */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 relative">
        
        {/* Particle Layer */}
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 1, scale: 1 }}
                animate={{ 
                  x: `calc(${p.x}% + ${Math.cos(p.angle) * p.speed}px)`, 
                  y: `calc(${p.y}% + ${Math.sin(p.angle) * p.speed}px)`, 
                  opacity: 0,
                  scale: 0 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Player Entity */}
        <GlassPanel className="flex flex-col items-center justify-center p-6 relative overflow-hidden border-neon-cyan/30">
          <AnimatePresence>
            {playerShield && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="absolute inset-0 border-4 border-neon-cyan/50 rounded-2xl z-20"
                style={{ boxShadow: 'inset 0 0 50px rgba(0,243,255,0.2)' }}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent" />
          <img src={playerEntity.imageUrl} alt={playerEntity.name} className="w-32 h-32 rounded-full border-4 border-neon-cyan object-cover z-10 mb-4 shadow-[0_0_30px_rgba(0,243,255,0.3)]" referrerPolicy="no-referrer" />
          <h2 className="font-display text-2xl font-bold text-white z-10">{playerEntity.name}</h2>
          <div className="font-mono text-xs text-neon-cyan z-10 mb-4">SYNC: {playerEntity.syncRate}%</div>
          
          <div className="w-full space-y-2 z-10">
            <div className="flex justify-between text-xs font-mono text-slate-400"><span>Integrity</span><span>85%</span></div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-neon-emerald w-[85%]" />
            </div>
          </div>
        </GlassPanel>

        {/* VS Animation Area */}
        <div className="flex flex-col items-center justify-center relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 border border-white/5 rounded-full border-dashed"
          />
          <div className="font-display text-6xl font-bold text-white/20 italic">VS</div>
          <Zap className="w-12 h-12 text-yellow-400 absolute animate-pulse" />
        </div>

        {/* Enemy Entity */}
        <motion.div
          animate={enemyShake ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } } : {}}
          className="h-full"
        >
          <GlassPanel className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden border-neon-fuchsia/30">
            <div className="absolute inset-0 bg-gradient-to-t from-neon-fuchsia/10 to-transparent" />
            <img src={enemyEntity.imageUrl} alt={enemyEntity.name} className="w-32 h-32 rounded-full border-4 border-neon-fuchsia object-cover z-10 mb-4 shadow-[0_0_30px_rgba(240,0,255,0.3)]" referrerPolicy="no-referrer" />
            <h2 className="font-display text-2xl font-bold text-white z-10">{enemyEntity.name}</h2>
            <div className="font-mono text-xs text-neon-fuchsia z-10 mb-4">THREAT LEVEL: HIGH</div>
            
            <div className="w-full space-y-2 z-10">
              <div className="flex justify-between text-xs font-mono text-slate-400"><span>Integrity</span><span>100%</span></div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[100%]" />
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </div>

      {/* Action Log & Controls */}
      <GlassPanel className="h-64 flex flex-col md:flex-row overflow-hidden">
        {/* Log */}
        <div className="flex-1 p-4 overflow-y-auto border-b md:border-b-0 md:border-r border-white/10 bg-black/40 space-y-2">
          {combatLog.map(log => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`font-mono text-xs p-2 rounded ${
                log.type === 'system' ? 'text-slate-400' :
                log.type === 'player' ? 'text-neon-cyan bg-neon-cyan/5 border-l-2 border-neon-cyan' :
                'text-neon-fuchsia bg-neon-fuchsia/5 border-l-2 border-neon-fuchsia'
              }`}
            >
              {log.text}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-center gap-4 bg-slate-900/50 relative">
          {isAiThinking && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-neon-fuchsia animate-spin mb-2" />
              <span className="font-mono text-xs text-neon-fuchsia uppercase animate-pulse">Enemy Computing...</span>
            </div>
          )}
          <h3 className="font-mono text-xs text-slate-400 uppercase tracking-widest text-center mb-2">Manual Override</h3>
          <button onClick={() => handleAction('Attack')} disabled={isAiThinking} className="flex items-center justify-center gap-2 w-full py-3 rounded bg-red-500/10 border border-red-500/50 text-red-500 font-mono hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50">
            <Swords className="w-4 h-4" /> Execute Attack
          </button>
          <button onClick={() => handleAction('Defend')} disabled={isAiThinking} className="flex items-center justify-center gap-2 w-full py-3 rounded bg-blue-500/10 border border-blue-500/50 text-blue-500 font-mono hover:bg-blue-500 hover:text-white transition-colors disabled:opacity-50">
            <Shield className="w-4 h-4" /> Defensive Stance
          </button>
          <button onClick={() => handleAction('Retreat')} disabled={isAiThinking} className="flex items-center justify-center gap-2 w-full py-3 rounded bg-slate-700/30 border border-slate-500/50 text-slate-300 font-mono hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50">
            <ArrowLeft className="w-4 h-4" /> Tactical Retreat
          </button>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
