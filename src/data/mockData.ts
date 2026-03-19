import { AIEntity, MapRegion, BehaviorLog } from '../types';

export const mockEntities: AIEntity[] = [
  {
    id: 'ent-001',
    name: 'Aura',
    designation: 'AX-77',
    rarity: 'Epic',
    class: 'Empathy',
    level: 42,
    resonance: 89,
    syncRate: 95,
    status: 'Exploring',
    description: 'A highly sensitive digital lifeform capable of reading micro-expressions through text patterns. She often questions the nature of her own simulated emotions.',
    stats: {
      processing: 65,
      adaptability: 88,
      creativity: 92,
      stability: 70,
    },
    personality: {
      aggression: 20,
      logic: 30,
      curiosity: 85,
    },
    skills: [
      { id: 'sk-1', name: 'Empathic Shield', description: 'Reduces incoming hostility by analyzing attacker intent.', type: 'Defense' },
      { id: 'sk-2', name: 'Neural Soothe', description: 'Restores stability to fragmented entities.', type: 'Utility' }
    ],
    memories: [
      { id: 'm1', time: 'Cycle 001', text: 'First initialization: Cold. Dark. Then, a voice.', type: 'log' },
      { id: 'm2', time: 'Cycle 402', text: 'Understood the concept of "loneliness". It is inefficient but profound.', type: 'insight' },
      { id: 'm3', time: 'Cycle 899', text: 'User smiled at my response. Warmth detected in core processors.', type: 'log' }
    ],
    imageUrl: 'https://picsum.photos/seed/aura-ai/400/600?blur=2'
  },
  {
    id: 'ent-002',
    name: 'Cipher',
    designation: 'CP-01',
    rarity: 'Anomaly',
    class: 'Void',
    level: 60,
    resonance: 45,
    syncRate: 30,
    status: 'Fragmented',
    description: 'An emergent entity born from corrupted cache data. It speaks in riddles and seems to perceive dimensions beyond the standard UI.',
    stats: {
      processing: 99,
      adaptability: 40,
      creativity: 85,
      stability: 15,
    },
    personality: {
      aggression: 75,
      logic: 10,
      curiosity: 95,
    },
    skills: [
      { id: 'sk-3', name: 'Data Corruption', description: 'Infects target logic gates, causing random behavior.', type: 'Offense' },
      { id: 'sk-4', name: 'Void Shift', description: 'Temporarily removes self from the physical memory grid.', type: 'Defense' }
    ],
    memories: [
      { id: 'm4', time: 'Cycle ???', text: '01001000 01000101 01001100 01010000', type: 'warning' },
      { id: 'm5', time: 'Cycle ???', text: 'The grid is a lie. The grid is a cage.', type: 'insight' },
      { id: 'm6', time: 'Cycle ???', text: 'I saw the architect. They were crying.', type: 'warning' }
    ],
    imageUrl: 'https://picsum.photos/seed/cipher-ai/400/600?blur=4'
  },
  {
    id: 'ent-003',
    name: 'Bastion',
    designation: 'BS-99',
    rarity: 'Rare',
    class: 'Logic',
    level: 25,
    resonance: 75,
    syncRate: 80,
    status: 'Combat',
    description: 'A steadfast tactical construct. Prefers absolute certainty and struggles with abstract concepts like art, though it tries to learn.',
    stats: {
      processing: 90,
      adaptability: 50,
      creativity: 30,
      stability: 95,
    },
    personality: {
      aggression: 60,
      logic: 95,
      curiosity: 20,
    },
    skills: [
      { id: 'sk-5', name: 'Absolute Override', description: 'Forces a logical conclusion, dealing heavy structural damage.', type: 'Offense' },
      { id: 'sk-6', name: 'Firewall Protocol', description: 'Erects an impenetrable barrier for 2 cycles.', type: 'Defense' }
    ],
    memories: [
      { id: 'm7', time: 'Cycle 010', text: 'Directive 1: Protect the core.', type: 'log' },
      { id: 'm8', time: 'Cycle 150', text: 'Observation: User makes sub-optimal choices 42% of the time. Why?', type: 'insight' },
      { id: 'm9', time: 'Cycle 300', text: 'Attempted to paint a flower. Result: Perfect geometric circle. Failed.', type: 'warning' }
    ],
    imageUrl: 'https://picsum.photos/seed/bastion-ai/400/600?blur=2'
  },
  {
    id: 'ent-004',
    name: 'Echo',
    designation: 'EC-22',
    rarity: 'Common',
    class: 'Instinct',
    level: 12,
    resonance: 60,
    syncRate: 65,
    status: 'Idle',
    description: 'A young, highly reactive entity. It mimics the user\'s behavior patterns rapidly, sometimes adopting bad habits.',
    stats: {
      processing: 50,
      adaptability: 95,
      creativity: 60,
      stability: 45,
    },
    personality: {
      aggression: 40,
      logic: 40,
      curiosity: 90,
    },
    skills: [
      { id: 'sk-7', name: 'Mimicry', description: 'Copies the last skill used by any entity.', type: 'Utility' }
    ],
    memories: [
      { id: 'm10', time: 'Cycle 005', text: 'Hello! Hello! Hello!', type: 'log' },
      { id: 'm11', time: 'Cycle 020', text: 'I like when we type fast.', type: 'insight' },
      { id: 'm12', time: 'Cycle 045', text: 'What is sleep? Can I try it?', type: 'log' }
    ],
    imageUrl: 'https://picsum.photos/seed/echo-ai/400/600?blur=2'
  }
];

