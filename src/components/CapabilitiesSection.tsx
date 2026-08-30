import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Check, 
  Cpu, 
  Settings, 
  Activity, 
  Flame, 
  Database,
  BarChart3
} from 'lucide-react';
import { SkillGroup } from '../types';

interface CapabilitiesSectionProps {
  skillGroups: SkillGroup[];
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ skillGroups }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...skillGroups.map(sg => sg.id)];

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
    <section className="py-12 sm:py-16 border-t border-slate-200" id="capabilities">
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
            Core Engineering & Simulation Proficiencies
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-light max-w-2xl leading-relaxed">
            Multi-disciplinary expertise uniting renewable techno-economic modeling, dynamic state-space simulation, thermodynamic system analysis, and edge data acquisition.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                : 'bg-slate-50 text-gray-800 hover:text-black border border-slate-200'
            }`}
          >
            ALL CAPABILITIES
          </button>
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCategory(group.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === group.id
                  ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                  : 'bg-slate-50 text-gray-800 hover:text-black border border-slate-200'
              }`}
            >
              {group.category.split('&')[0].toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group, idx) => {
            const Icon = getCategoryIcon(idx);
            return (
              <div
                key={group.id}
                className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between shadow-sm shadow-slate-200/50"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-black">
                        {group.category}
                      </h3>
                      {group.description && (
                        <p className="text-xs text-gray-700 font-light">
                          {group.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {group.skills.map((skill, sIdx) => (
                      <div 
                        key={sIdx} 
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                          skill.highlight
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                            : 'bg-white/60 backdrop-blur-md border-slate-200 text-gray-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${skill.highlight ? 'bg-indigo-600' : 'bg-slate-400'}`} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};
