import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { useAppContext } from '../context/AppContext';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Lock, 
  Unlock, 
  Plus, 
  Save, 
  RefreshCw,
  Server,
  Database,
  Globe
} from 'lucide-react';

interface AdminProps {
  onNavigate: (page: PageId) => void;
}

type AdminTab = 'dashboard' | 'users' | 'npc' | 'system';

export function Admin({ onNavigate }: AdminProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { roster } = useAppContext();

  // Mock data for Admin
  const stats = [
    { label: 'Total Users', value: '12,842', trend: '+12%', icon: Users, color: 'text-neon-cyan' },
    { label: 'Active Sessions', value: '1,420', trend: '+5%', icon: Activity, color: 'text-neon-emerald' },
    { label: 'Total Entities', value: roster.length.toString(), trend: '0%', icon: Cpu, color: 'text-neon-fuchsia' },
    { label: 'Server Load', value: '32%', trend: '-2%', icon: Server, color: 'text-amber-400' },
  ];

  const mockUsers = [
    { id: 'usr-001', name: 'NEURAL_PILOT_01', email: 'pilot01@aethel.net', status: 'Active', joined: '2026-03-15' },
    { id: 'usr-002', name: 'VOID_WALKER', email: 'walker@void.io', status: 'Active', joined: '2026-03-18' },
    { id: 'usr-003', name: 'CYBER_GHOST', email: 'ghost@shell.com', status: 'Banned', joined: '2026-03-10' },
    { id: 'usr-004', name: 'DATA_MINER', email: 'miner@grid.org', status: 'Active', joined: '2026-03-20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">SYSTEM OVERSEER</h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest mt-1">Admin Control Interface</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-neon-emerald/10 border border-neon-emerald/30 text-neon-emerald font-mono text-[10px] uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
            Core Systems Stable
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900/50 border border-white/5 w-fit">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'npc', label: 'NPC Settings', icon: Cpu },
          { id: 'system', label: 'System Params', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
              : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <GlassPanel key={i} className="p-6 border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-display font-bold text-white">{stat.value}</h3>
                      <span className={`text-[10px] font-mono ${stat.trend.startsWith('+') ? 'text-neon-emerald' : 'text-neon-fuchsia'}`}>
                        {stat.trend} vs last cycle
                      </span>
                    </div>
                    <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GlassPanel className="p-8 border-white/10 h-80 flex flex-col">
                <h3 className="font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neon-cyan" />
                  Neural Traffic Analysis
                </h3>
                <div className="flex-1 flex items-end gap-2 px-4">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-neon-cyan/20 to-neon-cyan/60 rounded-t-sm"
                    />
                  ))}
                </div>
              </GlassPanel>

              <GlassPanel className="p-8 border-white/10 h-80">
                <h3 className="font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-neon-fuchsia" />
                  Regional Sync Status
                </h3>
                <div className="space-y-4">
                  {['Nexus Prime', 'Silicon Wastes', 'Arena Core', 'Origin Lab'].map((region, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{region}</span>
                        <span className="text-white">{80 + i * 5}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${80 + i * 5}%` }}
                          className="h-full bg-neon-fuchsia"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div 
            key="users"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search by Pilot Name or ID..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 font-mono text-xs hover:text-white transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filter
                </button>
                <button className="px-4 py-2.5 rounded-xl bg-neon-cyan text-black font-bold font-mono text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Pilot
                </button>
              </div>
            </div>

            <GlassPanel className="border-white/10 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Pilot Identity</th>
                    <th className="px-6 py-4 font-bold">Registry Email</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Sync Date</th>
                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-neon-cyan border border-white/5">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{user.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-mono uppercase ${
                          user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neon-fuchsia/10 text-neon-fuchsia'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{user.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors">
                            {user.status === 'Active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                          <button className="p-2 rounded-lg hover:bg-white/10 text-neon-fuchsia transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassPanel>
          </motion.div>
        )}

        {activeTab === 'npc' && (
          <motion.div 
            key="npc"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white uppercase tracking-wider">Entity Archetypes</h3>
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" /> New Archetype
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roster.slice(0, 4).map((entity) => (
                  <GlassPanel key={entity.id} className="p-4 border-white/10 flex items-center gap-4 group hover:border-neon-cyan/50 transition-all">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10">
                      <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{entity.name}</h4>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{entity.class} | {entity.rarity}</p>
                      <div className="flex gap-2 mt-2">
                        <button className="text-[10px] font-mono text-neon-cyan uppercase hover:underline">Edit Logic</button>
                        <button className="text-[10px] font-mono text-slate-500 uppercase hover:underline">Clone</button>
                      </div>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </div>

            <GlassPanel className="p-6 border-white/10 h-fit space-y-6">
              <h3 className="font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Global AI Constraints
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Max Logic Resonance</label>
                  <input type="range" className="w-full accent-neon-cyan" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Aggression Threshold</label>
                  <input type="range" className="w-full accent-neon-fuchsia" />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-slate-300">Auto-Evolution</span>
                  <div className="w-10 h-5 bg-neon-emerald rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl bg-neon-cyan text-black font-bold font-mono text-xs flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> Apply Global Constraints
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div 
            key="system"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <GlassPanel className="p-8 border-white/10 space-y-8">
              <h3 className="font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Server className="w-4 h-4 text-neon-cyan" />
                Core Network Parameters
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">API Gateway Endpoint</label>
                  <input 
                    type="text" 
                    defaultValue="https://api.aethel.network/v1"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Summoning Drop Rates (Anomaly)</label>
                  <input 
                    type="text" 
                    defaultValue="0.5%"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Daily Check-in Reward (DF)</label>
                  <input 
                    type="number" 
                    defaultValue="500"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                  />
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="p-8 border-white/10 space-y-8">
              <h3 className="font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-neon-fuchsia" />
                Maintenance & Security
              </h3>
              <div className="space-y-4">
                <button className="w-full p-4 rounded-xl bg-neon-fuchsia/10 border border-neon-fuchsia/30 text-neon-fuchsia font-mono text-sm font-bold flex items-center justify-center gap-2 hover:bg-neon-fuchsia/20 transition-all">
                  <RefreshCw className="w-4 h-4" /> Force Global Cache Purge
                </button>
                <button className="w-full p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-sm font-bold flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all">
                  <ShieldAlert className="w-4 h-4" /> Enable Maintenance Mode
                </button>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span className="text-slate-500">Database Integrity</span>
                    <span className="text-neon-emerald">100% Verified</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full">
                    <div className="h-full w-full bg-neon-emerald" />
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button className="w-full py-4 rounded-xl bg-white text-black font-display font-bold text-lg flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" /> SAVE ALL CHANGES
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
