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
    <section className="py-12 sm:py-16 border-t border-slate-200" id="overview">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-14">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">
            Mechanical Engineering, Renewable Energy Systems & Field Analysis
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-light max-w-4xl leading-relaxed">
            {profile.aboutText?.[0] || profile.bio}
          </p>
        </div>

        {/* Narrative & Impact Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed font-light">
            <p>
              {profile.aboutText?.[1] || "Experienced in electrical system assessment, solar PV integration, generator performance monitoring, and energy efficiency optimization. Proven ability to design, validate, and document energy systems for off-grid and resource-constrained environments."}
            </p>
            <p>
              {profile.aboutText?.[2] || "Published researcher with hands-on fieldwork in remote energy infrastructure in coastal Bangladesh. Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh."}
            </p>
            
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-md border border-slate-200 text-gray-900">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Cox’s Bazar Sadar, 4700, Bangladesh</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-md border border-slate-200 text-gray-900">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Renewable Energy Systems & Field Optimization</span>
              </span>
            </div>
          </div>

          {/* Metric Stats Bento */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            
            {/* Impact Metrics Display (fetched live from Google Scholar on every page load) */}
            {(displayCitations > 0 || displayHIndex > 0) && (
              <div className="col-span-2 p-4 rounded-xl bg-indigo-50/80 border border-indigo-100 hover:border-indigo-300 transition-all group flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[10px] font-mono text-indigo-700 uppercase font-semibold tracking-wider mb-2">Impact Metrics Display (Google Scholar)</div>
                  <div className="flex items-center space-x-8">
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600">{displayCitations}</div>
                      <div className="text-[11px] font-medium text-gray-900 mt-1">Total Citations</div>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-mono font-bold text-indigo-600">{displayHIndex}</div>
                      <div className="text-[11px] font-medium text-gray-900 mt-1">h-index</div>
                    </div>
                  </div>
                </div>
                <BookOpen className="w-10 h-10 text-indigo-200 hidden sm:block" />
              </div>
            )}

            {metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all group shadow-sm shadow-slate-200/50"
              >
                <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-600 group-hover:scale-105 transition-transform">
                  {m.value}
                </div>
                <div className="text-xs font-medium text-gray-900 mt-1">
                  {m.label}
                </div>
                <div className="text-[10px] font-mono text-gray-700 mt-0.5">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

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
