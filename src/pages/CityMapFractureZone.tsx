import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { 
  ArrowLeft, AlertTriangle, Puzzle, Eye, Zap, 
  Dna, Skull, HelpCircle, ChevronRight, Sparkles,
  Search, Activity, Network, Target, Flame
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface FractureModule {
  id: string;
  name: string;
  type: 'Event' | 'Observation' | 'Storm' | 'Rift' | 'Collapse' | 'Control';
  icon: React.ReactNode;
  color: string;
  description: string;
  behavior: string;
  path: string;
  labelPos: { x: number; y: number };
}

const MODULES: FractureModule[] = [
  {
    id: 'fractured-zone',
    name: '破碎区 (Fractured Zone)',
    type: 'Event',
    icon: <Puzzle className="w-5 h-5" />,
    color: 'amber',
    description: '破碎区充满了不可预测的随机事件。这里的逻辑结构已经崩塌，每一次数据脉冲都可能引发全新的网络现象。',
    behavior: '随机事件 (Random Events)',
    path: "M 30 -30 L 200 -90 L 40 -220 Z", // Exploded path
    labelPos: { x: 110, y: -130 }
  },
  {
    id: 'anomaly-obs',
    name: '异常观察区 (Anomaly Observation)',
    type: 'Observation',
    icon: <Eye className="w-5 h-5" />,
    color: 'cyan',
    description: '专门用于监测和捕获高价值的异常AI实体。这些实体携带稀有的数据片段，是探索者的首要目标。',
    behavior: '发现异常AI (Discover Anomaly AI)',
    path: "M 40 40 L 160 180 L 210 -20 Z",
    labelPos: { x: 150, y: 70 }
  },
  {
    id: 'energy-storm',
    name: '能量风暴区 (Energy Storm)',
    type: 'Storm',
    icon: <Zap className="w-5 h-5" />,
    color: 'yellow',
    description: '高强度的能量风暴席卷此地。虽然环境极其危险，但风暴中心蕴含着极高的能量收益。',
    behavior: '危险区域 (Dangerous) - 高收益',
    path: "M 0 50 L -130 180 L 130 180 Z",
    labelPos: { x: 0, y: 170 }
  },
  {
    id: 'data-rift',
    name: '数据裂缝 (Data Rift)',
    type: 'Rift',
    icon: <Search className="w-5 h-5" />,
    color: 'indigo',
    description: '隐藏在网络深处的裂缝，通往未知的隐藏入口。只有最敏锐的探索者才能发现这些通往深层的路径。',
    behavior: '隐藏入口 (Hidden Entrance)',
    path: "M -40 40 L -210 -20 L -160 180 Z",
    labelPos: { x: -150, y: 70 }
  },
  {
    id: 'collapse-zone',
    name: '崩坏区 (Collapse Zone)',
    type: 'Collapse',
    icon: <Skull className="w-5 h-5" />,
    color: 'rose',
    description: '网络逻辑的终点。在这里，AI实体面临极高的失控风险，任何错误的操作都可能导致永久性的数据损坏。',
    behavior: 'AI失控 (AI Loss of Control)',
    path: "M -30 -30 L -40 -220 L -200 -90 Z",
    labelPos: { x: -110, y: -130 }
  }
];

const CENTER_CORE: FractureModule = {
  id: 'fracture-sync',
  name: '不稳定核心 (Unstable Core)',
  type: 'Control',
  icon: <AlertTriangle className="w-6 h-6" />,
  color: 'orange',
  description: '异常区域的能量源头。核心状态处于完全随机的波动中，主导着整个区域的现实稳定性。',
  behavior: '随机 (Random)',
  path: "",
  labelPos: { x: 0, y: 0 }
};

interface CityMapProps {
  onNavigate: (page: PageId) => void;
}

export default function CityMapFractureZone({ onNavigate }: CityMapProps) {
  const { roster } = useAppContext();
  const [selectedModule, setSelectedModule] = useState<FractureModule | null>(null);
  const [hoveredModule, setHoveredModule] = useState<FractureModule | null>(null);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string; color: string; alert?: boolean }[]>([]);
  const [anomalyMetrics, setAnomalyMetrics] = useState({ stability: 32, flux: 88, discoveryRate: 15 });

  // Simulate Anomaly Activities
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntity = roster[Math.floor(Math.random() * roster.length)];
      const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
      
      const stories = [
        { text: `[探测] ${randomEntity.name} 在数据裂缝中发现了隐藏入口`, alert: true },
        { text: `[警告] 能量风暴强度激增，建议立即撤离`, alert: true },
        { text: `[发现] 追踪到异常AI信号，价值评估：极高`, alert: true },
        { text: `[危险] ${randomEntity.name} 在崩坏区失去控制，正在尝试重连`, alert: true },
        { text: `[事件] 破碎区发生逻辑坍塌，产生随机数据碎片`, alert: false },
        { text: `[核心] 不稳定核心进入“虚空”状态，全域数据波动`, alert: true },
        { text: `[收益] 成功从风暴中心提取高纯度能量`, alert: false },
        { text: `[探索] 发现未标记的数据节点，正在解析...`, alert: false }
      ];
      const story = stories[Math.floor(Math.random() * stories.length)];
      
      const newLog = {
        id: Math.random().toString(36).substr(2, 9),
        text: story.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        color: randomModule.color,
        alert: story.alert
      };
      
      setActiveLogs(prev => [newLog, ...prev].slice(0, 10));

      // Randomly shift metrics (high volatility)
      setAnomalyMetrics(prev => ({
        stability: Math.min(100, Math.max(0, prev.stability + (Math.random() * 20 - 10))),
        flux: Math.min(100, Math.max(0, prev.flux + (Math.random() * 20 - 10))),
        discoveryRate: Math.min(100, Math.max(0, prev.discoveryRate + (Math.random() * 10 - 5)))
      }));
    }, 3500);
    
    return () => clearInterval(interval);
  }, [roster]);

  const getModuleColor = (color: string, opacity: number = 1) => {
    switch(color) {
      case 'amber': return `rgba(245, 158, 11, ${opacity})`;
      case 'cyan': return `rgba(34, 211, 238, ${opacity})`;
      case 'yellow': return `rgba(250, 204, 21, ${opacity})`;
      case 'indigo': return `rgba(99, 102, 241, ${opacity})`;
      case 'rose': return `rgba(244, 63, 94, ${opacity})`;
      case 'orange': return `rgba(249, 115, 22, ${opacity})`;
      default: return `rgba(148, 163, 184, ${opacity})`;
    }
  };

  const aiPoints = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      startIdx: Math.floor(Math.random() * MODULES.length),
      endIdx: Math.floor(Math.random() * MODULES.length),
      delay: i * 0.5,
      duration: 3 + Math.random() * 6
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
          <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono">
            ANOMALY ZONE // FRACTURE
          </div>
          <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono animate-pulse">
            INSTABILITY: {Math.round(anomalyMetrics.flux)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Info & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <GlassPanel className="p-6 border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Sparkles className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">异常区域</h1>
            <p className="text-slate-400 text-sm mb-6">
              最有探索感的地图。逻辑结构已破碎，高收益与极高风险并存。
            </p>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">不稳定核心状态</div>
                <div className="text-2xl font-display font-bold text-orange-400">随机波动 (RANDOM)</div>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-orange-500"
                    animate={{ 
                      width: ["20%", "80%", "40%", "90%", "30%"],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">高价值发现概率</div>
                <div className="text-2xl font-display font-bold text-cyan-400">{Math.round(anomalyMetrics.discoveryRate)}%</div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-4 border-white/5">
            <h3 className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-4">Anomaly Stream</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {activeLogs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-[11px] font-mono p-2 rounded border-l-2 bg-white/5 ${log.alert ? 'border-orange-500 text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'border-slate-500 text-slate-300'}`}
                    style={{ borderLeftColor: getModuleColor(log.color) }}
                  >
                    <div className="flex justify-between opacity-50 mb-1">
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
          <GlassPanel className="h-[600px] relative overflow-hidden flex items-center justify-center bg-slate-950/50 border-orange-500/10">
            {/* Background Grid with Distortion Effect */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(249, 115, 22, 0.1) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 40px 40px, 40px 40px'
            }} />
            
            {/* Glitch Overlay */}
            <motion.div 
              className="absolute inset-0 bg-orange-500/5 pointer-events-none"
              animate={{ 
                opacity: [0, 0.1, 0, 0.05, 0],
                x: [0, 2, -2, 0],
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
            />

            <motion.div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 70%, rgba(244, 63, 94, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Scanning Line */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-20 pointer-events-none"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Hexagon SVG Interface */}
            <svg viewBox="-250 -250 500 500" className="w-full h-full max-w-[500px] max-h-[500px] relative z-10 overflow-visible">
              <defs>
                {MODULES.map(mod => (
                  <filter key={`glow-${mod.id}`} id={`glow-${mod.id}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
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
                      fill={getModuleColor(mod.color, isSelected ? 0.3 : isHovered ? 0.2 : 0.05)}
                      stroke={getModuleColor(mod.color, isSelected ? 1 : isHovered ? 0.8 : 0.3)}
                      strokeWidth={isSelected ? 3 : 1}
                      initial={false}
                      animate={{ 
                        strokeWidth: isSelected ? 3 : isHovered ? 2 : 1,
                        fill: getModuleColor(mod.color, isSelected ? 0.3 : isHovered ? 0.2 : 0.05),
                        // Drifting effect for Fractured feel
                        x: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
                        y: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
                        rotate: isHovered ? [0, 2, -2, 0] : [0, 0.5, -0.5, 0]
                      }}
                      transition={{ 
                        x: { repeat: Infinity, duration: 3 + Math.random() * 3 }, 
                        y: { repeat: Infinity, duration: 3 + Math.random() * 3 },
                        rotate: { repeat: Infinity, duration: 4 + Math.random() * 2 }
                      }}
                      filter={isHovered || isSelected ? `url(#glow-${mod.id})` : ''}
                    />

                    {(isHovered || isSelected) && (
                      <motion.path
                        d={mod.path}
                        fill="none"
                        stroke={getModuleColor(mod.color, 1)}
                        strokeWidth={2}
                        strokeDasharray="10 30"
                        animate={{ strokeDashoffset: [0, -100] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}

                    <foreignObject x={mod.labelPos.x - 40} y={mod.labelPos.y - 40} width="80" height="80" className="pointer-events-none">
                      <div className="flex flex-col items-center justify-center h-full">
                        <motion.div 
                          className={`p-2 rounded-full border bg-black/50 ${isSelected ? 'scale-125 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`}
                          style={{ color: getModuleColor(mod.color), borderColor: getModuleColor(mod.color, 0.5) }}
                        >
                          {mod.icon}
                        </motion.div>
                        <div className="mt-1 text-[8px] font-mono text-white font-bold text-center uppercase tracking-tighter drop-shadow-md">
                          {mod.name}
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {/* Central Unstable Core */}
              <g 
                className="cursor-pointer" 
                onMouseEnter={() => setHoveredModule(CENTER_CORE)}
                onMouseLeave={() => setHoveredModule(null)}
                onClick={() => setSelectedModule(CENTER_CORE)}
              >
                <motion.circle
                  r="55"
                  fill="rgba(0, 0, 0, 0.9)"
                  stroke={getModuleColor(CENTER_CORE.color, selectedModule?.id === CENTER_CORE.id ? 1 : 0.5)}
                  strokeWidth={selectedModule?.id === CENTER_CORE.id ? 4 : 2}
                  animate={{ 
                    strokeWidth: selectedModule?.id === CENTER_CORE.id ? [4, 12, 4] : [2, 6, 2],
                    strokeOpacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 0.9, 1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  r="45"
                  fill={getModuleColor(CENTER_CORE.color, 0.2)}
                  stroke={getModuleColor(CENTER_CORE.color, 0.8)}
                  strokeWidth="2"
                  strokeDasharray="2 8"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  r="35"
                  fill="none"
                  stroke={getModuleColor(CENTER_CORE.color, 0.4)}
                  strokeWidth="1"
                  animate={{ scale: [1, 2], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <foreignObject x="-30" y="-30" width="60" height="60" className="pointer-events-none">
                  <div className="flex items-center justify-center h-full text-orange-400">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {CENTER_CORE.icon}
                    </motion.div>
                  </div>
                </foreignObject>
              </g>

              {/* Erratic Data Flow Points */}
              {aiPoints.map(pt => {
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
                      cx: [start.x, end.x + (Math.random() * 20 - 10), end.x],
                      cy: [start.y, end.y + (Math.random() * 20 - 10), end.y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ 
                      duration: pt.duration, 
                      repeat: Infinity, 
                      delay: pt.delay,
                      ease: "easeInOut"
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
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Anomaly Behavior</div>
                      <div className="flex items-center gap-2 text-white">
                        <Activity className="w-4 h-4 text-orange-400" />
                        <span className="text-sm">{selectedModule.behavior}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Risk Level</div>
                      <div className="flex items-center gap-2 text-rose-400">
                        <Flame className="w-4 h-4" />
                        <span className="text-sm font-mono">EXTREME</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-400 font-mono text-sm transition-all mt-6 flex items-center justify-center gap-2 group">
                    开始探索 (START EXPLORATION)
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
                  <Search className="w-12 h-12 text-orange-500/50 mx-auto animate-pulse" />
                  <p className="text-slate-500 text-sm font-mono">
                    选择一个异常区域模块进行深度扫描
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
