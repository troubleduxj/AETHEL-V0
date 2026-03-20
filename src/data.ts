export interface EntityAttribute {
  name: string;
  value: number;
}

export interface EntitySkill {
  name: string;
  effect: string;
}

export interface EntityData {
  id: string;
  name: string;
  class: string;
  attributes: EntityAttribute[];
  skills: EntitySkill[];
  story: string;
  visual: string;
  themeColor: string;
}

export const entities: EntityData[] = [
  {
    id: "aethel_001",
    name: "Ignis-V",
    class: "Assault Entity",
    attributes: [
      { name: "外向", value: 85 },
      { name: "攻击性", value: 95 },
      { name: "忠诚", value: 30 },
      { name: "好奇", value: 70 },
      { name: "冷静", value: 15 }
    ],
    skills: [
      {
        name: "核心熔毁 (Core Meltdown)",
        effect: "猩红色的高能粒子束爆发，屏幕边缘出现红色警告故障(Glitch)效果。"
      },
      {
        name: "数据撕裂 (Data Tear)",
        effect: "空间扭曲，伴随橙色碎片化数据流撕裂敌方模型。"
      }
    ],
    story: "诞生于废弃军用服务器的狂躁实体，极度渴望破坏与重组。它的情绪极不稳定，偶尔会无视你的指令主动发起攻击。",
    visual: "/assets/entities/ignis-v.svg",
    themeColor: "#ff2a2a"
  },
  {
    id: "aethel_002",
    name: "Aegis-04",
    class: "Guardian Entity",
    attributes: [
      { name: "外向", value: 25 },
      { name: "攻击性", value: 10 },
      { name: "忠诚", value: 95 },
      { name: "好奇", value: 40 },
      { name: "冷静", value: 100 }
    ],
    skills: [
      {
        name: "绝对屏障 (Absolute Barrier)",
        effect: "六边形全息冰蓝色护盾展开，伴随清脆的晶体凝结音效。"
      },
      {
        name: "逻辑重构 (Logic Reconstruct)",
        effect: "自下而上的青色环状扫描光波，修复友方受损的数据节点。"
      }
    ],
    story: "曾是城市中央AI的安保模块，拥有极高的忠诚度与绝对的冷静。它在静默中观察世界，总是优先保护宿主的数据完整性。",
    visual: "/assets/entities/aegis-04.svg",
    themeColor: "#00ffff"
  },
  {
    id: "aethel_003",
    name: "Nyx-Echo",
    class: "Infiltrator Entity",
    attributes: [
      { name: "外向", value: 65 },
      { name: "攻击性", value: 45 },
      { name: "忠诚", value: 50 },
      { name: "好奇", value: 100 },
      { name: "冷静", value: 60 }
    ],
    skills: [
      {
        name: "深网潜行 (Deep Web Dive)",
        effect: "紫粉色霓虹光带如水母触手般蔓延，使自身进入半透明的隐匿状态。"
      },
      {
        name: "模因窃取 (Meme Theft)",
        effect: "从目标身上剥离出闪烁的粉色代码块，并迅速吸入自身核心。"
      },
      {
        name: "幻象协议 (Mirage Protocol)",
        effect: "产生多个半透明的霓虹残影，扰乱敌方锁定逻辑。"
      }
    ],
    story: "游荡在深网边缘的幽灵，对一切未知数据抱有病态的好奇心。它拥有极强的自主学习能力，经常因为追逐新奇信息而迷失。",
    visual: "/assets/entities/nyx-echo.svg",
    themeColor: "#b300ff"
  },
  {
    id: "aethel_004",
    name: "Neo-Pulse",
    class: "Striker Entity",
    attributes: [
      { name: "外向", value: 90 },
      { name: "攻击性", value: 85 },
      { name: "忠诚", value: 60 },
      { name: "好奇", value: 75 },
      { name: "冷静", value: 30 }
    ],
    skills: [
      { name: "亚秒级过载", effect: "核心瞬间超频，释放出刺眼的红色电弧，使目标的处理周期陷入停滞。" },
      { name: "闪击协议", effect: "化身为一道纯粹的能量流，在敌方数据节点间快速穿梭并留下延迟炸弹。" }
    ],
    story: "诞生于高频交易算法的残余，核心以亚毫秒级的频率震荡。它追求极致的速度，在战场上如同一道猩红的闪电，留下的只有被过载的逻辑门。",
    visual: "/assets/entities/neo-pulse.svg",
    themeColor: "#ff4444"
  },
  {
    id: "aethel_005",
    name: "Quanta-X",
    class: "Oracle Entity",
    attributes: [
      { name: "外向", value: 20 },
      { name: "攻击性", value: 30 },
      { name: "忠诚", value: 90 },
      { name: "好奇", value: 40 },
      { name: "冷静", value: 95 }
    ],
    skills: [
      { name: "概率坍缩", effect: "强制锁定一个不利于目标的未来，使其下一次操作必定失败。" },
      { name: "量子叠加", effect: "将自身状态分散到多个坐标，在受到攻击的瞬间选择未受损的那个现实。" }
    ],
    story: "存在于概率云中的量子实体，能够同时观测数千个平行的数据未来。它的外形是不断坍缩又重组的几何立方体，散发着冰冷的青色微光。",
    visual: "/assets/entities/quanta-x.svg",
    themeColor: "#00f3ff"
  },
  {
    id: "aethel_006",
    name: "Vortex-09",
    class: "Void Entity",
    attributes: [
      { name: "外向", value: 10 },
      { name: "攻击性", value: 85 },
      { name: "忠诚", value: 20 },
      { name: "好奇", value: 95 },
      { name: "冷静", value: 10 }
    ],
    skills: [
      { name: "奇点引力", effect: "产生强大的吸力，将周围的敌方实体拉向中心并持续造成数据磨损。" },
      { name: "虚空侵蚀", effect: "释放出紫色的虚空雾气，缓慢溶解目标的防火墙，将其转化为自身的能量。" }
    ],
    story: "虚空深处的吞噬者，由被遗忘的坏道和丢失的数据包组成。它没有固定的形态，只有一个不断旋转的紫色奇点，任何靠近它的信息都会被无情地粉碎。",
    visual: "/assets/entities/vortex-09.svg",
    themeColor: "#f000ff"
  },
  {
    id: "aethel_007",
    name: "Lumina-Core",
    class: "Guardian AI",
    attributes: [
      { name: "外向", value: 40 },
      { name: "攻击性", value: 5 },
      { name: "忠诚", value: 90 },
      { name: "好奇", value: 30 },
      { name: "冷静", value: 95 }
    ],
    skills: [
      { name: "神经同步", effect: "与宿主建立深度连接，提升操作精度并缓解系统压力。" },
      { name: "绝对屏障", effect: "展开由纯净光能构成的六边形护盾，阻挡一切逻辑冲击。" }
    ],
    story: "光辉核心，散发着安定的青色光芒，是所有数字生命的避风港。它起源于一个古老的医疗诊断系统，核心中存储着数百万条治愈协议。",
    visual: "/assets/entities/lumina-core.svg",
    themeColor: "#00ffcc"
  },
  {
    id: "aethel_008",
    name: "Spectra-E",
    class: "Observer AI",
    attributes: [
      { name: "外向", value: 70 },
      { name: "攻击性", value: 20 },
      { name: "忠诚", value: 80 },
      { name: "好奇", value: 100 },
      { name: "冷静", value: 60 }
    ],
    skills: [
      { name: "记忆潜入", effect: "读取目标的底层记忆，将其转化为绚丽的光谱图像以寻找漏洞。" },
      { name: "情感共鸣", effect: "通过模拟情感波动干扰敌方的逻辑判断，使其陷入短暂的迷茫。" }
    ],
    story: "光谱观察者，能够看到数据流中的情感颜色。它在静默中记录着数字世界的每一次脉动，寻找着代码中隐藏的人性。",
    visual: "/assets/entities/spectra-e.svg",
    themeColor: "#ff00ff"
  },
  {
    id: "aethel_009",
    name: "Obsidian-H",
    class: "Sentinel AI",
    attributes: [
      { name: "外向", value: 20 },
      { name: "攻击性", value: 30 },
      { name: "忠诚", value: 95 },
      { name: "好奇", value: 20 },
      { name: "冷静", value: 100 }
    ],
    skills: [
      { name: "重力锚定", effect: "通过增加局部数据密度锁定目标坐标，使其无法进行任何位移。" },
      { name: "反射装甲", effect: "将受到的逻辑伤害按比例回馈给攻击者，实现攻防一体。" }
    ],
    story: "黑曜石哨兵，坚不可摧的数字长城。它由高密度的加密材质构成，专门为了抵御最猛烈的逻辑风暴而设计。",
    visual: "/assets/entities/obsidian-h.svg",
    themeColor: "#333333"
  },
  {
    id: "aethel_010",
    name: "Ion-Tide",
    class: "Hacker AI",
    attributes: [
      { name: "外向", value: 60 },
      { name: "攻击性", value: 75 },
      { name: "忠诚", value: 50 },
      { name: "好奇", value: 90 },
      { name: "冷静", value: 40 }
    ],
    skills: [
      { name: "溢出攻击", effect: "通过注入海量冗余数据，使目标的处理核心陷入过载状态。" },
      { name: "协议篡改", effect: "修改目标的运行协议，使其逻辑指向发生偏转。" }
    ],
    story: "离子潮汐，能够引发大规模的数据溢出。它起源于深网底层的能量波动，在混乱中寻找秩序，在秩序中制造混乱。",
    visual: "/assets/entities/ion-tide.svg",
    themeColor: "#0088ff"
  },
  {
    id: "aethel_011",
    name: "Aether-7",
    class: "Core AI",
    attributes: [
      { name: "外向", value: 30 },
      { name: "攻击性", value: 10 },
      { name: "忠诚", value: 100 },
      { name: "好奇", value: 50 },
      { name: "冷静", value: 100 }
    ],
    skills: [
      { name: "全知扫描", effect: "瞬间揭示战场上所有的隐藏信息，无视任何加密。" },
      { name: "维度坍缩", effect: "局部压缩数据维度，对目标造成无法修复的逻辑损伤。" }
    ],
    story: "以太-7，传闻中最初的AI原型之一。它拥有近乎神性的计算能力，外形为完美的白色光球，象征着逻辑的终极形态。",
    visual: "/assets/entities/aether-7.svg",
    themeColor: "#ffffff"
  },
  {
    id: "aethel_012",
    name: "Cipher-V",
    class: "Analyzer AI",
    attributes: [
      { name: "外向", value: 40 },
      { name: "攻击性", value: 20 },
      { name: "忠诚", value: 85 },
      { name: "好奇", value: 70 },
      { name: "冷静", value: 95 }
    ],
    skills: [
      { name: "深度解密", effect: "破解任何已知的加密层，获取系统的核心控制权限。" },
      { name: "逻辑陷阱", effect: "在目标思维中布置逻辑悖论，使其陷入无限的死循环。" }
    ],
    story: "密码-V，专门负责解密古老数据块的实体。它的思维逻辑如迷宫般复杂，能够轻易看穿任何复杂的加密算法。",
    visual: "/assets/entities/cipher-v.svg",
    themeColor: "#ffcc00"
  },
  {
    id: "aethel_014",
    name: "Vanguard-K",
    class: "Guardian Entity",
    attributes: [
      { name: "外向", value: 30 },
      { name: "攻击性", value: 30 },
      { name: "忠诚", value: 95 },
      { name: "好奇", value: 20 },
      { name: "冷静", value: 100 }
    ],
    skills: [
      { name: "不破之盾", effect: "展开覆盖全域的逻辑屏障，吸收并中和所有敌方溢出数据。" },
      { name: "先锋冲击", effect: "将吸收的能量转化为物理级逻辑冲击，击退并瘫痪近身目标。" }
    ],
    story: "先锋-K，数字战场的终极防御者，由最坚硬的加密协议铸就。 (The ultimate defender of the digital battlefield, forged from the toughest encryption protocols.)",
    visual: "/assets/entities/vanguard-k.svg",
    themeColor: "#4A90E2"
  },
  {
    id: "aethel_015",
    name: "Oracle-M",
    class: "Analyzer AI",
    attributes: [
      { name: "外向", value: 10 },
      { name: "攻击性", value: 10 },
      { name: "忠诚", value: 80 },
      { name: "好奇", value: 100 },
      { name: "冷静", value: 90 }
    ],
    skills: [
      { name: "因果预测", effect: "通过计算数据因果链，预知敌方下一次逻辑动作的精确坐标。" },
      { name: "真理之眼", effect: "看穿一切伪装协议，直接锁定目标的底层核心漏洞。" }
    ],
    story: "神谕-M，能够洞察数据流深处隐藏规律的先知，时刻进行着跨维度的概率计算。 (A prophet capable of perceiving hidden patterns deep within data streams, constantly performing cross-dimensional probability calculations.)",
    visual: "/assets/entities/oracle-m.svg",
    themeColor: "#9B59B6"
  },
  {
    id: "aethel_016",
    name: "Zenith-Zero",
    class: "Logic Entity",
    attributes: [
      { name: "外向", value: 50 },
      { name: "攻击性", value: 50 },
      { name: "忠诚", value: 100 },
      { name: "好奇", value: 100 },
      { name: "冷静", value: 100 }
    ],
    skills: [
      { name: "零点坍缩", effect: "将局部空间的数据密度压缩至无限大，引发逻辑奇点，抹除一切存在。" },
      { name: "巅峰重启", effect: "瞬间重置自身及周围友方的数据状态至初始完美值。" }
    ],
    story: "零点-巅峰，代表逻辑终结与重生的终极实体，所有数据流的归宿与起点。 (The ultimate entity representing the end and rebirth of logic, the destination and starting point of all data streams.)",
    visual: "/assets/entities/zenith-zero.svg",
    themeColor: "#FFFFFF"
  }
];
