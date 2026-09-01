import { motion } from 'motion/react';
import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Award,
  ChevronRight
} from 'lucide-react';
import { Experience, Education } from '../types';

interface ExperienceSectionProps {
  config?: { title: string; subtitle: string };
  experience: Experience[];
  education: Education[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  education,
  config
}) => {
  return (
    <section className="py-12 sm:py-16 border-t border-slate-200" id="experience">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">{config?.title ?? "Relevant Experiences & Education"}</h2>
          {(config?.subtitle ?? "Hands-on technical appointments, mechanical systems optimization, field coaching, and mechanical engineering degree.") && (
            <p className="text-sm sm:text-base text-gray-800 font-light leading-relaxed w-full max-w-full text-justify ">{config?.subtitle ?? "Hands-on technical appointments, mechanical systems optimization, field coaching, and mechanical engineering degree."}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Relevant Experiences */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-mono tracking-wider text-gray-900 uppercase font-semibold">
                RELEVANT EXPERIENCES
              </h3>
            </div>

            <div className="space-y-5">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all space-y-3 relative group shadow-sm shadow-slate-200/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-black group-hover:text-indigo-600 transition-colors">
                        {exp.role}
                      </h4>
                      <div className="text-xs font-mono text-gray-700 mt-0.5">
                        {exp.organization}
                      </div>
                    </div>
                    
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-mono text-indigo-700">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.period}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-mono text-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exp.location}</span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-gray-800 font-light leading-relaxed">
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start space-x-2 text-xs text-gray-800 font-light">
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-mono tracking-wider text-gray-900 uppercase font-semibold">
                EDUCATION
              </h3>
            </div>

            <div className="space-y-5">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all space-y-3 shadow-sm shadow-slate-200/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-black">
                      {edu.degree}
                    </h4>
                    <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 text-[11px] font-mono text-indigo-700 shrink-0">
                      {edu.year}
                    </span>
                  </div>

                  <div className="text-xs text-gray-800 font-medium">
                    {edu.institution}
                  </div>

                  {edu.location && (
                    <div className="flex items-center space-x-1.5 text-xs font-mono text-gray-700">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{edu.location}</span>
                    </div>
                  )}

                  {edu.result && (
                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <Award className="w-3.5 h-3.5" />
                      <span>{edu.result}</span>
                    </div>
                  )}

                  {edu.thesis && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">
                        Dissertation / Thesis:
                      </span>
                      <p className="font-light italic text-gray-900">
                        {edu.thesis}
                      </p>
                    </div>
                  )}

                  {edu.coursework && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-gray-700 block text-[10px] uppercase tracking-wider">
                        Relevant Coursework:
                      </span>
                      <p className="font-light text-gray-800">
                        {edu.coursework}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
};
