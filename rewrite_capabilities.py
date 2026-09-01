with open('src/components/CapabilitiesSection.tsx', 'r') as f:
    content = f.read()

# Let's replace the whole component

new_content = """import { motion } from 'motion/react';
import React, { useState } from 'react';
import { 
  Check, 
  Cpu, 
  Settings, 
  Activity, 
  Flame, 
  Database,
  BarChart3,
  CheckCircle2,
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
    switch (index % 6) {
      case 0: return Cpu;
      case 1: return LineChart;
      case 2: return Settings;
      case 3: return Database;
      case 4: return Zap;
      default: return Code;
    }
  };

  return (
    <section className="py-16 sm:py-24 border-t border-slate-200 bg-slate-50/50" id="capabilities">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 font-sans">
              {config?.title || "Core Capabilities"}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              {config?.subtitle || "Multi-disciplinary expertise uniting renewable techno-economic modeling, dynamic state-space simulation, thermodynamic system analysis, and edge data acquisition."}
            </p>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Skills
            </button>
            {skillGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveCategory(group.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === group.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {group.category.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGroups.map((group, idx) => {
            const Icon = getCategoryIcon(idx);
            
            return (
              <motion.div
                layout
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {group.category}
                    </h3>
                  </div>
                </div>
                
                {group.description && (
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed flex-grow">
                    {group.description}
                  </p>
                )}

                {/* Skills List */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.skills.map((skill, sIdx) => (
                    <div 
                       key={sIdx} 
                       className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        skill.highlight
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
"""

with open('src/components/CapabilitiesSection.tsx', 'w') as f:
    f.write(new_content)
