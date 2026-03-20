import React from 'react';
import { motion } from 'motion/react';

interface RadarChartProps {
  stats: {
    offense: number;
    defense: number;
    loyalty: number;
    curiosity: number;
  };
  color: string;
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ stats, color, size = 120 }) => {
  const center = size / 2;
  const radius = size * 0.4;
  
  const points = [
    { x: center, y: center - (stats.offense / 100) * radius }, // Top: Offense
    { x: center + (stats.loyalty / 100) * radius, y: center }, // Right: Loyalty
    { x: center, y: center + (stats.defense / 100) * radius }, // Bottom: Defense
    { x: center - (stats.curiosity / 100) * radius, y: center }, // Left: Curiosity
  ];

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx={center} cy={center} r={radius * 0.75} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        <circle cx={center} cy={center} r={radius * 0.5} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        <circle cx={center} cy={center} r={radius * 0.25} fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        
        {/* Axes */}
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="white" strokeOpacity="0.1" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="white" strokeOpacity="0.1" />

        {/* Labels */}
        <text x={center} y={center - radius - 5} textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5" className="font-mono">ATK</text>
        <text x={center + radius + 5} y={center + 3} textAnchor="start" fontSize="8" fill="white" fillOpacity="0.5" className="font-mono">LOY</text>
        <text x={center} y={center + radius + 10} textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5" className="font-mono">DEF</text>
        <text x={center - radius - 5} y={center + 3} textAnchor="end" fontSize="8" fill="white" fillOpacity="0.5" className="font-mono">CUR</text>

        {/* Data Polygon */}
        <motion.polygon
          points={polygonPath}
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        
        {/* Data Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill={color} />
        ))}
      </svg>
    </div>
  );
};
