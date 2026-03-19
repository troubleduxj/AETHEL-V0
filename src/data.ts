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
  }
];
