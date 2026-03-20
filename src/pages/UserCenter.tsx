import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { PageId } from '../types';
import { useAppContext } from '../context/AppContext';
import { 
  User, 
  Calendar, 
  Key, 
  UserPlus, 
  Mail, 
  Clock, 
  Shield, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Copy,
  LogOut,
  Zap
} from 'lucide-react';

interface UserCenterProps {
  onNavigate: (page: PageId) => void;
}

export function UserCenter({ onNavigate }: UserCenterProps) {
  const { userProfile, checkIn, dataFragments, updateUserProfile } = useAppContext();
  const [showCheckInToast, setShowCheckInToast] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

  const handleCheckIn = () => {
    const result = checkIn();
    setShowCheckInToast({ show: true, success: result.success, message: result.message });
    setTimeout(() => setShowCheckInToast({ ...showCheckInToast, show: false }), 3000);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(userProfile.inviteCode);
    // Could add a toast here too
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate and call an API
    alert('Password change protocol initiated. Verification required.');
    setIsChangingPassword(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">USER COMMAND CENTER</h1>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest mt-1">Pilot Profile & Neural Security</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center gap-2">
            <Database className="w-4 h-4 text-neon-cyan" />
            <span className="font-mono text-sm text-neon-cyan">{dataFragments} DF</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          <GlassPanel className="p-8 border-white/10">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-fuchsia p-1">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-white">{userProfile.username}</h2>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-mono text-[10px] uppercase">Active Pilot</span>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-mono">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono text-xs uppercase">Joined: {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Check-in */}
            <GlassPanel className="p-6 border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-neon-cyan" />
                  <h3 className="font-display font-bold text-white uppercase tracking-wider">Daily Resonance Sync</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6 font-mono leading-relaxed">
                  Synchronize your neural patterns with the AETHEL network daily to receive Data Fragment rewards.
                </p>
              </div>
              <button 
                onClick={handleCheckIn}
                disabled={userProfile.lastCheckIn === new Date().toISOString().split('T')[0]}
                className={`w-full py-3 rounded-xl font-mono text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  userProfile.lastCheckIn === new Date().toISOString().split('T')[0]
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-neon-cyan text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                }`}
              >
                {userProfile.lastCheckIn === new Date().toISOString().split('T')[0] ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    SYNC COMPLETED
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    INITIALIZE SYNC (+500 DF)
                  </>
                )}
              </button>
            </GlassPanel>

            {/* Invite Friends */}
            <GlassPanel className="p-6 border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <UserPlus className="w-5 h-5 text-neon-fuchsia" />
                  <h3 className="font-display font-bold text-white uppercase tracking-wider">Network Expansion</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6 font-mono leading-relaxed">
                  Invite other pilots to the AETHEL network. Earn bonus Data Fragments for every successful sync.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="flex-1 font-mono text-sm text-white">{userProfile.inviteCode}</span>
                  <button 
                    onClick={copyInviteCode}
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <button className="w-full py-3 rounded-xl border border-neon-fuchsia/30 text-neon-fuchsia font-mono text-sm font-bold hover:bg-neon-fuchsia/10 transition-all">
                  SHARE INVITE LINK
                </button>
              </div>
            </GlassPanel>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <GlassPanel className="p-6 border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-neon-cyan" />
              <h3 className="font-display font-bold text-white uppercase tracking-wider">Security Protocols</h3>
            </div>
            
            <div className="space-y-4">
              {!isChangingPassword ? (
                <button 
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-neon-cyan/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-slate-400 group-hover:text-neon-cyan" />
                    <span className="text-sm font-mono text-slate-300">Update Passcode</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <input 
                    type="password" 
                    placeholder="CURRENT PASSCODE"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                    value={passwordForm.current}
                    onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                  />
                  <input 
                    type="password" 
                    placeholder="NEW PASSCODE"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                    value={passwordForm.new}
                    onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                  />
                  <input 
                    type="password" 
                    placeholder="CONFIRM PASSCODE"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 outline-none"
                    value={passwordForm.confirm}
                    onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-2 rounded-lg bg-neon-cyan text-black font-mono text-xs font-bold"
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              )}

              <button className="w-full p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-neon-fuchsia/50 transition-all">
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-slate-400 group-hover:text-neon-fuchsia" />
                  <span className="text-sm font-mono text-slate-300">Terminate Session</span>
                </div>
              </button>
            </div>
          </GlassPanel>

          {/* Stats Summary */}
          <GlassPanel className="p-6 border-white/10 bg-gradient-to-br from-neon-cyan/5 to-transparent">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Network Statistics</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">Total Entities</span>
                <span className="text-sm font-mono text-white">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">Combat Victories</span>
                <span className="text-sm font-mono text-white">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">Exploration Progress</span>
                <span className="text-sm font-mono text-white">24%</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showCheckInToast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className={`px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-4 ${
              showCheckInToast.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              {showCheckInToast.success ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
              <span className="font-mono text-sm font-bold">{showCheckInToast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
