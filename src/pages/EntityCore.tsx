import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { AIEntity, PageId } from '../types';
import { ArrowLeft, Cpu, Zap, Brain, Shield, MessageSquare, Plus, Trash2, Clock, AlertTriangle, Lightbulb } from 'lucide-react';

interface EntityCoreProps {
  entity: AIEntity;
  onNavigate: (page: PageId, entityId?: string) => void;
}

export function EntityCore({ entity, onNavigate }: EntityCoreProps) {
  const [personality, setPersonality] = useState(entity.personality);
  const [skills, setSkills] = useState(entity.skills);

  const statConfig = [
    { label: 'Processing', value: entity.stats.processing, icon: Cpu, color: 'bg-blue-400' },
    { label: 'Adaptability', value: entity.stats.adaptability, icon: Zap, color: 'bg-neon-cyan' },
    { label: 'Creativity', value: entity.stats.creativity, icon: Brain, color: 'bg-neon-fuchsia' },
    { label: 'Stability', value: entity.stats.stability, icon: Shield, color: 'bg-neon-emerald' },
  ];

  const handleSliderChange = (trait: keyof typeof personality, value: number) => {
    setPersonality(prev => ({ ...prev, [trait]: value }));
  };

  const removeSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto"
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
              <div className="font-mono text-neon-cyan text-sm mb-1">{entity.designation}</div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">{entity.name}</h1>
              <div className="flex gap-2">
                <span className="px-2 py-1 text-[10px] font-mono uppercase border border-white/20 rounded-full bg-black/50 backdrop-blur-md text-slate-300">
                  Class: {entity.class}
                </span>
                <span className="px-2 py-1 text-[10px] font-mono uppercase border border-white/20 rounded-full bg-black/50 backdrop-blur-md text-slate-300">
                  Lvl {entity.level}
                </span>
              </div>
            </div>
          </GlassPanel>

          <button 
            onClick={() => onNavigate('synapse', entity.id)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-mono hover:bg-neon-cyan hover:text-slate-950 transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)]"
          >
            <MessageSquare className="w-5 h-5" />
            INITIATE SYNAPSE LINK
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
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2 text-slate-300 font-mono text-sm">
                        <Icon className="w-4 h-4 opacity-70" />
                        {stat.label}
                      </div>
                      <span className="font-mono text-white">{stat.value}</span>
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
            <h3 className="font-mono text-sm text-slate-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Personality Matrix</h3>
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
    </motion.div>
  );
}

