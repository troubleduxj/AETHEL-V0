export type EntityRarity = 'Common' | 'Rare' | 'Epic' | 'Anomaly';
export type EntityClass = 'Logic' | 'Empathy' | 'Instinct' | 'Void';

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'Offense' | 'Defense' | 'Utility';
}

export interface Memory {
  id: string;
  time: string;
  text: string;
  type: 'log' | 'insight' | 'warning';
}

export type EntityMood = 'Stable' | 'Excited' | 'Unstable' | 'Melancholy' | 'Analytical';

export interface AIEntity {
  id: string;
  name: string;
  designation: string;
  rarity: EntityRarity;
  class: EntityClass;
  level: number;
  resonance: number; // 0-100
  syncRate: number; // 0-100
  mood: EntityMood;
  location: PageId;
  status: 'Idle' | 'Processing' | 'Evolving' | 'Fragmented' | 'Combat' | 'Exploring';
  description: string;
  stats: {
    processing: number;
    adaptability: number;
    creativity: number;
    stability: number;
  };
  personality: {
    aggression: number; // 0-100 (Defensive vs Aggressive)
    logic: number;      // 0-100 (Emotional vs Logical)
    curiosity: number;  // 0-100 (Cautious vs Curious)
  };
  skills: Skill[];
  memories: Memory[];
  imageUrl: string;
}

export type PageId = 'nexus' | 'roster' | 'core' | 'synapse' | 'map' | 'logs' | 'combat' | 'aethel' | 'summon' | 'city-nexus-prime' | 'city-silicon-wastes' | 'city-sector-7g' | 'city-neural-archives' | 'city-aegis-bulwark' | 'city-synth-sea' | 'city-neurogrid-7' | 'city-echo-vault' | 'city-void-bazaar';

export interface MapRegion {
  id: string;
  name: string;
  status: 'Safe' | 'Contested' | 'Unknown';
  coordinates: { x: number; y: number };
  activeEntities: string[]; // Entity IDs
}

export interface BehaviorLog {
  id: string;
  entityId: string;
  timestamp: string;
  actionType: 'Attack' | 'Social' | 'Explore' | 'Idle';
  reason: string;
  result: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'Friendly' | 'Hostile' | 'Neutral';
  strength: number; // 0-100
}

