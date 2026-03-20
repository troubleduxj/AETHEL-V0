import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { GlassPanel } from '../components/GlassPanel';
import { AIEntity, PageId } from '../types';
import { ArrowLeft, Send, Terminal, Cpu, AlertTriangle, ExternalLink } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { callLLM, LLMMessage } from '../services/llmService';
import { NeuralLinkModal } from '../components/NeuralLinkModal';
import { useAppContext } from '../context/AppContext';

interface SynapseProps {
  entity: AIEntity;
  onNavigate: (page: PageId, entityId?: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'entity' | 'system';
  text: string;
  timestamp: string;
}

export function Synapse({ entity, onNavigate }: SynapseProps) {
  const { updateEntity } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'entity',
      text: `Synapse link established. Designation ${entity.designation} online. Awaiting input.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLinked = entity.neuralConfig?.isConnected && entity.neuralConfig?.apiKey;

  useEffect(() => {
    if (!isLinked && messages.length === 1) {
      setMessages(prev => [...prev, {
        id: 'warn-1',
        sender: 'system',
        text: "WARNING: Neural core not linked. Operating on public low-bandwidth network. Latency may occur.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [isLinked]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      let aiResponseText = "";

      if (isLinked && entity.neuralConfig) {
        // Use Private Neural Link (User's API Key)
        const llmMessages: LLMMessage[] = messages
          .filter(m => m.sender !== 'system')
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          }));
        
        // Add current message
        llmMessages.push({ role: 'user', content: userText });

        const response = await callLLM(entity.neuralConfig, llmMessages);
        if (response.error) {
          throw new Error(response.error);
        }
        aiResponseText = response.content;
      } else {
        // Fallback to Public Network (Gemini API)
        const history = messages
          .filter(m => m.sender !== 'system')
          .map(m => ({
            sender: m.sender as 'user' | 'entity',
            text: m.text
          }));

        aiResponseText = await generateChatResponse(entity, userText, history);
      }
      
      const newEntityMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'entity',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newEntityMsg]);
    } catch (error) {
      console.error("Failed to get response:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'entity',
        text: "ERROR: Neural link unstable. Response failed.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col"
    >
      <header className="flex items-center justify-between mb-4">
        <button 
          onClick={() => onNavigate('core', entity.id)}
          className="flex items-center gap-2 text-slate-400 hover:text-white font-mono text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Terminate Link
        </button>
        <div className="flex items-center gap-3">
          {!isLinked && (
            <button 
              onClick={() => setShowLinkModal(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 transition-colors"
            >
              <AlertTriangle className="w-3 h-3" />
              <span className="font-mono text-[10px] uppercase">Link Neural Core</span>
            </button>
          )}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isLinked ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-slate-800/50 border-white/10 text-slate-400'}`}>
            <div className={`w-2 h-2 rounded-full ${isLinked ? 'bg-neon-cyan animate-pulse' : 'bg-slate-600'}`} />
            <span className="font-mono text-xs uppercase">{isLinked ? 'Neural Link Active' : 'Public Network'}</span>
          </div>
        </div>
      </header>

      <GlassPanel className="flex-1 flex flex-col overflow-hidden border-neon-cyan/20 shadow-[0_0_30px_rgba(0,243,255,0.05)]">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-black/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
            <img src={entity.imageUrl} alt={entity.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white">{entity.name}</h2>
            <div className="font-mono text-xs text-slate-400">Sync Rate: {entity.syncRate}% | Resonance: {entity.resonance}Hz</div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'}`}
            >
              {msg.sender === 'system' ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/5 border border-amber-500/20 text-amber-500/80 text-[10px] font-mono uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" />
                  {msg.text}
                </div>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-mono text-[10px] text-slate-500">{msg.timestamp}</span>
                    <span className={`font-mono text-xs ${msg.sender === 'user' ? 'text-slate-300' : 'text-neon-cyan'}`}>
                      {msg.sender === 'user' ? 'USER' : entity.designation}
                    </span>
                  </div>
                  <div className={`
                    max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed
                    ${msg.sender === 'user' 
                      ? 'bg-slate-800 text-white rounded-tr-sm' 
                      : 'bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/90 rounded-tl-sm font-mono'}
                  `}>
                    {msg.text}
                  </div>
                </>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-start"
            >
              <div className="bg-neon-cyan/5 border border-neon-cyan/10 p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <form onSubmit={handleSend} className="relative flex items-center">
            <Terminal className="absolute left-4 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter input sequence..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-4 pl-12 pr-16 text-white font-mono text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all placeholder:text-slate-600"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 p-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </GlassPanel>

      {showLinkModal && (
        <NeuralLinkModal 
          entity={entity}
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          onSave={(config) => {
            updateEntity({ ...entity, neuralConfig: config });
          }}
        />
      )}
    </motion.div>
  );
}
