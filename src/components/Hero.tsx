import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Wind, 
  Flame, 
  BatteryCharging, 
  Home, 
  Download, 
  Mail, 
  BookOpen, 
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';
import { Profile, PortfolioData } from '../types';
import { downloadCV } from '../utils/generateCV';
import { formatImageUrl } from '../utils/formatUrl';

interface HeroProps {
  profile: Profile;
  data: PortfolioData;
}

export const Hero: React.FC<HeroProps> = ({ profile, data }) => {
  const [activeNode, setActiveNode] = useState<'solar' | 'wind' | 'biogas' | 'battery' | 'load' | null>('battery');
  
  const [displayedChars, setDisplayedChars] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (profile.name) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const audioCtx = audioCtxRef.current;
      
      const playTypewriterClick = () => {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().catch(() => {});
        }
        try {
          const bufferSize = audioCtx.sampleRate * 0.015; // 15ms click
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let j = 0; j < bufferSize; j++) {
            data[j] = Math.random() * 2 - 1;
          }
          const noise = audioCtx.createBufferSource();
          noise.buffer = buffer;
          const noiseFilter = audioCtx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.value = 1200; // tuned for typewriter clack
          
          const gainNode = audioCtx.createGain();
          gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.015);
          
          noise.connect(noiseFilter);
          noiseFilter.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          noise.start();
        } catch (e) {
          // Ignore audio errors
        }
      };

      let i = 0;
      let timeoutId: NodeJS.Timeout;
      
      const typeChar = () => {
        if (i < profile.name.length) {
          setDisplayedChars(i + 1);
          playTypewriterClick();
          i++;
          timeoutId = setTimeout(typeChar, 70 + Math.random() * 30); // Random typing speed
        }
      };
      
      timeoutId = setTimeout(typeChar, 400);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [profile.name]);

  const nodeTelemetry = {
    solar: {
      name: 'Photovoltaic Array (PV)',
      status: 'Generating (Peak Irradiance)',
      output: '4.85 kWp',
      voltage: '48.2 V DC (MPPT Tracked)',
      efficiency: '19.4% Module Efficiency',
      detail: 'Monocrystalline bifacial array with dust-soiling mitigation coating for coastal saline atmospheres.'
    },
    wind: {
      name: 'Coastal Small-Scale Wind Turbine',
      status: 'Active (Coastal Sea Breeze)',
      output: '2.40 kW',
      speed: '6.8 m/s Mean Wind Velocity',
      efficiency: 'Weibull Sizing Optimization',
      detail: 'Direct-drive permanent magnet synchronous generator with passive pitch regulation.'
    },
    biogas: {
      name: 'Anaerobic Biogas Generator',
      status: 'Standby / Base-Load Dispatch',
      output: '1.50 kW',
      methane: '62% CH4 Quality',
      efficiency: 'Solar Preheated Digester',
      detail: 'Mesophilic fixed-dome digester utilizing organic coastal biomass and cattle substrate.'
    },
    battery: {
      name: 'Battery Energy Storage System & EMS',
      status: 'Optimal State-of-Charge (SOC)',
      output: '86% SOC · 14.4 kWh LiFePO4',
      voltage: '51.2 V Nominal',
      efficiency: 'Thermal Degradation Protected',
      detail: 'Microprocessor-controlled Energy Management System balancing generation dispatch with zero blackout.'
    },
    load: {
      name: 'Coastal Community AC Mini-Grid Load',
      status: 'Supplied (100% Renewable Fraction)',
      output: '5.20 kW Continuous Demand',
      voltage: '230 V AC / 50 Hz Pure Sine',
      efficiency: '0% Unmet Electrical Load',
      detail: 'Delivering 24/7 electricity to residential households, marine ice refrigeration, and community clinics.'
    }
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-16 lg:pb-24 overflow-hidden" id="hero">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Avatar and Bio */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mb-16">
          
          {/* Left: Profile Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="shrink-0 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-full blur-sm opacity-50"></div>
              {profile.avatarUrl ? (
                <img 
                  src={formatImageUrl(profile.avatarUrl)} 
                  alt={profile.name} 
                  className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-white shadow-xl bg-slate-100" 
                />
              ) : (
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center text-4xl text-indigo-300 font-serif font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Bio & Intro */}
          <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Eyebrow / Designation (Appears after typing) */}
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: profile.name.length * 0.08 + 0.1 
              }}
              className="inline-flex items-center space-x-3"
            >
              <span className="w-8 h-px bg-gray-400"></span>
              <span className="text-gray-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
                {profile.title}
              </span>
            </motion.div>

            {/* Main Name Heading */}
            <div className="min-h-[3rem] sm:min-h-[4.5rem] lg:min-h-[5.5rem] flex items-center justify-center lg:justify-start mt-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-tight font-sans flex items-center">
                <span>{profile.name.substring(0, displayedChars)}</span>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
                  className="inline-block w-[3px] sm:w-[4px] h-[1em] bg-slate-900 ml-1 sm:ml-2"
                />
              </h1>
            </div>
            
            {/* Elegant Divider */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: profile.name.length * 0.08 + 0.2, ease: "easeOut" }}
              className="mt-6 w-16 mx-auto lg:mx-0 h-[2px] bg-indigo-600 origin-left"
            />

            {/* Subtitle / Focus Statement */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: profile.name.length * 0.08 + 0.3 }}
              className="text-base sm:text-lg text-gray-800 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {profile.headline || profile.bio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: profile.name.length * 0.08 + 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <a
                href="#publications"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-slate-900 hover:bg-indigo-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 hover:scale-[1.02]"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Publications</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-gray-900 hover:text-black border border-slate-200 hover:border-indigo-200 text-xs font-mono font-medium tracking-wider uppercase transition-all"
              >
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>Get in Touch</span>
              </a>

              {profile.social?.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-50 text-gray-900 hover:text-black border border-slate-200 hover:border-indigo-200 text-xs font-mono font-medium tracking-wider uppercase transition-all"
                >
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              
              <button
                onClick={() => downloadCV(data)}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 hover:border-indigo-300 text-xs font-mono font-bold tracking-wider uppercase transition-all"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Download CV</span>
              </button>
            </motion.div>

            {/* Metadata Footer Subline */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: profile.name.length * 0.08 + 0.5 }}
              className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start text-xs font-mono text-gray-700 gap-y-2 gap-x-2.5"
            >
              <span className="text-gray-800">{profile.location}</span>
              <span className="text-indigo-300 hidden sm:inline">·</span>
              <span className="text-gray-800">{profile.department || profile.affiliation}</span>
              <span className="text-indigo-300 hidden sm:inline">·</span>
              <a 
                href={`mailto:${profile.email}`} 
                className="text-indigo-600 hover:underline"
              >
                {profile.email}
              </a>
              {profile.phone && (
                <>
                  <span className="text-indigo-300 hidden sm:inline">·</span>
                  <span className="text-gray-800">{profile.phone}</span>
                </>
              )}
            </motion.div>

          </div>
        </div>

        {/* Bottom Section: Connected Hybrid Renewable Energy Grid Topology (Horizontal Tab) */}
        <div className="w-full">
          <div className="relative rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 p-4 sm:p-5 shadow-xl shadow-slate-200/50">
            
            {/* Header of Diagram */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-black uppercase font-semibold">
                  HYBRID MICROGRID TOPOLOGY
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                ONLINE · REAL-TIME
              </span>
            </div>

            {/* Topology Horizontal Layout */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-2">
              
              {/* Generation Nodes: Solar, Wind, Biogas (Horizontal) */}
              <div className="flex-1 grid grid-cols-3 gap-2">
                
                {/* Solar Node */}
                <button
                  onClick={() => setActiveNode('solar')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    activeNode === 'solar'
                      ? 'bg-amber-50 border-amber-500 shadow-md shadow-amber-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                      <Sun className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-900">SOLAR</div>
                      <div className="text-[9px] sm:text-[10px] font-mono text-amber-600">4.85 kWp</div>
                    </div>
                  </div>
                </button>

                {/* Wind Node */}
                <button
                  onClick={() => setActiveNode('wind')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    activeNode === 'wind'
                      ? 'bg-sky-50 border-sky-400 shadow-md shadow-sky-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-sky-400'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
                      <Wind className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-900">WIND</div>
                      <div className="text-[9px] sm:text-[10px] font-mono text-sky-600">2.40 kW</div>
                    </div>
                  </div>
                </button>

                {/* Biogas Node */}
                <button
                  onClick={() => setActiveNode('biogas')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    activeNode === 'biogas'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Flame className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-900">BIOGAS</div>
                      <div className="text-[9px] sm:text-[10px] font-mono text-emerald-600">1.50 kW</div>
                    </div>
                  </div>
                </button>

              </div>

              {/* Connector */}
              <div className="hidden lg:flex items-center justify-center px-1">
                <div className="w-4 h-0.5 bg-slate-200 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                </div>
              </div>
              <div className="lg:hidden flex items-center justify-center py-1">
                <div className="h-4 w-0.5 bg-slate-200 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                </div>
              </div>

              {/* Central Battery & EMS Hub */}
              <div className="flex-1">
                <button
                  onClick={() => setActiveNode('battery')}
                  className={`w-full p-3 rounded-xl border transition-all text-left cursor-pointer h-full flex flex-col justify-center ${
                    activeNode === 'battery'
                      ? 'bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-600/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <BatteryCharging className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-900 tracking-wider">
                          BATTERY HUB
                        </div>
                        <div className="text-[9px] font-mono text-gray-700 truncate max-w-[100px] sm:max-w-none">
                          SOC & Dispatch
                        </div>
                      </div>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded shrink-0">
                      86%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden border border-slate-300">
                    <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full w-[86%] rounded-full" />
                  </div>
                </button>
              </div>

              {/* Connector */}
              <div className="hidden lg:flex items-center justify-center px-1">
                <div className="w-4 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-400" />
              </div>
              <div className="lg:hidden flex items-center justify-center py-1">
                <div className="h-4 w-0.5 bg-gradient-to-b from-indigo-500 to-emerald-400" />
              </div>

              {/* Community Load */}
              <div className="flex-1">
                <button
                  onClick={() => setActiveNode('load')}
                  className={`w-full p-3 rounded-xl border transition-all text-left cursor-pointer h-full flex flex-col justify-center ${
                    activeNode === 'load'
                      ? 'bg-emerald-50 border-emerald-500 shadow-md shadow-emerald-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-900 tracking-wider">
                        COASTAL LOAD
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-600">
                        5.20 kW Demand
                      </div>
                    </div>
                  </div>
                </button>
              </div>

            </div>

            {/* Node Inspector Telemetry Details Box (Moved to bottom spanning full width) */}
            {activeNode && nodeTelemetry[activeNode] && (
              <div className="mt-4 p-3 rounded-xl bg-slate-50/80 backdrop-blur-md border border-slate-200 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-semibold text-indigo-700">
                        {nodeTelemetry[activeNode].name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600">
                        ({nodeTelemetry[activeNode].status})
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-800 font-sans">
                      {nodeTelemetry[activeNode].detail}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-gray-700 shrink-0 mt-2 sm:mt-0">
                    <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-gray-900 shadow-sm whitespace-nowrap">
                      ⚡ {nodeTelemetry[activeNode].output}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-gray-900 shadow-sm whitespace-nowrap">
                      📊 {nodeTelemetry[activeNode].efficiency}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

