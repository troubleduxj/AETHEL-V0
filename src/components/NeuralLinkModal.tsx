import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Zap, Shield, Info, ExternalLink, Key, Save } from 'lucide-react';
import { AIEntity, NeuralConfig } from '../types';
import { GlassPanel } from './GlassPanel';

interface NeuralLinkModalProps {
  entity: AIEntity;
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: NeuralConfig) => void;
}

export function NeuralLinkModal({ entity, isOpen, onClose, onSave }: NeuralLinkModalProps) {
  const [config, setConfig] = useState<NeuralConfig>(entity.neuralConfig || {
    isConnected: false,
    provider: 'OpenRouter',
    modelId: 'openai/gpt-4o',
  });

  const handleProviderChange = (provider: string) => {
    let defaultModel = '';
    switch (provider) {
      case 'OpenRouter': defaultModel = 'openai/gpt-4o-mini'; break;
      case 'OpenAI': defaultModel = 'gpt-4o-mini'; break;
      case 'Anthropic': defaultModel = 'claude-3-haiku-20240307'; break;
      case 'Google': defaultModel = 'gemini-1.5-flash'; break;
    }
    setConfig({ ...config, provider: provider as any, modelId: defaultModel });
  };

  const handleSave = () => {
    onSave({ ...config, isConnected: !!config.apiKey });
    onClose();
  };

  const getApiKeyUrl = () => {
    switch (config.provider) {
      case 'OpenRouter': return 'https://openrouter.ai/keys';
      case 'OpenAI': return 'https://platform.openai.com/api-keys';
      case 'Anthropic': return 'https://console.anthropic.com/settings/keys';
      case 'Google': return 'https://aistudio.google.com/app/apikey';
      default: return 'https://openrouter.ai/keys';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden"
          >
            <GlassPanel className="p-0 border-neon-cyan/30 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-neon-cyan/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
                    <Cpu className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white tracking-tight">NEURAL LINK CONFIGURATION</h2>
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">Entity: {entity.name} [{entity.designation}]</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                {/* Status Banner */}
                <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${config.isConnected ? 'bg-neon-cyan/10 border-neon-cyan/30' : 'bg-slate-800/50 border-white/5'}`}>
                  <div className={`w-3 h-3 rounded-full ${config.isConnected ? 'bg-neon-cyan animate-pulse shadow-[0_0_10px_rgba(0,243,255,1)]' : 'bg-slate-600'}`} />
                  <div className="flex-1">
                    <div className="text-xs font-mono text-slate-500 uppercase mb-0.5">Link Status</div>
                    <div className={`text-sm font-bold ${config.isConnected ? 'text-neon-cyan' : 'text-slate-400'}`}>
                      {config.isConnected ? 'SYNAPSE ACTIVE - ADVANCED COGNITION ENABLED' : 'OFFLINE - RUNNING ON BASELINE HEURISTICS'}
                    </div>
                  </div>
                  <Zap className={`w-5 h-5 ${config.isConnected ? 'text-neon-cyan' : 'text-slate-600'}`} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Provider Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">AI Provider</label>
                    <select 
                      value={config.provider}
                      onChange={(e) => handleProviderChange(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 focus:outline-none transition-colors"
                    >
                      <option value="OpenRouter">OpenRouter (Recommended)</option>
                      <option value="OpenAI">OpenAI</option>
                      <option value="Anthropic">Anthropic</option>
                      <option value="Google">Google Gemini</option>
                    </select>
                  </div>

                  {/* Model ID */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Model ID</label>
                    <input 
                      type="text"
                      value={config.modelId}
                      onChange={(e) => setConfig({...config, modelId: e.target.value})}
                      placeholder="e.g. gpt-4o-mini"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">API Secret Key</label>
                    <a href={getApiKeyUrl()} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-neon-cyan hover:underline flex items-center gap-1">
                      Get Key <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="password"
                      value={config.apiKey || ''}
                      onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                      placeholder="sk-..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-mono text-white focus:border-neon-cyan/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Custom Prompt */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">Personality Override (System Prompt)</label>
                  <textarea 
                    value={config.customPrompt}
                    onChange={(e) => setConfig({...config, customPrompt: e.target.value})}
                    placeholder="Define how this entity should behave..."
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:border-neon-cyan/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Security Info */}
                <div className="flex gap-3 p-4 rounded-xl bg-slate-900/50 border border-white/5">
                  <Shield className="w-5 h-5 text-neon-emerald shrink-0" />
                  <div className="text-[10px] font-mono text-slate-400 leading-relaxed">
                    <span className="text-neon-emerald font-bold uppercase">Security Protocol:</span> Your API keys are stored <span className="text-white">locally in your browser</span>. They are never transmitted to AETHEL servers. All AI inference is performed directly from your client.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-black/40 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Info className="w-3 h-3" />
                  Changes take effect immediately.
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg font-mono text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 rounded-lg bg-neon-cyan text-black font-bold font-mono text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    SAVE CONFIG
                  </button>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
