import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, Shield, ChevronRight, Terminal, Fingerprint, Globe, Lock } from 'lucide-react';
import { GlassPanel } from '../components/GlassPanel';

interface LandingProps {
  onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Particle System for Neural Network Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist / connectionDistance * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = p.x - mousePos.x;
        const mdy = p.y - mousePos.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.strokeStyle = `rgba(255, 0, 255, ${1 - mdist / 200 * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-950 flex items-center justify-center overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
    >
      {/* Neural Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-fuchsia/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black/40 border border-neon-cyan/30 mb-6 relative group">
            <div className="absolute inset-0 bg-neon-cyan/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <Cpu className="w-10 h-10 text-neon-cyan relative z-10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-neon-cyan/20 rounded-2xl"
            />
          </div>
          
          <h1 className="font-display text-5xl font-bold text-white tracking-tighter mb-2">
            AETHEL <span className="text-neon-cyan font-light">OS</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
            <Globe className="w-3 h-3" />
            Neural Grid Established
          </div>
        </motion.div>

        <GlassPanel className="p-8 border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
          
          <div className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="relative">
                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="IDENTIFIER"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-neon-cyan/50 focus:outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="PASSCODE"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm font-mono text-white placeholder:text-slate-700 focus:border-neon-cyan/50 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                disabled
                className="w-full py-3 rounded-xl bg-slate-800/50 border border-white/5 text-slate-500 font-mono text-sm flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Fingerprint className="w-4 h-4" />
                SECURE AUTH OFFLINE
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono">
                  <span className="bg-slate-900 px-2 text-slate-600">Bypass Protocol</span>
                </div>
              </div>

              <motion.button
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
                onClick={onEnter}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-white text-black font-display font-bold text-lg flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-fuchsia opacity-0 group-hover:opacity-20 transition-opacity" />
                
                <span className="relative z-10 flex items-center gap-2">
                  INITIALIZE LINK
                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isHoveringButton ? 'translate-x-1' : ''}`} />
                </span>
              </motion.button>
            </div>
          </div>
        </GlassPanel>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center space-y-2"
        >
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            System Version: 2.5.0-ALPHA
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1 text-[8px] font-mono text-neon-emerald/60">
              <div className="w-1 h-1 rounded-full bg-neon-emerald animate-pulse" />
              ENCRYPTION ACTIVE
            </div>
            <div className="flex items-center gap-1 text-[8px] font-mono text-neon-cyan/60">
              <div className="w-1 h-1 rounded-full bg-neon-cyan animate-pulse" />
              NEURAL SYNC READY
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mouse Follower Glow */}
      <motion.div 
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
}
