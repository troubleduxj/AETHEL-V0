import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { AIEntity, PageId, EntityMood, NeuralConfig } from '../types';
import { ArrowLeft, Cpu, Zap, Brain, Shield, MessageSquare, Plus, Trash2, Clock, AlertTriangle, Lightbulb, ArrowUpCircle, Save, Database, Loader2, MapPin, Activity, Compass, Target, Heart, Search, Link } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { RadarChart } from '../components/RadarChart';
import { NeuralLinkModal } from '../components/NeuralLinkModal';

const moodConfig: Record<EntityMood, { color: string; label: string; speed: number; amplitude: number; hex: string }> = {
  Stable: { color: 'text-emerald-400', hex: '#34d399', label: 'Stable Pulse', speed: 2, amplitude: 10 },
  Excited: { color: 'text-fuchsia-400', hex: '#e879f9', label: 'High Frequency', speed: 0.5, amplitude: 25 },
  Unstable: { color: 'text-red-500', hex: '#ef4444', label: 'Erratic Signal', speed: 0.2, amplitude: 40 },
  Melancholy: { color: 'text-blue-400', hex: '#60a5fa', label: 'Low Resonance', speed: 4, amplitude: 5 },
  Analytical: { color: 'text-amber-400', hex: '#fbbf24', label: 'Logic Flow', speed: 1.5, amplitude: 15 },
};

const locationNames: Record<string, string> = {
  'city-nexus-prime': 'Nexus Prime',
  'city-neural-archives': 'Origin Lab',
  'city-synth-sea': 'Synth Sea',
  'city-sector-7g': 'Sector 7G',
  'city-void-node': 'Void Node',
};

