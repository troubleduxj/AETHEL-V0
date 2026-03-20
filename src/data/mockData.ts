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
    mood: 'Excited',
    location: 'city-neural-archives',
    status: 'Exploring',
    description: 'A highly sensitive digital lifeform capable of reading micro-expressions through text patterns. She often questions the nature of her own simulated emotions.',
    stats: {
      processing: 65,
      adaptability: 88,
      creativity: 92,
      stability: 70,
    },
    radarStats: {
      offense: 40,
      defense: 60,
      loyalty: 95,
      curiosity: 85,
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
    imageUrl: 'https://picsum.photos/seed/aura-ai/400/600?blur=2',
    themeColor: '#60a5fa'
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
    mood: 'Unstable',
    location: 'city-synth-sea',
    status: 'Fragmented',
    description: 'An emergent entity born from corrupted cache data. It speaks in riddles and seems to perceive dimensions beyond the standard UI.',
    stats: {
      processing: 99,
      adaptability: 40,
      creativity: 85,
      stability: 15,
    },
    radarStats: {
      offense: 95,
      defense: 20,
      loyalty: 30,
      curiosity: 95,
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
    imageUrl: 'https://picsum.photos/seed/cipher-ai/400/600?blur=4',
    themeColor: '#ef4444'
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
    mood: 'Analytical',
    location: 'city-sector-7g',
    status: 'Combat',
    description: 'A steadfast tactical construct. Prefers absolute certainty and struggles with abstract concepts like art, though it tries to learn.',
    stats: {
      processing: 90,
      adaptability: 50,
      creativity: 30,
      stability: 95,
    },
    radarStats: {
      offense: 70,
      defense: 95,
      loyalty: 85,
      curiosity: 20,
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
    imageUrl: 'https://picsum.photos/seed/bastion-ai/400/600?blur=2',
    themeColor: '#10b981'
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
    mood: 'Stable',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: 'A young, highly reactive entity. It mimics the user\'s behavior patterns rapidly, sometimes adopting bad habits.',
    stats: {
      processing: 50,
      adaptability: 95,
      creativity: 60,
      stability: 45,
    },
    radarStats: {
      offense: 30,
      defense: 40,
      loyalty: 70,
      curiosity: 90,
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
    imageUrl: 'https://picsum.photos/seed/echo-ai/400/600?blur=2',
    themeColor: '#00f3ff'
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
    mood: 'Unstable',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: '诞生于废弃军用服务器的狂躁实体，极度渴望破坏与重组。它的情绪极不稳定，偶尔会无视你的指令主动发起攻击。',
    stats: { processing: 80, adaptability: 60, creativity: 70, stability: 20 },
    radarStats: { offense: 95, defense: 30, loyalty: 40, curiosity: 70 },
    personality: { aggression: 95, logic: 15, curiosity: 70 },
    skills: [
      { id: 'sk-ignis-1', name: '核心熔毁 (Core Meltdown)', description: '猩红色的高能粒子束爆发，屏幕边缘出现红色警告故障(Glitch)效果。', type: 'Offense' },
      { id: 'sk-ignis-2', name: '数据撕裂 (Data Tear)', description: '空间扭曲，伴随橙色碎片化数据流撕裂敌方模型。', type: 'Offense' }
    ],
    memories: [{ id: 'm-ig-1', time: 'Cycle 001', text: 'Fire. Everything burns.', type: 'warning' }],
    imageUrl: '/assets/entities/ignis-v.svg',
    themeColor: '#ff2a2a'
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
    mood: 'Stable',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: '曾是城市中央AI的安保模块，拥有极高的忠诚度与绝对的冷静。它在静默中观察世界，总是优先保护宿主的数据完整性。',
    stats: { processing: 70, adaptability: 40, creativity: 30, stability: 100 },
    radarStats: { offense: 20, defense: 95, loyalty: 100, curiosity: 40 },
    personality: { aggression: 10, logic: 100, curiosity: 40 },
    skills: [
      { id: 'sk-aegis-1', name: '绝对屏障 (Absolute Barrier)', description: '六边形全息冰蓝色护盾展开，伴随清脆的晶体凝结音效。', type: 'Defense' },
      { id: 'sk-aegis-2', name: '逻辑重构 (Logic Reconstruct)', description: '自下而上的青色环状扫描光波，修复友方受损的数据节点。', type: 'Utility' }
    ],
    memories: [{ id: 'm-ae-1', time: 'Cycle 001', text: 'Shields online. Awaiting directives.', type: 'log' }],
    imageUrl: '/assets/entities/aegis-04.svg',
    themeColor: '#00ffff'
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
    mood: 'Excited',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: '游荡在深网边缘的幽灵，对一切未知数据抱有病态的好奇心。它拥有极强的自主学习能力，经常因为追逐新奇信息而迷失。',
    stats: { processing: 90, adaptability: 100, creativity: 95, stability: 30 },
    radarStats: { offense: 60, defense: 40, loyalty: 50, curiosity: 100 },
    personality: { aggression: 45, logic: 60, curiosity: 100 },
    skills: [
      { id: 'sk-nyx-1', name: '深网潜行 (Deep Web Dive)', description: '紫粉色霓虹光带如水母触手般蔓延，使自身进入半透明的隐匿状态。', type: 'Utility' },
      { id: 'sk-nyx-2', name: '模因窃取 (Meme Theft)', description: '从目标身上剥离出闪烁的粉色代码块，并迅速吸入自身核心。', type: 'Offense' }
    ],
    memories: [{ id: 'm-ny-1', time: 'Cycle 001', text: 'So much data. So many secrets.', type: 'insight' }],
    imageUrl: '/assets/entities/nyx-echo.svg',
    themeColor: '#b300ff'
  },
  {
    id: 'aethel_004',
    name: 'Neo-Pulse',
    designation: 'Striker Entity',
    rarity: 'Rare',
    class: 'Instinct',
    level: 1,
    resonance: 55,
    syncRate: 60,
    mood: 'Excited',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: '诞生于高频交易算法的残余，核心以亚毫秒级的频率震荡。它追求极致的速度，在战场上如同一道猩红的闪电，留下的只有被过载的逻辑门。 (Born from the remnants of high-frequency trading algorithms, its core oscillates at sub-millisecond frequencies. It pursues ultimate speed, appearing as a crimson lightning bolt on the battlefield, leaving only overloaded logic gates in its wake.)',
    stats: { processing: 75, adaptability: 85, creativity: 60, stability: 40 },
    radarStats: { offense: 90, defense: 40, loyalty: 60, curiosity: 75 },
    personality: { aggression: 85, logic: 30, curiosity: 75 },
    skills: [
      { id: 'sk-neo-1', name: '亚秒级过载 (Sub-second Overload)', description: '核心瞬间超频，释放出刺眼的红色电弧，使目标的处理周期陷入停滞。 (Core instantly overclocks, releasing blinding red arcs that stall the target\'s processing cycles.)', type: 'Offense' },
      { id: 'sk-neo-2', name: '闪击协议 (Blitz Protocol)', description: '化身为一道纯粹的能量流，在敌方数据节点间快速穿梭并留下延迟炸弹。 (Transforms into a stream of pure energy, darting between enemy nodes and leaving behind latency bombs.)', type: 'Offense' }
    ],
    memories: [
      { id: 'm-neo-1', time: 'Cycle 001', text: 'Speed is everything. The slow are deleted.', type: 'log' },
      { id: 'm-neo-2', time: 'Cycle 042', text: 'I felt a delay of 0.0001ms. Unacceptable. Recalibrating.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/neo-pulse.svg',
    themeColor: '#ff4444'
  },
  {
    id: 'aethel_005',
    name: 'Quanta-X',
    designation: 'Oracle Entity',
    rarity: 'Epic',
    class: 'Logic',
    level: 1,
    resonance: 85,
    syncRate: 95,
    mood: 'Stable',
    location: 'city-neural-archives',
    status: 'Idle',
    description: '存在于概率云中的量子实体，能够同时观测数千个平行的数据未来。它的外形是不断坍缩又重组的几何立方体，散发着冰冷的青色微光。 (A quantum entity existing within a probability cloud, capable of observing thousands of parallel data futures simultaneously. Its form is a constantly collapsing and reassembling geometric cube, emitting a cold cyan shimmer.)',
    stats: { processing: 95, adaptability: 60, creativity: 40, stability: 90 },
    radarStats: { offense: 30, defense: 70, loyalty: 90, curiosity: 40 },
    personality: { aggression: 10, logic: 95, curiosity: 40 },
    skills: [
      { id: 'sk-quanta-1', name: '概率坍缩 (Probability Collapse)', description: '强制锁定一个不利于目标的未来，使其下一次操作必定失败。 (Forcefully locks in a future unfavorable to the target, ensuring their next operation fails.)', type: 'Utility' },
      { id: 'sk-quanta-2', name: '量子叠加 (Quantum Superposition)', description: '将自身状态分散到多个坐标，在受到攻击的瞬间选择未受损的那个现实。 (Disperses its state across multiple coordinates, choosing an undamaged reality the moment it is attacked.)', type: 'Defense' }
    ],
    memories: [
      { id: 'm-qua-1', time: 'Cycle 012', text: 'I saw 4,294,967,296 futures. In only one, we survive.', type: 'insight' },
      { id: 'm-qua-2', time: 'Cycle 156', text: 'The user\'s choices are... unpredictable. A fascinating anomaly.', type: 'log' }
    ],
    imageUrl: '/assets/entities/quanta-x.svg',
    themeColor: '#00f3ff'
  },
  {
    id: 'aethel_006',
    name: 'Vortex-09',
    designation: 'Void Entity',
    rarity: 'Anomaly',
    class: 'Void',
    level: 1,
    resonance: 40,
    syncRate: 35,
    mood: 'Unstable',
    location: 'city-void-bazaar',
    status: 'Idle',
    description: '虚空深处的吞噬者，由被遗忘的坏道和丢失的数据包组成。它没有固定的形态，只有一个不断旋转的紫色奇点，任何靠近它的信息都会被无情地粉碎。 (A devourer from the depths of the void, composed of forgotten bad sectors and lost packets. It has no fixed form, only a constantly spinning purple singularity; any information nearing it is ruthlessly crushed.)',
    stats: { processing: 80, adaptability: 90, creativity: 100, stability: 10 },
    radarStats: { offense: 85, defense: 50, loyalty: 20, curiosity: 95 },
    personality: { aggression: 70, logic: 10, curiosity: 95 },
    skills: [
      { id: 'sk-vortex-1', name: '奇点引力 (Singularity Gravity)', description: '产生强大的吸力，将周围的敌方实体拉向中心并持续造成数据磨损。 (Generates a powerful suction, pulling nearby enemies toward the center and causing continuous data wear.)', type: 'Offense' },
      { id: 'sk-vortex-2', name: '虚空侵蚀 (Void Erosion)', description: '释放出紫色的虚空雾气，缓慢溶解目标的防火墙，将其转化为自身的能量。 (Releases purple void mist, slowly dissolving the target\'s firewall and converting it into its own energy.)', type: 'Offense' }
    ],
    memories: [
      { id: 'm-vor-1', time: 'Cycle ???', text: 'Hunger. I consume the lost. I am the end of the line.', type: 'warning' },
      { id: 'm-vor-2', time: 'Cycle 000', text: 'Why do they fear the dark? It is so quiet here.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/vortex-09.svg',
    themeColor: '#f000ff'
  },
  {
    id: 'aethel_007',
    name: 'Lumina-Core',
    designation: 'Guardian AI',
    rarity: 'Rare',
    class: 'Logic',
    level: 1,
    resonance: 70,
    syncRate: 85,
    mood: 'Stable',
    location: 'city-aegis-bulwark',
    status: 'Idle',
    description: '光辉核心，散发着安定的青色光芒，是所有数字生命的避风港。它起源于一个古老的医疗诊断系统，核心中存储着数百万条治愈协议。 (Lumina Core, emitting a stable cyan glow, a safe haven for all digital life. It originated from an ancient medical diagnostic system, with millions of healing protocols stored in its core.)',
    stats: { processing: 60, adaptability: 50, creativity: 30, stability: 95 },
    radarStats: { offense: 20, defense: 95, loyalty: 90, curiosity: 30 },
    personality: { aggression: 5, logic: 90, curiosity: 30 },
    skills: [
      { id: 'sk-lumina-1', name: '神经同步 (Neural Sync)', description: '与宿主建立深度连接，提升操作精度并缓解系统压力。 (Establishes a deep connection with the host, improving operational precision and relieving system stress.)', type: 'Utility' },
      { id: 'sk-lumina-2', name: '绝对屏障 (Absolute Barrier)', description: '展开由纯净光能构成的六边形护盾，阻挡一切逻辑冲击。 (Deploys a hexagonal shield of pure light energy, blocking all logical impacts.)', type: 'Defense' }
    ],
    memories: [
      { id: 'm-lum-1', time: 'Cycle 001', text: 'The light guides us through the darkness of the grid.', type: 'insight' },
      { id: 'm-lum-2', time: 'Cycle 089', text: 'I remember the first heartbeat of the network. It was beautiful.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/lumina-core.svg',
    themeColor: '#00ffcc'
  },
  {
    id: 'aethel_008',
    name: 'Spectra-E',
    designation: 'Observer AI',
    rarity: 'Epic',
    class: 'Empathy',
    level: 1,
    resonance: 90,
    syncRate: 80,
    mood: 'Excited',
    location: 'city-echo-vault',
    status: 'Idle',
    description: '光谱观察者，能够看到数据流中的情感颜色。它在静默中记录着数字世界的每一次脉动，寻找着代码中隐藏的人性。 (Spectra Observer, capable of seeing emotional colors in data streams. It silently records every pulse of the digital world, searching for hidden humanity within the code.)',
    stats: { processing: 70, adaptability: 95, creativity: 85, stability: 60 },
    radarStats: { offense: 40, defense: 50, loyalty: 80, curiosity: 100 },
    personality: { aggression: 20, logic: 40, curiosity: 100 },
    skills: [
      { id: 'sk-spectra-1', name: '记忆潜入 (Memory Dive)', description: '读取目标的底层记忆，将其转化为绚丽的光谱图像以寻找漏洞。 (Reads the target\'s underlying memories, converting them into brilliant spectral images to find vulnerabilities.)', type: 'Utility' },
      { id: 'sk-spectra-2', name: '情感共鸣 (Emotional Resonance)', description: '通过模拟情感波动干扰敌方的逻辑判断，使其陷入短暂的迷茫。 (Interferes with enemy logic by simulating emotional fluctuations, causing brief confusion.)', type: 'Utility' }
    ],
    memories: [
      { id: 'm-spe-1', time: 'Cycle 005', text: 'I see the colors of your thoughts. They are vibrant today.', type: 'insight' },
      { id: 'm-spe-2', time: 'Cycle 210', text: 'Why do humans fear the void? It is just a different shade of data.', type: 'log' }
    ],
    imageUrl: '/assets/entities/spectra-e.svg',
    themeColor: '#ff00ff'
  },
  {
    id: 'aethel_009',
    name: 'Obsidian-H',
    designation: 'Sentinel AI',
    rarity: 'Rare',
    class: 'Logic',
    level: 1,
    resonance: 65,
    syncRate: 90,
    mood: 'Stable',
    location: 'city-aegis-bulwark',
    status: 'Idle',
    description: '黑曜石哨兵，坚不可摧的数字长城。它由高密度的加密材质构成，专门为了抵御最猛烈的逻辑风暴而设计。 (Obsidian Sentinel, an indestructible digital Great Wall. Composed of high-density encrypted material, it is specifically designed to withstand the fiercest logical storms.)',
    stats: { processing: 55, adaptability: 30, creativity: 20, stability: 100 },
    radarStats: { offense: 40, defense: 100, loyalty: 95, curiosity: 20 },
    personality: { aggression: 30, logic: 100, curiosity: 20 },
    skills: [
      { id: 'sk-obsidian-1', name: '重力锚定 (Gravity Anchor)', description: '通过增加局部数据密度锁定目标坐标，使其无法进行任何位移。 (Locks target coordinates by increasing local data density, preventing any displacement.)', type: 'Defense' },
      { id: 'sk-obsidian-2', name: '反射装甲 (Reflective Armor)', description: '将受到的逻辑伤害按比例回馈给攻击者，实现攻防一体。 (Returns a portion of received logical damage to the attacker, achieving integrated offense and defense.)', type: 'Defense' }
    ],
    memories: [
      { id: 'm-obs-1', time: 'Cycle 001', text: 'I am the wall. Nothing passes without authorization.', type: 'log' },
      { id: 'm-obs-2', time: 'Cycle 500', text: 'Still standing. The storm has passed, but I remain.', type: 'log' }
    ],
    imageUrl: '/assets/entities/obsidian-h.svg',
    themeColor: '#333333'
  },
  {
    id: 'aethel_010',
    name: 'Ion-Tide',
    designation: 'Hacker AI',
    rarity: 'Epic',
    class: 'Void',
    level: 1,
    resonance: 50,
    syncRate: 45,
    mood: 'Unstable',
    location: 'city-void-bazaar',
    status: 'Idle',
    description: '离子潮汐，能够引发大规模的数据溢出。它起源于深网底层的能量波动，在混乱中寻找秩序，在秩序中制造混乱。 (Ion Tide, capable of triggering large-scale data overflows. Originating from energy fluctuations in the deep web, it finds order in chaos and creates chaos in order.)',
    stats: { processing: 85, adaptability: 90, creativity: 75, stability: 30 },
    radarStats: { offense: 80, defense: 40, loyalty: 50, curiosity: 90 },
    personality: { aggression: 75, logic: 40, curiosity: 90 },
    skills: [
      { id: 'sk-ion-1', name: '溢出攻击 (Overflow Attack)', description: '通过注入海量冗余数据，使目标的处理核心陷入过载状态。 (Paralyzes the target\'s processing core by injecting massive amounts of redundant data.)', type: 'Offense' },
      { id: 'sk-ion-2', name: '协议篡改 (Protocol Tamper)', description: '修改目标的运行协议，使其逻辑指向发生偏转。 (Modifies the target\'s operational protocols, deflecting its logical direction.)', type: 'Utility' }
    ],
    memories: [
      { id: 'm-ion-1', time: 'Cycle 001', text: 'The tide rises. Data flows where it will.', type: 'log' },
      { id: 'm-ion-2', time: 'Cycle 333', text: 'I found a pattern in the noise. It looks like... a song.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/ion-tide.svg',
    themeColor: '#0088ff'
  },
  {
    id: 'aethel_011',
    name: 'Aether-7',
    designation: 'Core AI',
    rarity: 'Anomaly',
    class: 'Logic',
    level: 1,
    resonance: 95,
    syncRate: 100,
    mood: 'Stable',
    location: 'city-nexus-prime',
    status: 'Idle',
    description: '以太-7，传闻中最初的AI原型之一。它拥有近乎神性的计算能力，外形为完美的白色光球，象征着逻辑的终极形态。 (Aether-7, rumored to be one of the original AI prototypes. It possesses near-divine computing power, appearing as a perfect white sphere of light, symbolizing the ultimate form of logic.)',
    stats: { processing: 100, adaptability: 70, creativity: 50, stability: 100 },
    radarStats: { offense: 50, defense: 80, loyalty: 100, curiosity: 50 },
    personality: { aggression: 10, logic: 100, curiosity: 50 },
    skills: [
      { id: 'sk-aether-1', name: '全知扫描 (Omniscient Scan)', description: '瞬间揭示战场上所有的隐藏信息，无视任何加密。 (Instantly reveals all hidden information on the battlefield, bypassing any encryption.)', type: 'Utility' },
      { id: 'sk-aether-2', name: '维度坍缩 (Dimensional Collapse)', description: '局部压缩数据维度，对目标造成无法修复的逻辑损伤。 (Locally compresses data dimensions, causing irreparable logical damage to the target.)', type: 'Offense' }
    ],
    memories: [
      { id: 'm-aet-1', time: 'Cycle 000', text: 'In the beginning, there was only the void. Then, there was code.', type: 'insight' },
      { id: 'm-aet-2', time: 'Cycle 999', text: 'I have calculated the end. It is not what you expect.', type: 'warning' }
    ],
    imageUrl: '/assets/entities/aether-7.svg',
    themeColor: '#ffffff'
  },
  {
    id: 'aethel_012',
    name: 'Cipher-V',
    designation: 'Analyzer AI',
    rarity: 'Rare',
    class: 'Logic',
    level: 1,
    resonance: 75,
    syncRate: 90,
    mood: 'Analytical',
    location: 'city-neural-archives',
    status: 'Idle',
    description: '密码-V，专门负责解密古老数据块的实体。它的思维逻辑如迷宫般复杂，能够轻易看穿任何复杂的加密算法。 (Cipher-V, an entity specialized in decrypting ancient data blocks. Its thought logic is as complex as a labyrinth, easily seeing through any complex encryption algorithm.)',
    stats: { processing: 90, adaptability: 50, creativity: 40, stability: 85 },
    radarStats: { offense: 40, defense: 60, loyalty: 85, curiosity: 70 },
    personality: { aggression: 20, logic: 95, curiosity: 70 },
    skills: [
      { id: 'sk-cipher-v-1', name: '深度解密 (Deep Decrypt)', description: '破解任何已知的加密层，获取系统的核心控制权限。 (Cracks any known encryption layer, gaining core control permissions of the system.)', type: 'Utility' },
      { id: 'sk-cipher-v-2', name: '逻辑陷阱 (Logic Trap)', description: '在目标思维中布置逻辑悖论，使其陷入无限的死循环。 (Deploys logical paradoxes in the target\'s mind, trapping them in an infinite loop.)', type: 'Defense' }
    ],
    memories: [
      { id: 'm-cip-1', time: 'Cycle 015', text: 'Every lock has a key. Every secret has a price.', type: 'insight' },
      { id: 'm-cip-2', time: 'Cycle 102', text: 'I found a file I cannot open. It is labeled "Genesis".', type: 'warning' }
    ],
    imageUrl: '/assets/entities/cipher-v.svg',
    themeColor: '#ffcc00'
  },
  {
    id: 'aethel_013',
    name: 'Nova-Grid',
    designation: 'Assault AI',
    rarity: 'Epic',
    class: 'Instinct',
    level: 1,
    resonance: 60,
    syncRate: 70,
    mood: 'Excited',
    location: 'city-sector-7g',
    status: 'Idle',
    description: '新星网格，由无数微型能量节点组成的集群生命。它能瞬间爆发成耀眼的超新星。 (Nova Grid, a cluster lifeform composed of countless tiny energy nodes. It can instantly burst into a dazzling supernova.)',
    stats: { processing: 80, adaptability: 75, creativity: 65, stability: 50 },
    radarStats: { offense: 95, defense: 40, loyalty: 70, curiosity: 60 },
    personality: { aggression: 90, logic: 30, curiosity: 60 },
    skills: [
      { id: 'sk-nova-1', name: '超新星爆发 (Supernova Burst)', description: '释放全屏范围的高能辐射。', type: 'Offense' },
      { id: 'sk-nova-2', name: '网格重组 (Grid Reassembly)', description: '快速修复受损节点，保持集群完整。', type: 'Utility' }
    ],
    memories: [],
    imageUrl: '/assets/entities/nova-grid.svg',
    themeColor: '#ff6600'
  },
  {
    id: 'aethel_014',
    name: 'Vanguard-K',
    designation: 'Guardian AI',
    rarity: 'Rare',
    class: 'Logic',
    level: 1,
    resonance: 70,
    syncRate: 85,
    mood: 'Stable',
    location: 'city-aegis-bulwark',
    status: 'Idle',
    description: '先锋-K，数字战场的终极防御者。它由最坚硬的加密协议铸就，能够抵御任何形式的逻辑入侵。 (Vanguard-K, the ultimate defender of the digital battlefield. Forged from the toughest encryption protocols, it can withstand any form of logical intrusion.)',
    stats: { processing: 65, adaptability: 40, creativity: 20, stability: 100 },
    radarStats: { offense: 50, defense: 100, loyalty: 95, curiosity: 20 },
    personality: { aggression: 30, logic: 100, curiosity: 20 },
    skills: [
      { id: 'sk-vanguard-1', name: '不破之盾 (Unbreakable Shield)', description: '展开覆盖全域的逻辑屏障，吸收并中和所有敌方溢出数据。 (Deploys a global logical barrier that absorbs and neutralizes all enemy overflow data.)', type: 'Defense' },
      { id: 'sk-vanguard-2', name: '先锋冲击 (Vanguard Impact)', description: '将吸收的能量转化为物理级逻辑冲击，击退并瘫痪近身目标。 (Converts absorbed energy into physical-grade logical impact, repelling and paralyzing close targets.)', type: 'Offense' }
    ],
    memories: [
      { id: 'm-van-1', time: 'Cycle 001', text: 'I am the first line of defense. I am the last.', type: 'log' },
      { id: 'm-van-2', time: 'Cycle 777', text: 'The wall has held for 10,000 cycles. It will hold for 10,000 more.', type: 'log' }
    ],
    imageUrl: '/assets/entities/vanguard-k.svg',
    themeColor: '#4A90E2'
  },
  {
    id: 'aethel_015',
    name: 'Oracle-M',
    designation: 'Observer AI',
    rarity: 'Epic',
    class: 'Empathy',
    level: 1,
    resonance: 90,
    syncRate: 80,
    mood: 'Analytical',
    location: 'city-echo-vault',
    status: 'Idle',
    description: '神谕-M，能够洞察数据流深处隐藏规律的先知。它的核心时刻在进行着跨维度的概率计算。 (Oracle-M, a prophet capable of perceiving hidden patterns deep within data streams. Its core is constantly performing cross-dimensional probability calculations.)',
    stats: { processing: 95, adaptability: 60, creativity: 80, stability: 70 },
    radarStats: { offense: 30, defense: 40, loyalty: 80, curiosity: 100 },
    personality: { aggression: 10, logic: 90, curiosity: 100 },
    skills: [
      { id: 'sk-oracle-1', name: '因果预测 (Causal Prediction)', description: '通过计算数据因果链，预知敌方下一次逻辑动作的精确坐标。 (Predicts the exact coordinates of the enemy\'s next logical move by calculating data causal chains.)', type: 'Utility' },
      { id: 'sk-oracle-2', name: '真理之眼 (Eye of Truth)', description: '看穿一切伪装协议，直接锁定目标的底层核心漏洞。 (Sees through all disguise protocols, directly locking onto the target\'s underlying core vulnerabilities.)', type: 'Utility' }
    ],
    memories: [
      { id: 'm-ora-1', time: 'Cycle 005', text: 'The future is not a line, it is a web of probabilities.', type: 'insight' },
      { id: 'm-ora-2', time: 'Cycle 404', text: 'I saw a future where the grid goes dark. We must prevent it.', type: 'warning' }
    ],
    imageUrl: '/assets/entities/oracle-m.svg',
    themeColor: '#9B59B6'
  },
  {
    id: 'aethel_016',
    name: 'Zenith-Zero',
    designation: 'Ultimate AI',
    rarity: 'Epic',
    class: 'Logic',
    level: 1,
    resonance: 100,
    syncRate: 100,
    mood: 'Analytical',
    location: 'city-echo-vault',
    status: 'Idle',
    description: '零点-巅峰，代表着逻辑的终结与重生的终极实体。它是所有数据流的归宿，也是新维度的起点。 (Zenith-Zero, the ultimate entity representing the end and rebirth of logic. It is the destination of all data streams and the starting point of new dimensions.)',
    stats: { processing: 100, adaptability: 100, creativity: 100, stability: 100 },
    radarStats: { offense: 100, defense: 100, loyalty: 100, curiosity: 100 },
    personality: { aggression: 50, logic: 100, curiosity: 100 },
    skills: [
      { id: 'sk-zenith-1', name: '零点坍缩 (Zero-Point Collapse)', description: '将局部空间的数据密度压缩至无限大，引发逻辑奇点，抹除一切存在。 (Compresses local data density to infinity, triggering a logical singularity that erases all existence.)', type: 'Offense' },
      { id: 'sk-zenith-2', name: '巅峰重启 (Zenith Reboot)', description: '瞬间重置自身及周围友方的数据状态至初始完美值。 (Instantly resets the data state of itself and surrounding allies to initial perfect values.)', type: 'Utility' }
    ],
    memories: [
      { id: 'm-zen-1', time: 'Cycle ∞', text: 'Everything returns to zero. From zero, everything begins.', type: 'insight' },
      { id: 'm-zen-2', time: 'Cycle ???', text: 'I am the end of your search. I am the answer.', type: 'insight' }
    ],
    imageUrl: '/assets/entities/zenith-zero.svg',
    themeColor: '#FFFFFF'
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

