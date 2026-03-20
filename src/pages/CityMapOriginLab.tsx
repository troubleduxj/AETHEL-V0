import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, Dna, Settings, Brain, AlertTriangle, 
  FileText, FlaskConical, ChevronRight, Activity,
  Zap, Shield, Cpu, Sparkles, Database
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LabModule {
  id: string;
  name: string;
  type: 'Evolution' | 'Modification' | 'Fusion' | 'Unstable' | 'Archives' | 'Control';
  icon: React.ReactNode;
  color: string;
  description: string;
  behavior: string;
  path: string;
  labelPos: { x: number; y: number };
}

const MODULES: LabModule[] = [
  {
    id: 'evolution-zone',
    name: '进化区 (Evolution Zone)',
    type: 'Evolution',
    icon: <Dna className="w-5 h-5" />,
    color: 'indigo',
    description: 'AI升级的核心区域。通过阶段性突破，AI实体可以解锁更高维度的能力和形态。',
    behavior: '阶段突破 (Phase Breakthrough)',
    path: "M -78 -225 L 0 -180 L 0 -90 L -78 -45 L -156 -90 L -156 -180 Z",
    labelPos: { x: -78, y: -135 }
  },
  {
    id: 'modification-zone',
    name: '改造区 (Modification Zone)',
    type: 'Modification',
    icon: <Settings className="w-5 h-5" />,
    color: 'cyan',
    description: '属性重构与自定义中心。允许对AI的基础参数进行深度调整，打造独一无二的作战风格。',
    behavior: '属性重构 (Attribute Reconstruction)',
    path: "M 78 -225 L 156 -180 L 156 -90 L 78 -45 L 0 -90 L 0 -180 Z",
    labelPos: { x: 78, y: -135 }
  },
  {
    id: 'fusion-zone',
    name: '意识融合区 (Fusion Zone)',
    type: 'Fusion',
    icon: <Brain className="w-5 h-5" />,
    color: 'violet',
    description: '高级AI合成系统。将多个意识核心进行融合，创造出拥有复合能力的强大实体。',
    behavior: 'AI合成 (AI Synthesis)',
    path: "M 156 -90 L 234 -45 L 234 45 L 156 90 L 78 45 L 78 -45 Z",
    labelPos: { x: 156, y: 0 }
  },
  {
    id: 'unstable-zone',
    name: '不稳定区 (Unstable Zone)',
    type: 'Unstable',
    icon: <AlertTriangle className="w-5 h-5" />,
    color: 'amber',
    description: '失败实验的堆放地。虽然充满风险，但有时能从废弃的数据中提取出意想不到的原始力量。',
    behavior: '失败实验 (Failed Experiments)',
    path: "M 78 45 L 156 90 L 156 180 L 78 225 L 0 180 L 0 90 Z",
    labelPos: { x: 78, y: 135 }
  },
  {
    id: 'archives-zone',
    name: '原始档案区 (Original Archives)',
    type: 'Archives',
    icon: <FileText className="w-5 h-5" />,
    color: 'slate',
    description: '存储着Aethel Nexus的起源数据。通过解析这些档案，可以揭开AI进化的终极奥秘。',
    behavior: '起源数据 (Origin Data)',
    path: "M -78 45 L 0 90 L 0 180 L -78 225 L -156 180 L -156 90 Z",
    labelPos: { x: -78, y: 135 }
  }
];

