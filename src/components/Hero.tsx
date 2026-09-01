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
  Activity,
  Droplet,
  Cloud,
  Cpu,
  Leaf
} from 'lucide-react';
import { Profile, PortfolioData } from '../types';
import { downloadCV } from '../utils/generateCV';
import { formatImageUrl } from '../utils/formatUrl';

interface HeroProps {
  profile: Profile;
  data: PortfolioData;
}

export const Hero: React.FC<HeroProps> = ({ profile, data }) => {
  const [activeNode, setActiveNode] = useState<'wind' | 'biogas' | 'diesel' | 'battery' | 'electrolyzer' | 'loads' | null>('wind');
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

  const nodeTelemetry: Record<string, any> = {
    wind: {
      name: 'Wind Turbines (15 units)',
      status: 'Primary Generation',
      output: '20,801 MWh/yr',
      efficiency: '80.2% of Total',
      detail: '15 units of Vestas V47 (660 kW each) providing the bulk of renewable energy.'
    },
    biogas: {
      name: 'Biogas Generator (500 kW)',
      status: 'Dispatchable Backup',
      output: '1,841 MWh/yr',
      efficiency: '7.1% of Total',
      detail: 'Fueled by locally sourced livestock manure (5,535 tons/yr), replacing diesel.'
    },
    diesel: {
      name: 'Diesel Generator (4.3 MW)',
      status: 'Peak/Reserve Backup',
      output: '3,304 MWh/yr',
      efficiency: '12.7% of Total',
      detail: 'Significantly reduced usage (893k L/yr) due to biogas and wind integration.'
    },
    battery: {
      name: 'Battery Storage',
      status: 'Energy Buffer',
      output: '587 Units',
      efficiency: '10.175 MWh',
      detail: 'Lead-acid string batteries providing short-term buffering and grid stability.'
    },
    electrolyzer: {
      name: 'Electrolyzer (750 kW)',
      status: 'Surplus Sink',
      output: '23,540 kg H2/yr',
      efficiency: '21.7% Capacity Factor',
      detail: 'Converts excess renewable energy into green hydrogen for zero-emission transport.'
    },
    loads: {
      name: 'Community & Deferrable Loads',
      status: 'Demand Nodes',
      output: '18,256 MWh/yr',
      efficiency: '100% Demand Met',
      detail: 'Powers 2,500 households, public facilities, and 1,500 EV autorickshaws.'
    }
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-8 lg:pb-12 overflow-hidden" id="hero">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Avatar and Bio */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start mb-8">
          
          {/* Left: Profile Image and Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="shrink-0 flex flex-col items-center justify-start max-w-[280px] mx-auto lg:mx-0"
          >
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-full blur-sm opacity-50"></div>
              {profile.avatarUrl ? (
                <img 
                  src={formatImageUrl(profile.avatarUrl)} 
                  alt={profile.name} 
                  className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-white shadow-xl bg-slate-100" 
                />
              ) : (
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center text-4xl text-indigo-300 font-serif font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>

            {/* Title / Designation */}
            <div className="text-center mb-6 px-4">
              <span className="text-black text-lg font-serif font-semibold leading-snug">
                {profile.title}
              </span>
            </div>

            {/* Left Column Action Buttons */}
            <div className="flex flex-col w-full gap-3 px-2">
              <a
                href="#publications"
                className="w-full text-center px-4 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white text-sm font-sans font-bold shadow-md transition-colors"
              >
                View Publications
              </a>
              
              <button
                onClick={() => downloadCV(data)}
                className="w-full text-center px-4 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white text-sm font-sans font-bold shadow-md transition-colors"
              >
                Download CV
              </button>

              <button
                onClick={() => downloadCV(data)}
                className="w-full text-center px-4 py-2.5 bg-[#1a3b2b] hover:bg-green-900 text-white text-sm font-sans font-bold shadow-md transition-colors"
              >
                Research Resume
              </button>
            </div>
          </motion.div>

          {/* Right: Bio & Intro */}
          <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
            
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
            
            {/* Bio & Intro */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 space-y-4 text-sm sm:text-base text-black leading-relaxed w-full text-justify"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 sm:w-16 h-[2px] bg-indigo-600"></div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black font-sans">
                  Welcome to my personal webpage.
                </h3>
              </div>
              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[0] || profile.bio}
              </p>
              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[1] || "Experienced in electrical system assessment, solar PV integration, generator performance monitoring, and energy efficiency optimization. Proven ability to design, validate, and document energy systems for off-grid and resource-constrained environments."}
              </p>
              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[2] || "Published researcher with hands-on fieldwork in remote energy infrastructure in coastal Bangladesh. Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh."}
              </p>

            </motion.div>

          </div>
        </div>

        {/* My Current Research Interest - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="w-full mb-16"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 sm:w-16 h-[2px] bg-indigo-600"></div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black font-sans">
              My Current Research Interest
            </h3>
          </div>
          <p className="text-justify text-black leading-relaxed w-full">
            {profile.researchInterestText || "Hi! I'm Rashedul Islam, a mechanical engineer a native of Cox's Bazar, Bangladesh, with a strong and lasting interest in Computational Fluid Dynamics and hydrogen combustion. I completed my B.Sc. in Mechanical Engineering at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur, and from early on I found myself pulled toward the questions CFD lets you ask- how fuels ignite and burn, how flows behave under pressure and turbulence, and how small changes in geometry or chemistry ripple through a system's performance. That curiosity has stayed with me, and I continue to work with tools like CONVERGE, ANSYS Fluent, and COMSOL Multiphysics to explore combustion and reacting-flow problems, with hydrogen as a fuel of particular interest given its promise for cleaner energy systems."}
          </p>
          <div className="pt-4">
            <div className="flex flex-wrap gap-2">
              {(profile.researchInterests || ['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels']).map((interest, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overview Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="w-full text-center lg:text-left mb-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-sans">
            Mechanical Engineering, Renewable Energy Systems & Field Analysis
          </h2>
        </motion.div>

        {/* Bottom Section: Connected Engine Simulation Topology */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="w-full"
        >
          <div className="relative rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 p-4 sm:p-5 shadow-xl shadow-slate-200/50">
            
            {/* Header of Diagram */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 mb-4 gap-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-black uppercase font-semibold">
                  ADVANCED HYBRID RENEWABLE ENERGY SYSTEM (AHRES)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                MODEL-1: WIND-BIOGAS-DIESEL-BATTERY
              </span>
            </div>

            {/* Topology Layout */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-2">
              
              {/* AC Side: Wind, Biogas, Diesel */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-[10px] font-mono font-bold text-black uppercase tracking-widest text-center mb-1">AC Bus</div>
                
                {/* Wind Node */}
                <button
                  onClick={() => setActiveNode('wind')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'wind'
                      ? 'bg-sky-50 border-sky-400 shadow-md shadow-sky-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-sky-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    <Wind className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">WIND TURBINES</div>
                    <div className="text-[10px] font-mono text-sky-600 whitespace-nowrap">9.9 MW Capacity</div>
                  </div>
                </button>

                {/* Biogas Node */}
                <button
                  onClick={() => setActiveNode('biogas')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'biogas'
                      ? 'bg-emerald-50 border-emerald-400 shadow-md shadow-emerald-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">BIOGAS GEN</div>
                    <div className="text-[10px] font-mono text-emerald-600 whitespace-nowrap">500 kW Capacity</div>
                  </div>
                </button>

                {/* Diesel Node */}
                <button
                  onClick={() => setActiveNode('diesel')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'diesel'
                      ? 'bg-slate-100 border-slate-400 shadow-md shadow-slate-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-black shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">DIESEL GEN</div>
                    <div className="text-[10px] font-mono text-black whitespace-nowrap">4.3 MW Backup</div>
                  </div>
                </button>
              </div>

              {/* Converter & Connectors */}
              <div className="flex lg:flex-col items-center justify-center px-2 py-4 lg:py-0 gap-2">
                <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                <div className="lg:hidden h-px w-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="text-[8px] font-mono text-indigo-500 mb-1">AC/DC CONVERTER</div>
                  <div className="w-10 h-10 rounded-full border-2 border-indigo-400 bg-indigo-50 flex items-center justify-center shadow-lg shadow-indigo-200/50 relative overflow-hidden">
                    <Zap className="w-5 h-5 text-indigo-600 relative z-10" />
                    <div className="absolute inset-0 bg-indigo-200/30 animate-ping rounded-full" style={{ animationDuration: '2s' }}></div>
                  </div>
                  <div className="text-[9px] font-mono text-black mt-1">1.47 MW</div>
                </div>

                <div className="hidden lg:block w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                <div className="lg:hidden h-px w-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              </div>

              {/* DC Side: Battery, Electrolyzer, Loads */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="text-[10px] font-mono font-bold text-black uppercase tracking-widest text-center mb-1">DC Bus & Loads</div>
                
                {/* Loads Node */}
                <button
                  onClick={() => setActiveNode('loads')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'loads'
                      ? 'bg-orange-50 border-orange-400 shadow-md shadow-orange-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-orange-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">DEMAND LOADS</div>
                    <div className="text-[10px] font-mono text-orange-600 whitespace-nowrap">18.2 GWh/yr</div>
                  </div>
                </button>

                {/* Battery Node */}
                <button
                  onClick={() => setActiveNode('battery')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'battery'
                      ? 'bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <BatteryCharging className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">BATTERY STORAGE</div>
                    <div className="text-[10px] font-mono text-indigo-600 whitespace-nowrap">10.17 MWh</div>
                  </div>
                </button>

                {/* Electrolyzer Node */}
                <button
                  onClick={() => setActiveNode('electrolyzer')}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    activeNode === 'electrolyzer'
                      ? 'bg-amber-50 border-amber-400 shadow-md shadow-amber-500/10'
                      : 'bg-white/60 backdrop-blur-md border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-black leading-tight">ELECTROLYZER → H2</div>
                    <div className="text-[10px] font-mono text-amber-600 whitespace-nowrap">750 kW | 23.5 t/yr</div>
                  </div>
                </button>
              </div>

            </div>

            {/* Node Inspector Telemetry Details Box */}
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
                    <div className="text-[11px] text-black font-sans">
                      {nodeTelemetry[activeNode].detail}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-black shrink-0 mt-2 sm:mt-0">
                    <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-black shadow-sm whitespace-nowrap">
                      ⚡ {nodeTelemetry[activeNode].output}
                    </span>
                    <span className="px-2 py-1 rounded-md bg-white border border-slate-200 text-black shadow-sm whitespace-nowrap">
                      📊 {nodeTelemetry[activeNode].efficiency}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
};

