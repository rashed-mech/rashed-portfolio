import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Check, 
  Cpu, 
  Settings, 
  Activity, 
  Flame, 
  Database,
  BarChart3,
  Zap,
  Code,
  LineChart
} from 'lucide-react';
import { SkillGroup } from '../types';

interface CapabilitiesSectionProps {
  config?: { title: string; subtitle: string };
  skillGroups: SkillGroup[];
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ skillGroups, config }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredGroups = activeCategory === 'all' 
    ? skillGroups 
    : skillGroups.filter(sg => sg.id === activeCategory);

  const getCategoryIcon = (index: number) => {
    switch (index % 4) {
      case 0: return Cpu;
      case 1: return Activity;
      case 2: return Settings;
      default: return Database;
    }
  };

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200 bg-slate-50/30" id="capabilities">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">
            {config?.title ?? "Core Engineering & Simulation Proficiencies"}
          </h2>
          {(config?.subtitle ?? "Multi-disciplinary expertise uniting renewable techno-economic modeling, dynamic state-space simulation, thermodynamic system analysis, and edge data acquisition.") && (
            <p className="text-sm sm:text-base text-black font-light leading-relaxed w-full max-w-full text-justify">
            {config?.subtitle ?? "Multi-disciplinary expertise uniting renewable techno-economic modeling, dynamic state-space simulation, thermodynamic system analysis, and edge data acquisition."}
          </p>
          )}
        </div>
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer uppercase ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-transparent'
                : 'bg-white text-black hover:text-black border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Capabilities
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCategory(group.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer uppercase ${
                activeCategory === group.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 border border-transparent'
                  : 'bg-white text-black hover:text-black border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {group.category.split('&')[0].trim()}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group, idx) => {
            const Icon = getCategoryIcon(idx);
            return (
              <motion.div
                layout
                key={group.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-black">
                        {group.category}
                      </h3>
                      {group.description && (
                        <p className="text-xs text-black mt-0.5 leading-relaxed text-justify">
                          {group.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2.5 mt-5">
                    {group.skills.map((skill, sIdx) => (
                      <div 
                         key={sIdx} 
                         className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                          skill.highlight
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-slate-50 border-slate-200 text-black hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${skill.highlight ? 'bg-blue-500' : 'bg-slate-300'}`} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
