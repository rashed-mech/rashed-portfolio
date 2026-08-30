import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Mail, Linkedin, Play, Square } from 'lucide-react';
import { Profile } from '../types';
import { submitContactMessage } from '../api';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [isEngaged, setIsEngaged] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
    const reduced = useReducedMotion();

  
  const toggleEngage = () => setIsEngaged(!isEngaged);

  const ACCENT = "#E3A34D";
  const GLOW = "#fcd34d";
  const BASE_COLOR = "#475569";
  const ACTIVE_BG = "#fffbeb"; 

  // --- Subcomponents for High-Quality Node Animations ---

  const Conduit = ({ d, delay, active }: { d: string, delay: number, active: boolean }) => (
    <g>
      {/* Base track */}
      <path d={d} fill="none" stroke="#e2e8f0" strokeWidth="3" />
      {/* Power fill */}
      <motion.path
        d={d} fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: active ? delay : 0, ease: "easeInOut" }}
      />
      {/* High-speed energy pulses */}
      {active && !reduced && (
        <motion.path
          d={d} fill="none" stroke={GLOW} strokeWidth="1.5" strokeDasharray="4 24" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ strokeDashoffset: -28, opacity: [0, 1, 1, 0] }}
          transition={{
            strokeDashoffset: { duration: 0.5, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.6, delay: delay + 0.6 }
          }}
          style={{ filter: "url(#glow)" }}
        />
      )}
    </g>
  );

  const StationCard = ({ x, y, title, active, delay, children }: any) => (
    <g transform={`translate(${x}, ${y})`}>
      <motion.rect
        width="120" height="80" rx="8"
        fill="#ffffff"
        stroke={BASE_COLOR}
        strokeWidth="1.5"
        animate={{ 
          stroke: active ? ACCENT : "#cbd5e1", 
          fill: active ? "#ffffff" : "#f8fafc",
        }}
        transition={{ duration: 0.4, delay: active ? delay : 0 }}
        style={{ filter: active ? "drop-shadow(0 4px 6px rgba(227, 163, 77, 0.15))" : "none" }}
      />
      <motion.text
        x="12" y="20" fontSize="9" className="font-ibm font-bold tracking-widest"
        fill="#94a3b8"
        animate={{ fill: active ? ACCENT : "#94a3b8" }}
        transition={{ duration: 0.4, delay: active ? delay : 0 }}
      >
        {title}
      </motion.text>
      <g transform="translate(60, 45)">
        {children}
      </g>
    </g>
  );

  // 01 CAD: Isometric 3D construction
  const AnimCAD = ({ active }: { active: boolean }) => (
    <g>
      <motion.g 
        animate={active ? { y: [-2, 2, -2] } : { y: 0 }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Isometric Cube Base */}
        <path d="M 0 10 L 17 0 L 0 -10 L -17 0 Z" fill={active ? "#fef3c7" : "none"} stroke={active ? ACCENT : BASE_COLOR} strokeWidth="1" strokeLinejoin="round" />
        <path d="M -17 0 L 0 10 L 0 30 L -17 20 Z" fill={active ? "#fde68a" : "none"} stroke={active ? ACCENT : BASE_COLOR} strokeWidth="1" strokeLinejoin="round" />
        <path d="M 17 0 L 0 10 L 0 30 L 17 20 Z" fill={active ? "#fcd34d" : "none"} stroke={active ? ACCENT : BASE_COLOR} strokeWidth="1" strokeLinejoin="round" />
        
        {/* Scanning Laser */}
        {active && !reduced && (
          <motion.line 
            x1="-20" y1="-15" x2="20" y2="5" 
            stroke={ACCENT} strokeWidth="0.5"
            animate={{ x1: [-20, 0, -20], y1: [-15, 15, -15], x2: [20, 0, 20], y2: [5, 35, 5], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ filter: "url(#glow)" }}
          />
        )}
      </motion.g>
    </g>
  );

  // 02 CFD: Fluid flow with vortices
  const AnimCFD = ({ active }: { active: boolean }) => (
    <g>
      <circle cx="0" cy="0" r="10" fill={active ? "#fef3c7" : "#f1f5f9"} stroke={active ? ACCENT : BASE_COLOR} strokeWidth="1.5" />
      <g stroke={active ? ACCENT : BASE_COLOR} strokeWidth="1.5" fill="none" strokeDasharray="4 4">
        {/* Top flow */}
        <motion.path d="M -40 -12 C -15 -12, -15 -22, 0 -22 C 15 -22, 15 -12, 40 -12" 
          animate={active && !reduced ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        {/* Mid flow (blocked) */}
        <motion.path d="M -40 0 L -12 0 M 12 0 L 40 0" 
          animate={active && !reduced ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        {/* Bot flow */}
        <motion.path d="M -40 12 C -15 12, -15 22, 0 22 C 15 22, 15 12, 40 12" 
          animate={active && !reduced ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }} 
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      </g>
      {/* Vortices */}
      {active && !reduced && (
        <>
          <motion.circle cx="20" cy="-8" r="4" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 2"
            animate={{ rotate: 360, opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          <motion.circle cx="20" cy="8" r="4" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="2 2"
            animate={{ rotate: -360, opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        </>
      )}
    </g>
  );

  // 03 KIN: Realistic Piston & Gear
  const AnimKIN = ({ active }: { active: boolean }) => (
    <g>
      {/* Cylinder walls */}
      <path d="M -12 -22 L -12 5 M 12 -22 L 12 5" fill="none" stroke={BASE_COLOR} strokeWidth="1.5" />
      {/* Piston head */}
      <motion.rect x="-10" y="-18" width="20" height="10" fill={active ? ACCENT : BASE_COLOR} rx="1"
        animate={active && !reduced ? { y: [-18, -2, -18] } : { y: -18 }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
      {/* Connecting rod */}
      <motion.line x1="0" y1="-10" stroke={active ? ACCENT : BASE_COLOR} strokeWidth="2" strokeLinecap="round"
        animate={active && !reduced ? { y1: [-10, 6, -10], x2: [6, -6, 6], y2: [22, 22, 22] } : { y1: -10, x2: 0, y2: 16 }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }} />
      {/* Crankshaft */}
      <motion.circle cx="0" cy="22" r="8" fill="none" stroke={BASE_COLOR} strokeWidth="2" strokeDasharray="3 3"
        animate={active && !reduced ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }} />
      {/* Spark explosion at TDC */}
      {active && !reduced && (
        <motion.circle cx="0" cy="-20" fill={GLOW} style={{ filter: "url(#glow)" }}
          animate={{ r: [0, 8, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "circOut" }} />
      )}
    </g>
  );

  // 04 FAB: Lathe with flying chips
  const AnimFAB = ({ active }: { active: boolean }) => (
    <g>
      {/* Chuck spinning */}
      <motion.rect x="-35" y="-12" width="10" height="24" fill={BASE_COLOR} rx="1"
        animate={active && !reduced ? { scaleY: [1, 0.8, 1] } : { scaleY: 1 }} 
        transition={{ duration: 0.1, repeat: Infinity }} />
      {/* Stock Cylinder */}
      <rect x="-25" y="-6" width="50" height="12" fill={active ? "#fef3c7" : "#e2e8f0"} />
      {/* Cut section */}
      <motion.rect x="-25" y="-6" height="12" fill={active ? ACCENT : "#cbd5e1"}
        animate={active && !reduced ? { width: [0, 45, 0] } : { width: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
      {/* Tool bit */}
      <motion.g animate={active && !reduced ? { x: [-25, 20, -25] } : { x: -25 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}>
        <path d="M 0 -15 L 5 -5 L -5 -5 Z" fill={BASE_COLOR} />
        {/* Sparks / Chips flying */}
        {active && !reduced && (
          <motion.circle cx="0" cy="-5" r="1.5" fill={GLOW}
            animate={{ x: [0, 15, 25], y: [-5, -20, -10], opacity: [1, 1, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "easeOut" }} />
        )}
      </motion.g>
    </g>
  );

  // 05 WLD: Seam welding with intense arc and glowing bead
  const AnimWLD = ({ active }: { active: boolean }) => (
    <g>
      {/* Plates */}
      <rect x="-30" y="-15" width="28" height="30" fill="#e2e8f0" rx="1" />
      <rect x="2" y="-15" width="28" height="30" fill="#e2e8f0" rx="1" />
      {/* Seam */}
      <line x1="0" y1="-15" x2="0" y2="15" stroke={BASE_COLOR} strokeWidth="1" />
      {/* Glowing Weld Bead */}
      <motion.line x1="0" y1="-15" x2="0" y2="15" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round"
        style={{ filter: active ? "url(#glow)" : "none" }}
        animate={active && !reduced ? { strokeDasharray: "30", strokeDashoffset: [30, 0, 30] } : { strokeDasharray: "30", strokeDashoffset: 30 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
      {/* Torch & Arc */}
      <motion.g animate={active && !reduced ? { y: [-15, 15, -15] } : { y: -15 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
        <path d="M 5 -10 L 0 0 L 10 0 Z" fill={BASE_COLOR} />
        {active && !reduced && (
          <motion.circle cx="0" cy="0" fill="#ffffff" style={{ filter: "url(#strong-glow)" }}
            animate={{ r: [2, 4, 2], opacity: [0.6, 1, 0.4] }}
            transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }} />
        )}
      </motion.g>
    </g>
  );

  return (
    <section className="relative py-12 bg-white border-t border-slate-200" id="contact">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Space+Grotesk:wght@400;700&display=swap');
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-ibm { font-family: 'IBM Plex Mono', monospace; }
        .grid-bg {
          background-image: linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl font-space font-bold text-slate-900 tracking-tight">
              Production Line
            </h2>
            <p className="mt-2 text-xs font-ibm text-slate-500 uppercase tracking-widest">
              {isEngaged ? "STATUS: ONLINE. ASSEMBLING PROTOCOLS..." : "STATUS: IDLE. AWAITING ACTIVATION."}
            </p>
          </div>
          
          <button
            onClick={toggleEngage}
            className={`group relative px-6 py-3 rounded-lg font-ibm text-xs uppercase tracking-widest font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 flex items-center gap-3 ${
              isEngaged 
                ? 'bg-slate-900 text-slate-100 border-slate-900 shadow-md focus:ring-slate-900' 
                : 'bg-white text-slate-900 border-slate-900 hover:bg-slate-50 shadow-sm focus:ring-slate-900 hover:-translate-y-0.5'
            }`}
            aria-pressed={isEngaged}
          >
            {isEngaged ? <Square className="w-4 h-4 text-[#E3A34D]" fill="currentColor" /> : <Play className="w-4 h-4 text-slate-400 group-hover:text-slate-900" fill="currentColor" />}
            {isEngaged ? 'HALT SYSTEM' : 'ENGAGE LINE'}
          </button>
        </div>

        {/* Compact Schematic Canvas */}
        <div className="w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-inner relative grid-bg">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[960px] w-full max-w-[1000px] mx-auto p-4">
              <svg viewBox="0 0 1000 240" className="w-full h-auto overflow-visible" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* --- Conduits (Lines) --- */}
                {/* 00 -> 01 */}
                <Conduit d="M 160 60 L 260 60" delay={0.2} active={isEngaged} />
                {/* 01 -> 02 */}
                <Conduit d="M 380 60 L 480 60" delay={0.8} active={isEngaged} />
                {/* 02 -> 03 */}
                <Conduit d="M 600 60 L 700 60" delay={1.4} active={isEngaged} />
                {/* 03 -> 04 (The Turn) */}
                <Conduit d="M 820 60 L 850 60 A 10 10 0 0 1 860 70 L 860 150 A 10 10 0 0 1 850 160 L 820 160" delay={2.0} active={isEngaged} />
                {/* 04 -> 05 */}
                <Conduit d="M 700 160 L 600 160" delay={2.8} active={isEngaged} />
                {/* 05 -> 06 */}
                <Conduit d="M 480 160 L 380 160" delay={3.4} active={isEngaged} />

                {/* --- Nodes (Stations) --- */}
                {/* 00 PWR */}
                <StationCard x={40} y={20} title="00 PWR" active={isEngaged} delay={0}>
                  <rect x="-25" y="-12" width="50" height="24" rx="3" fill={BASE_COLOR} />
                  <motion.circle cx="0" cy="0" r="16" fill="#f8fafc" />
                  <motion.path d="M 0 -8 L 0 8 M -8 0 L 8 0" stroke={isEngaged ? ACCENT : BASE_COLOR} strokeWidth="3" strokeLinecap="round"
                    animate={{ rotate: isEngaged ? 90 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} />
                </StationCard>

                {/* 01 CAD */}
                <StationCard x={260} y={20} title="01 DESIGN" active={isEngaged} delay={0.6}>
                  <AnimCAD active={isEngaged} />
                </StationCard>

                {/* 02 CFD */}
                <StationCard x={480} y={20} title="02 CFD SIM" active={isEngaged} delay={1.2}>
                  <AnimCFD active={isEngaged} />
                </StationCard>

                {/* 03 KINEMATICS */}
                <StationCard x={700} y={20} title="03 KINEMATICS" active={isEngaged} delay={1.8}>
                  <AnimKIN active={isEngaged} />
                </StationCard>

                {/* 04 FABRICATION */}
                <StationCard x={700} y={120} title="04 FABRICATION" active={isEngaged} delay={2.6}>
                  <AnimFAB active={isEngaged} />
                </StationCard>

                {/* 05 WELDING */}
                <StationCard x={480} y={120} title="05 WELDING" active={isEngaged} delay={3.2}>
                  <AnimWLD active={isEngaged} />
                </StationCard>

                {/* 06 OUTPUT */}
                <StationCard x={260} y={120} title="06 OUTPUT" active={isEngaged} delay={3.8}>
                  <motion.circle cx="0" cy="0" r="16" fill={isEngaged ? ACCENT : "#e2e8f0"} 
                    style={{ filter: isEngaged ? "url(#glow)" : "none" }} transition={{ duration: 0.3, delay: isEngaged ? 3.8 : 0 }} />
                  {isEngaged && !reduced && (
                    <motion.circle cx="0" cy="0" r="16" fill="none" stroke={ACCENT} strokeWidth="2"
                      animate={{ r: [16, 28], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 3.8 }} />
                  )}
                  <motion.text x="0" y="32" fontSize="9" className="font-ibm font-bold tracking-widest" textAnchor="middle"
                    fill={isEngaged ? ACCENT : "#94a3b8"} transition={{ delay: isEngaged ? 3.8 : 0 }}>
                    {isEngaged ? "READY" : "STANDBY"}
                  </motion.text>
                </StationCard>

              </svg>
            </div>
          </div>
        </div>

        {/* Contact Form & CTA */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-900 rounded-xl p-6 md:p-8 flex flex-col justify-center shadow-xl border border-slate-800">
            <h3 className="text-2xl font-space font-bold text-white mb-4">
              Line operational. Ready to build?
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              The assembly sequence is complete. Let's connect to discuss fluid analysis, mechanical design, or your next complex integration. You can reach out directly via email, connect on LinkedIn, or send a secure message using the terminal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center space-x-2 bg-[#E3A34D] hover:bg-[#c98a39] text-slate-900 px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              {profile.social?.linkedin && (
                <a 
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors border border-slate-700"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect</span>
                </a>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-space font-bold text-slate-900 mb-6 flex items-center gap-2">
               Contact Messages
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Message transmitted successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