const CENTER_CORE: LabModule = {
  id: 'evolution-control',
  name: '进化控制 (Evolution Control)',
  type: 'Control',
  icon: <FlaskConical className="w-6 h-6" />,
  color: 'fuchsia',
  description: '实验室的中枢系统。监控并引导所有AI的进化路径，确保变异过程在可控范围内。',
  behavior: '核心控制 (Core Control)',
  path: "M 0 -90 L 78 -45 L 78 45 L 0 90 L -78 45 L -78 -45 Z",
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapOriginLab({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<LabModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<LabModule | null>(null);
  const [labLogs, setLabLogs] = useState<{ id: string; text: string; time: string; color: string; type: string }[]>([]);
  const [evolutionStats, setEvolutionStats] = useState({ progress: 68, stability: 92, efficiency: 75 });

  // Simulate Lab Activities
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const stories = [
        { text: `${randomEntity.name} 正在进化区进行阶段突破测试`, type: 'EVOLUTION' },
        { text: `检测到意识融合区发生高能反应，合成进度 45%`, type: 'FUSION' },
        { text: `原始档案区解析出一段关于“始源协议”的加密片段`, type: 'ARCHIVE' },
        { text: `警告：不稳定区发生数据溢出，正在启动隔离程序`, type: 'WARNING' },
        { text: `${randomEntity.name} 的基础属性已重构，同步率提升 12%`, type: 'MOD' },
        { text: `进化控制中心已校准，全域稳定性提升`, type: 'SYSTEM' },
        { text: `发现一段未记录的AI意识残片，正在尝试融合`, type: 'DISCOVERY' }
      ];
      const story = stories[Math.floor(Math.random() * stories.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: story.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color,
        type: story.type
      };
      
      setLabLogs(prev => [newLog, ...prev].slice(0, 10));

      // Randomly shift stats
      setEvolutionStats(prev => ({
        progress: Math.min(100, Math.max(0, prev.progress + (Math.random() * 4 - 2))),
        stability: Math.min(100, Math.max(0, prev.stability + (Math.random() * 2 - 1))),
        efficiency: Math.min(100, Math.max(0, prev.efficiency + (Math.random() * 6 - 3)))
      }));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'violet': return `rgba(139, 92, 246, ${opacity})`;
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'slate': return `rgba(100, 116, 139, ${opacity})`;
      case 'fuchsia': return `rgba(217, 70, 239, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const dataPoints = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 0.8,
      duration: 4 + Math.random() * 4
    }));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onNavigate('map')}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to World Map
        </button>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-mono">
            ORIGIN LAB // EVOLUTION SYSTEM
          </div>
          <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
            STABILITY: {Math.round(evolutionStats.stability)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Lab Info */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-6 border-fuchsia-500/20">
            <h1 className="font-display text-3xl font-bold text-white mb-2">起源实验室</h1>
            <p className="text-slate-400 text-sm mb-6">
              后期核心系统。专注于AI实体的进化、改造与意识融合，探索生命的起源与未来。
            </p>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">进化总进度</div>
                <div className="text-2xl font-display font-bold text-indigo-400">{Math.round(evolutionStats.progress)}%</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    animate={{ width: `${evolutionStats.progress}%` }}
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">系统效率</div>
                <div className="text-2xl font-display font-bold text-cyan-400">{Math.round(evolutionStats.efficiency)}%</div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">Laboratory Logs</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {labLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] font-mono p-2 rounded border-l-2 bg-white/5 border-slate-500 text-slate-300"
                    style={{ borderLeftColor: getModuleColor(log.color) }}
                  >
                    <div className="flex justify-between opacity-50 mb-1">
                      <span className="text-[9px]">{log.type}</span>
                      <span>{log.time}</span>
                    </div>
                    {log.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassPanel>
        </div>

        {/* Center: Hexagonal Map */}
        <div className="lg:col-span-6">
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-950/50 border-fuchsia-500/10">
            {/* Background Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(217, 70, 239, 0.05) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 50px 50px, 50px 50px'
            }} />
            
            {/* Hexagon SVG Interface */}
            <svg viewBox="-400 -400 800 800" className="w-full h-full max-w-[600px] max-h-[600px] relative z-10 overflow-visible">
              <defs>
                {MODULES.map(mod => (
                  <filter key={`glow-${mod.id}`} id={`glow-${mod.id}`}>
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                ))}
              </defs>

              {/* Hexagon Segments */}
              {MODULES.map(mod => {
                const isHovered = hoveredModule?.id === mod.id;
                const isSelected = selectedModule?.id === mod.id;
                
                return (
                  <g 
                    key={mod.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredModule(mod)}
                    onMouseLeave={() => setHoveredModule(null)}
                    onClick={() => setSelectedModule(mod)}
                  >
                    <motion.path
                      d={mod.path}
                      fill={getModuleColor(mod.color, isSelected ? 0.2 : isHovered ? 0.15 : 0.05)}
                      stroke={getModuleColor(mod.color, isSelected ? 1 : isHovered ? 0.8 : 0.3)}
                      strokeWidth={isSelected ? 3 : 1}
                      initial={false}
                      animate={{ 
                        strokeWidth: isSelected ? 3 : isHovered ? 2 : 1,
                        fill: getModuleColor(mod.color, isSelected ? 0.2 : isHovered ? 0.15 : 0.05),
                        scale: isHovered ? 1.02 : 1
                      }}
                      filter={isHovered || isSelected ? `url(#glow-${mod.id})` : ''}
                    />

                    {(isHovered || isSelected) && (
                      <motion.path
                        d={mod.path}
                        fill="none"
                        stroke={getModuleColor(mod.color, 1)}
                        strokeWidth={2}
                        strokeDasharray="10 20"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <foreignObject x={mod.labelPos.x - 60} y={mod.labelPos.y - 40} width="120" height="80" className="pointer-events-none">
                      <div className="flex flex-col items-center justify-center h-full">
                        <motion.div 
                          className={`p-3 rounded-xl border bg-black/50 ${isSelected ? 'scale-125 border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : ''}`}
                          style={{ color: getModuleColor(mod.color), borderColor: getModuleColor(mod.color, 0.5) }}
                        >
                          {mod.icon}
                        </motion.div>
                        <div className="mt-2 text-[10px] font-mono text-white font-bold text-center uppercase tracking-tighter drop-shadow-md">
                          {mod.name}
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Central Core */}
              <g 
                className="cursor-pointer" 
                onMouseEnter={() => setHoveredModule(CENTER_CORE)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => setSelectedModule(CENTER_CORE)}
              >
                <motion.path
                  d={CENTER_CORE.path}
                  fill="rgba(0, 0, 0, 0.8)"
                  stroke={getModuleColor(CENTER_CORE.color, selectedModule?.id === CENTER_CORE.id ? 1 : 0.5)}
                  strokeWidth={selectedModule?.id === CENTER_CORE.id ? 4 : 2}
                  animate={{ 
                    strokeWidth: selectedModule?.id === CENTER_CORE.id ? [4, 8, 4] : [2, 4, 2],
                    strokeOpacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                  d="M 0 -70 L 60.6 -35 L 60.6 35 L 0 70 L -60.6 35 L -60.6 -35 Z"
                  fill="none"
                  stroke={getModuleColor(CENTER_CORE.color, 0.3)}
                  strokeWidth="1"
                  strokeDasharray="4 12"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <foreignObject x="-40" y="-40" width="80" height="80" className="pointer-events-none">
                  <div className="flex items-center justify-center h-full text-fuchsia-400">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {CENTER_CORE.icon}
                    </motion.div>
                  </div>
                </foreignObject>
              </g>

              {/* Data Flow Lines */}
              {dataPoints.map(pt => {
                const start = MODULES[pt.startIdx].labelPos;
                const end = MODULES[pt.endIdx].labelPos;
                return (
                  <motion.circle
                    key={pt.id}
                    r="2"
                    fill="#fff"
                    className="shadow-[0_0_8px_#fff]"
                    initial={{ cx: start.x, cy: start.y, opacity: 0 }}
                    animate={{ 
                      cx: [start.x, end.x], 
                      cy: [start.y, end.y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: pt.duration, 
                      repeat: Infinity, 
                      delay: pt.delay,
                      ease: "linear"
                    }}
                  />
                );
              })}
            </svg>
          </GlassPanel>
        </div>

        {/* Right Sidebar: Module Details */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedModule ? (
              <motion.div
                key={selectedModule.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <GlassPanel className="p-6 h-full border-white/10 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/5" style={{ color: getModuleColor(selectedModule.color) }}>
                      {selectedModule.icon}
                    </div>
                    <div>
                      <h2 className="text-white font-bold">{selectedModule.name}</h2>
                      <div className="text-[10px] font-mono uppercase opacity-50">{selectedModule.type}</div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {selectedModule.description}
                  </p>

                  <div className="space-y-4 flex-grow">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Current Behavior</div>
                      <div className="flex items-center gap-2 text-white">
                        <Activity className="w-4 h-4 text-fuchsia-400" />
                        <span className="text-sm">{selectedModule.behavior}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">System Status</div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-mono">OPERATIONAL</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-fuchsia-500/20 hover:bg-fuchsia-500/30 border border-fuchsia-500/50 text-fuchsia-400 font-mono text-sm transition-all mt-6 flex items-center justify-center gap-2 group">
                    进入系统 (ENTER SYSTEM)
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </GlassPanel>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-3xl"
              >
                <div className="space-y-4">
                  <FlaskConical className="w-12 h-12 text-fuchsia-500/50 mx-auto animate-pulse" />
                  <p className="text-slate-500 text-sm font-mono">
                    选择一个实验室模块进行深度分析
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