function MoodWaveform({ mood }: { mood: EntityMood }) {
  const config = moodConfig[mood];
  
  return (
    <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/5 overflow-hidden relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${config.color}`} />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Neural Waveform</span>
        </div>
        <span className={`text-[10px] font-mono ${config.color} uppercase`}>{config.label}</span>
      </div>
      
      <div className="h-12 flex items-center justify-center gap-1">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: mood === 'Unstable' 
                ? [10, 40, 5, 30, 10] 
                : mood === 'Excited'
                ? [15, 35, 15]
                : [10, config.amplitude + Math.random() * 5, 10],
              opacity: mood === 'Unstable' ? [0.4, 1, 0.4] : 0.6
            }}
            transition={{
              duration: mood === 'Unstable' ? 0.2 + Math.random() * 0.3 : config.speed,
              repeat: Infinity,
              delay: i * 0.04,
              ease: mood === 'Unstable' ? "linear" : "easeInOut"
            }}
            className={`w-1 rounded-full ${config.color.replace('text-', 'bg-').replace('500', '500/60').replace('400', '400/60')}`}
          />
        ))}
      </div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '10px 10px' }} 
      />
    </div>
  );
}

function BehaviorTimeline({ status }: { status: string }) {
  const behaviors = [
    { type: 'explore', icon: Compass, color: 'text-blue-400', label: 'Exploring' },
    { type: 'train', icon: Target, color: 'text-emerald-400', label: 'Training' },
    { type: 'rest', icon: Clock, color: 'text-slate-400', label: 'Resting' },
    { type: 'interact', icon: Heart, color: 'text-fuchsia-400', label: 'Interacting' },
  ];

  return (
    <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-slate-400" />
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Behavior Timeline</span>
      </div>
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2" />
        {behaviors.map((b, i) => {
          const isActive = status.toLowerCase().includes(b.type);
          const Icon = b.icon;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${isActive ? `bg-black ${b.color} border-current shadow-[0_0_10px_rgba(255,255,255,0.2)]` : 'bg-slate-900 border-white/10 text-slate-600'}`}>
                <Icon className="w-4 h-4" />
                {isActive && (
                  <motion.div 
                    layoutId="active-behavior"
                    className={`absolute inset-0 rounded-full border-2 ${b.color.replace('text-', 'border-')} animate-ping opacity-20`}
                  />
                )}
              </div>
              <span className={`text-[8px] font-mono uppercase tracking-tighter ${isActive ? b.color : 'text-slate-600'}`}>{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface EntityCoreProps {
  entity: AIEntity;
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function EntityCore({ entity, onNavigate }: EntityCoreProps) {
  const { updateEntity, dataFragments, spendDataFragments } = useAppContext();
  const [personality, setPersonality] = useState(entity.personality);
  const [skills, setSkills] = useState(entity.skills);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Sync state if entity changes externally
  useEffect(() => {
    setPersonality(entity.personality);
    setSkills(entity.skills);
    setHasUnsavedChanges(false);
  }, [entity]);

  const handleEnhanceStat = (statName: keyof AIEntity['stats']) => {
    const cost = 20;
    if (dataFragments < cost) return;
    
    spendDataFragments(cost);
    updateEntity({
      ...entity,
      stats: {
        ...entity.stats,
        [statName]: Math.min(100, entity.stats[statName] + 5)
      }
    });
  };

  const statConfig = [
    { key: 'processing', label: 'Processing', value: entity.stats.processing, icon: Cpu, color: 'bg-blue-400' },
    { key: 'adaptability', label: 'Adaptability', value: entity.stats.adaptability, icon: Zap, color: 'bg-neon-cyan' },
    { key: 'creativity', label: 'Creativity', value: entity.stats.creativity, icon: Brain, color: 'bg-neon-fuchsia' },
    { key: 'stability', label: 'Stability', value: entity.stats.stability, icon: Shield, color: 'bg-neon-emerald' },
  ];

  const handleSliderChange = (trait: keyof typeof personality, value: number) => {
    setPersonality(prev => ({ ...prev, [trait]: value }));
    setHasUnsavedChanges(true);
  };

  const removeSkill = (id: string) => {
    const newSkills = skills.filter(s => s.id !== id);
    setSkills(newSkills);
    updateEntity({ ...entity, skills: newSkills });
  };

  const handleSavePersonality = () => {
    updateEntity({ ...entity, personality });
    setHasUnsavedChanges(false);
  };

  const levelUpCost = entity.level * 50;
  const canLevelUp = dataFragments >= levelUpCost;

  const handleLevelUp = async () => {
    if (!canLevelUp || isUpgrading) return;
    
    setIsUpgrading(true);
    spendDataFragments(levelUpCost);
    
    // Simulate upgrade time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newStats = {
      processing: Math.min(100, entity.stats.processing + Math.floor(Math.random() * 5) + 2),
      adaptability: Math.min(100, entity.stats.adaptability + Math.floor(Math.random() * 5) + 2),
      creativity: Math.min(100, entity.stats.creativity + Math.floor(Math.random() * 5) + 2),
      stability: Math.min(100, entity.stats.stability + Math.floor(Math.random() * 5) + 2),
    };

    updateEntity({
      ...entity,
      level: entity.level + 1,
      stats: newStats
    });
    
    setIsUpgrading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`max-w-7xl mx-auto ${entity.syncRate < 50 ? 'glitch-active' : ''}`}
    >
      <button 
        onClick={() => onNavigate('roster')}
        className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Roster
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Visual & Basic Info */}
        <div className="lg:col-span-4 space-y-6">
          <GlassPanel className="overflow-hidden relative aspect-[3/4] flex flex-col justify-end p-6">
            <img 
              src={entity.imageUrl} 
              alt={entity.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <div className="font-mono text-neon-cyan text-sm">{entity.designation}</div>
                {entity.location && (
                  <button 
                    onClick={() => onNavigate(entity.location as PageId)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-mono text-slate-300 transition-colors"
                  >
                    <MapPin className="w-3 h-3 text-neon-cyan" />
                    {locationNames[entity.location] || 'Unknown'}
                  </button>
                )}
              </div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">{entity.name}</h1>
              <div className="flex gap-2 mb-6">
                <span className="px-2 py-1 text-[10px] font-mono uppercase border border-white/20 rounded-full bg-black/50 backdrop-blur-md text-slate-300">
                  Class: {entity.class}
                </span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase border border-white/20 rounded-full bg-black/50 backdrop-blur-md text-slate-300">
                  Lvl {entity.level}
                </span>
                <button 
                  onClick={() => setShowLinkModal(true)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase border rounded-full backdrop-blur-md flex items-center gap-1 transition-all ${entity.neuralConfig?.isConnected ? 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.2)]' : 'border-white/10 bg-black/50 text-slate-500 hover:text-white hover:border-white/30'}`}
                >
                  <Cpu className="w-3 h-3" />
                  {entity.neuralConfig?.isConnected ? 'Neural Linked' : 'Link Neural Core'}
                </button>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  {entity.description}
                </p>
              </div>

              {entity.radarStats && (
                <div className="flex justify-center py-4 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                  <RadarChart 
                    stats={entity.radarStats} 
                    color={moodConfig[entity.mood || 'Stable'].hex} 
                    size={160}
                  />
                </div>
              )}
            </div>
          </GlassPanel>

          {entity.mood && <MoodWaveform mood={entity.mood} />}
          <BehaviorTimeline status={entity.status} />

          <button 
            onClick={() => onNavigate('synapse', entity.id)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-mono hover:bg-neon-cyan hover:text-slate-950 transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)]"
          >
            <MessageSquare className="w-5 h-5" />
            INITIATE SYNAPSE LINK
          </button>

          <button 
            onClick={handleLevelUp}
            disabled={!canLevelUp || isUpgrading}
            className="w-full flex flex-col items-center justify-center gap-1 py-3 rounded-xl bg-neon-fuchsia/10 border border-neon-fuchsia/50 text-neon-fuchsia font-mono transition-all hover:bg-neon-fuchsia/20 disabled:opacity-50 disabled:hover:bg-neon-fuchsia/10"
          >
            <div className="flex items-center gap-2">
              {isUpgrading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUpCircle className="w-5 h-5" />}
              {isUpgrading ? 'UPGRADING...' : 'LEVEL UP ENTITY'}
            </div>
            {!isUpgrading && (
              <div className="text-xs flex items-center gap-1 text-neon-fuchsia/70">
                Cost: <Database className="w-3 h-3" /> {levelUpCost} DF
              </div>
            )}
          </button>
        </div>

        {/* Right Column: Stats & Data */}
        <div className="lg:col-span-8 space-y-6">
          <GlassPanel className="p-8">
            <h3 className="font-mono text-sm text-slate-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Core Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {statConfig.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                        <Icon className="w-4 h-4 opacity-70" />
                        {stat.label}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-white">{stat.value}</span>
                        <button 
                          onClick={() => handleEnhanceStat(stat.key as keyof AIEntity['stats'])}
                          disabled={dataFragments < 20 || stat.value >= 100}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 rounded flex items-center gap-1 disabled:opacity-50 disabled:hover:bg-white/5"
                          title="Enhance (+5) Cost: 20 DF"
                        >
                          <Plus className="w-3 h-3" /> 20 DF
                        </button>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full ${stat.color}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Personality Sliders */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h3 className="font-mono text-sm text-slate-400 uppercase tracking-widest">Personality Matrix</h3>
              {hasUnsavedChanges && (
                <button 
                  onClick={handleSavePersonality}
                  className="text-neon-emerald hover:text-white flex items-center gap-1 text-xs font-mono transition-colors bg-neon-emerald/10 px-2 py-1 rounded"
                >
                  <Save className="w-3 h-3" /> Save Changes
                </button>
              )}
            </div>
            <div className="space-y-6 mb-8">
              {[
                { key: 'aggression', left: 'Defensive', right: 'Aggressive', color: 'accent-neon-fuchsia' },
                { key: 'logic', left: 'Emotional', right: 'Logical', color: 'accent-blue-400' },
                { key: 'curiosity', left: 'Cautious', right: 'Curious', color: 'accent-neon-emerald' }
              ].map((trait) => (
                <div key={trait.key}>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>{trait.left}</span>
                    <span className="text-white">{personality[trait.key as keyof typeof personality]}%</span>
                    <span>{trait.right}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={personality[trait.key as keyof typeof personality]}
                    onChange={(e) => handleSliderChange(trait.key as keyof typeof personality, parseInt(e.target.value))}
                    className={`w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer ${trait.color}`}
                  />
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h3 className="font-mono text-sm text-slate-400 uppercase tracking-widest">Active Skills</h3>
              <button className="text-neon-cyan hover:text-white flex items-center gap-1 text-xs font-mono transition-colors">
                <Plus className="w-3 h-3" /> Install Skill
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map(skill => (
                <div key={skill.id} className="bg-black/40 border border-white/5 rounded-lg p-4 group relative">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{skill.type}</span>
                  </div>
                  <p className="text-xs text-slate-400">{skill.description}</p>
                  <button 
                    onClick={() => removeSkill(skill.id)}
                    className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Memory Timeline */}
          <GlassPanel className="p-8">
            <h3 className="font-mono text-sm text-slate-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Memory Timeline</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {entity.memories.map((memory, idx) => {
                const isLeft = idx % 2 === 0;
                const Icon = memory.type === 'warning' ? AlertTriangle : memory.type === 'insight' ? Lightbulb : Clock;
                const iconColor = memory.type === 'warning' ? 'text-neon-fuchsia' : memory.type === 'insight' ? 'text-neon-emerald' : 'text-neon-cyan';
                const borderColor = memory.type === 'warning' ? 'border-neon-fuchsia/30' : memory.type === 'insight' ? 'border-neon-emerald/30' : 'border-neon-cyan/30';

                return (
                  <motion.div 
                    key={memory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                  >
                    {/* Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#050505] bg-slate-900 text-slate-500 group-hover:${iconColor} transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {/* Card */}
                    <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:${borderColor} transition-colors`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-mono text-xs ${iconColor}`}>{memory.time}</span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{memory.type}</span>
                      </div>
                      <p className="text-sm text-slate-300">{memory.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassPanel>
        </div>
      </div>

      {showLinkModal && (
        <NeuralLinkModal 
          entity={entity}
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          onSave={(config) => {
            updateEntity({ ...entity, neuralConfig: config });
          }}
        />
      )}
    </motion.div>
  );
}

