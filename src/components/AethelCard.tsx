import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Shield, Zap, Eye, BrainCircuit } from 'lucide-react';
import { EntityData } from '../data';

interface AethelCardProps {
  entity: EntityData;
}

export const AethelCard: React.FC<AethelCardProps> = ({ entity }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getIcon = (className: string) => {
    switch (className) {
      case 'Assault Entity': return <Zap className="w-4 h-4" />;
      case 'Guardian Entity': return <Shield className="w-4 h-4" />;
      case 'Infiltrator Entity': return <Eye className="w-4 h-4" />;
      default: return <BrainCircuit className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[320px] h-[480px] rounded-[20px] cursor-pointer group"
      // Added perspective to the parent container for the 3D effect to work
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Ambient Glow */}
      <div 
        className="absolute inset-0 rounded-[20px] blur-[40px] opacity-20 transition-opacity duration-500 group-hover:opacity-50"
        style={{ backgroundColor: entity.themeColor }}
      />

      {/* Card Container (Glassmorphism) */}
      <div 
        className="absolute inset-0 rounded-[20px] bg-[#14141e]/40 backdrop-blur-xl border border-white/10 border-t-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 z-20" style={{ transform: "translateZ(30px)" }}>
          <div className="font-mono text-xs text-white/70 tracking-wider bg-black/30 px-2 py-1 rounded">
            {entity.id.split('_')[1].toUpperCase()}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-2 py-1 rounded-full bg-black/30" style={{ color: entity.themeColor }}>
            {getIcon(entity.class)}
            {entity.class}
          </div>
        </div>

        {/* Visual / SVG */}
        <div className="relative h-[200px] w-full flex items-center justify-center z-10" style={{ transform: "translateZ(50px)" }}>
          <img 
            src={entity.visual} 
            alt={entity.name} 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 pb-5 flex flex-col z-20" style={{ transform: "translateZ(40px)" }}>
          
          {/* Name */}
          <h2 
            className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ 
              color: '#fff', 
              textShadow: `0 0 15px ${entity.themeColor}80` 
            }}
          >
            {entity.name}
          </h2>

          {/* Radar Chart & Story */}
          <div className="flex gap-3 mb-4 h-[90px]">
            <div className="w-[90px] h-[90px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={entity.attributes}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 8 }} />
                  <Radar
                    name={entity.name}
                    dataKey="value"
                    stroke={entity.themeColor}
                    fill={entity.themeColor}
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 flex items-center">
              <p className="text-[10px] text-white/70 leading-relaxed text-justify">
                {entity.story}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-auto space-y-2">
            {entity.skills.map((skill, idx) => (
              <div 
                key={idx}
                className="group/skill relative bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-3 h-3" style={{ color: entity.themeColor }} />
                  <span className="text-xs font-medium text-white/90">{skill.name}</span>
                </div>
                {/* Tooltip for skill effect */}
                <div className="absolute bottom-full left-0 mb-2 w-full bg-black/90 backdrop-blur-md border border-white/10 rounded p-2 text-[10px] text-white/80 opacity-0 group-hover/skill:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
                  {skill.effect}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};