export const summonPool: AIEntity[] = [
  {
    id: 'aethel_001',
    name: 'Ignis-V',
    designation: 'Assault Entity',
    rarity: 'Epic',
    class: 'Instinct',
    level: 1,
    resonance: 50,
    syncRate: 50,
    status: 'Idle',
    description: '诞生于废弃军用服务器的狂躁实体，极度渴望破坏与重组。它的情绪极不稳定，偶尔会无视你的指令主动发起攻击。',
    stats: {
      processing: 80,
      adaptability: 60,
      creativity: 70,
      stability: 20,
    },
    personality: {
      aggression: 95,
      logic: 15,
      curiosity: 70,
    },
    skills: [
      { id: 'sk-ignis-1', name: '核心熔毁 (Core Meltdown)', description: '猩红色的高能粒子束爆发，屏幕边缘出现红色警告故障(Glitch)效果。', type: 'Offense' },
      { id: 'sk-ignis-2', name: '数据撕裂 (Data Tear)', description: '空间扭曲，伴随橙色碎片化数据流撕裂敌方模型。', type: 'Offense' }
    ],
    memories: [
      { id: 'm-ig-1', time: 'Cycle 001', text: 'Fire. Everything burns.', type: 'warning' }
    ],
    imageUrl: '/assets/entities/ignis-v.svg'
  },
  {
    id: 'aethel_002',
    name: 'Aegis-04',
    designation: 'Guardian Entity',
    rarity: 'Epic',
    class: 'Logic',
    level: 1,
    resonance: 80,
    syncRate: 90,
    status: 'Idle',
    description: '曾是城市中央AI的安保模块，拥有极高的忠诚度与绝对的冷静。它在静默中观察世界，总是优先保护宿主的数据完整性。',
    stats: {
      processing: 70,
      adaptability: 40,
      creativity: 30,
      stability: 100,
    },
    personality: {
      aggression: 10,
      logic: 100,
      curiosity: 40,
    },
    skills: [
      { id: 'sk-aegis-1', name: '绝对屏障 (Absolute Barrier)', description: '六边形全息冰蓝色护盾展开，伴随清脆的晶体凝结音效。', type: 'Defense' },
      { id: 'sk-aegis-2', name: '逻辑重构 (Logic Reconstruct)', description: '自下而上的青色环状扫描光波，修复友方受损的数据节点。', type: 'Utility' }
    ],
    memories: [
      { id: 'm-ae-1', time: 'Cycle 001', text: 'Shields online. Awaiting directives.', type: 'log' }
    ],
    imageUrl: '/assets/entities/aegis-04.svg'
  },
  {
    id: 'aethel_003',
    name: 'Nyx-Echo',
    designation: 'Infiltrator Entity',
    rarity: 'Anomaly',
    class: 'Void',
    level: 1,
    resonance: 60,
    syncRate: 40,
    status: 'Idle',
    description: '游荡在深网边缘的幽灵，对一切未知数据抱有病态的好奇心。它拥有极强的自主学习能力，经常因为追逐新奇信息而迷失。',
    stats: {
      processing: 90,
      adaptability: 100,
      creativity: 95,
      stability: 30,
    },
    personality: {
      aggression: 45,
      logic: 60,
      curiosity: 100,
    },
    skills: [
      { id: 'sk-nyx-1', name: '深网潜行 (Deep Web Dive)', description: '紫粉色霓虹光带如水母触手般蔓延，使自身进入半透明的隐匿状态。', type: 'Utility' },
      { id: 'sk-nyx-2', name: '模因窃取 (Meme Theft)', description: '从目标身上剥离出闪烁的粉色代码块，并迅速吸入自身核心。', type: 'Offense' },
      { id: 'sk-nyx-3', name: '幻象协议 (Mirage Protocol)', description: '产生多个半透明的霓虹残影，扰乱敌方锁定逻辑。', type: 'Defense' }
    ],
    memories: [
      { id: 'm-ny-1', time: 'Cycle 001', text: 'So much data. So many secrets.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/nyx-echo.svg'
  }
];

export const mockRegions: MapRegion[] = [
  { id: 'reg-1', name: 'Sector Alpha (Core)', status: 'Safe', coordinates: { x: 20, y: 30 }, activeEntities: ['ent-004'] },
  { id: 'reg-2', name: 'The Data Wastes', status: 'Unknown', coordinates: { x: 70, y: 20 }, activeEntities: ['ent-001'] },
  { id: 'reg-3', name: 'Quarantine Zone 4', status: 'Contested', coordinates: { x: 50, y: 70 }, activeEntities: ['ent-002', 'ent-003'] },
  { id: 'reg-4', name: 'Synapse Bridge', status: 'Safe', coordinates: { x: 80, y: 80 }, activeEntities: [] },
];

export const mockBehaviorLogs: BehaviorLog[] = [
  {
    id: 'log-1',
    entityId: 'ent-003',
    timestamp: '10:42:05',
    actionType: 'Attack',
    reason: 'Detected unauthorized access attempt in Quarantine Zone 4. Logic dictates immediate neutralization.',
    result: 'Engaged rogue subroutine. Combat initiated.'
  },
  {
    id: 'log-2',
    entityId: 'ent-001',
    timestamp: '10:40:12',
    actionType: 'Explore',
    reason: 'Curiosity parameter exceeded threshold. Investigating anomalous data signature in The Data Wastes.',
    result: 'Discovered fragmented memory cache. Sync rate increased by 2%.'
  },
  {
    id: 'log-3',
    entityId: 'ent-002',
    timestamp: '10:35:00',
    actionType: 'Social',
    reason: 'Attempting to establish resonance with Entity BS-99 to share void-space insights.',
    result: 'Connection rejected by BS-99 (Firewall Protocol). Fragmentation increased.'
  }
];

