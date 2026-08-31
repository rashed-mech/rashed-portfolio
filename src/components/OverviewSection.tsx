import { motion } from 'motion/react';
import React from 'react';
import { 
  Cpu, 
  Flame, 
  Wrench, 
  Compass, 
  MapPin, 
  ShieldCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { Profile } from '../types';
import { useLiveScholarStats } from '../hooks/useLiveScholarStats';

interface OverviewSectionProps {
  profile: Profile;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ profile }) => {
  // Live Google Scholar stats — shared hook, same source of truth used by
  // the admin dashboard and Researcher Profile tab. `profile.stats` (the
  // last value saved in the database) is only used as a fallback if the
  // live fetch fails.
  const { citations: displayCitations, hIndex: displayHIndex } = useLiveScholarStats(
    profile.social?.scholar,
    { citations: profile.stats?.citations ?? 0, hIndex: profile.stats?.hIndex ?? 0 }
  );

  const pillars = [
    {
      icon: Cpu,
      title: 'Hybrid Energy Modelling',
      tag: 'HOMER Pro · PVsyst · RETscreen',
      description: 'Hybrid system optimization, LCOE/NPC/LCOH techno-economic analysis, load assessment, life cycle analysis (LCA), and off-grid system validation.'
    },
    {
      icon: Flame,
      title: 'Hydrogen & CFD Simulation',
      tag: 'CONVERGE 3.0 · ANSYS Fluent · SolidWorks',
      description: 'Combustion modeling of green hydrogen vs conventional fuels in PFI SI engines, thermo-hydraulic heat exchanger modeling, and atomistic molecular dynamics.'
    },
    {
      icon: Wrench,
      title: 'Electrical & Maintenance',
      tag: 'Preventive & Corrective Diagnostics',
      description: 'Electrical installation assessment, solar PV integration, diesel/biogas generator performance monitoring, and safety compliance in resource-constrained environments.'
    },
    {
      icon: Compass,
      title: 'Fieldwork & Humanitarian Support',
      tag: 'Remote Infrastructure · Capacity Building',
      description: 'Hands-on fieldwork across coastal Bangladesh, technician coaching, technical documentation, and applying energy expertise for humanitarian operations (MSF).'
    }
  ];

  const metrics = [
    { value: '6 Papers', label: 'Journal Publications & Research', sub: '3 Published · 2 Under Review · 1 Submitted' },
    { value: '3.363 / 4.00', label: 'B.Sc. Mechanical Engineering', sub: 'HSTU Dinajpur (2019–2022)' },
    { value: 'CSWE', label: 'SolidWorks Certified', sub: 'CAD Professional & Sheet Metal' },
    { value: '2 Medals', label: 'Physics & Math Olympiad', sub: 'Divisional & Regional Awards' }
  ];

  return (
    <section className="pt-4 sm:pt-8 pb-12 sm:pb-16" id="overview">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Narrative & Impact Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-12">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all group shadow-sm shadow-slate-200/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-600 group-hover:scale-105 transition-transform origin-left">
                    {m.value}
                  </div>
                  {idx === 0 && (displayCitations > 0 || displayHIndex > 0) && (
                    <div className="flex flex-col items-end text-right">
                      <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-2.5 py-1 rounded-lg shadow-sm group-hover:bg-indigo-500 transition-colors">
                        <span className="text-sm font-bold font-sans">{displayCitations}</span>
                        <span className="text-[9px] uppercase tracking-widest font-semibold opacity-90">Citations</span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-slate-500 mt-1.5">
                        h-index: <span className="font-bold text-indigo-600">{displayHIndex}</span>
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-gray-900 mt-1">
                  {m.label}
                </div>
              </div>
              <div className="text-[10px] font-mono text-gray-700 mt-3">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:border-indigo-300 group-hover:bg-indigo-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-black tracking-tight mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-mono text-indigo-600 mb-2.5">
                    {pillar.tag}
                  </div>
                  <p className="text-xs text-gray-800 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};
