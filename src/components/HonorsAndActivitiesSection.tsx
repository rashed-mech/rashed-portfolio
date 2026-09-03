import { motion } from 'motion/react';
import React from 'react';
import { 
  Trophy, 
  Users, 
  HeartHandshake, 
  UserCheck, 
  Mail, 
  Phone, 
  Building,
  GraduationCap,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Achievement, Affiliation, VolunteerExperience, Reference } from '../types';

interface HonorsAndActivitiesSectionProps {
  config?: { title: string; subtitle: string };
  achievements?: Achievement[];
  affiliations?: Affiliation[];
  volunteerWork?: VolunteerExperience[];
  references?: Reference[];
}

export const HonorsAndActivitiesSection: React.FC<HonorsAndActivitiesSectionProps> = ({
  achievements = [],
  affiliations = [],
  volunteerWork = [],
  references = [],
  config
}) => {
  const visibleReferences = references.filter(ref => ref.isLive !== false);

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200" id="honors-activities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">{config?.title ?? "Honors, Co-Curricular Leadership & Academic References"}</h2>
          {(config?.subtitle ?? "Competitive olympiad awards, university organization leadership, disaster relief volunteering, and academic thesis references.") && (
            <p className="text-sm sm:text-base text-black font-light leading-relaxed w-full max-w-full text-justify">{config?.subtitle ?? "Competitive olympiad awards, university organization leadership, disaster relief volunteering, and academic thesis references."}</p>
          )}
        </div>

        <div className="space-y-8">
          
          {/* Top Row: Achievements (Left) and Affiliations (Right) */}
          {(achievements.length > 0 || affiliations.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Achievements */}
              {achievements.length > 0 && (
                <div className={`space-y-6 ${affiliations.length > 0 ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                    <Trophy className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-mono tracking-wider text-black uppercase font-semibold">
                      ACHIEVEMENTS & AWARDS
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-5 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-2 group shadow-sm shadow-slate-200/50"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {ach.year}
                            </span>
                            {ach.category && (
                              <span className="text-[10px] font-mono text-black">
                                {ach.category}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-black group-hover:text-indigo-600 transition-colors leading-snug">
                            {ach.title}
                          </h4>
                          {ach.organization && (
                            <div className="text-xs font-mono text-black">
                              {ach.organization}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right Column: Affiliations */}
              {affiliations.length > 0 && (
                <div className={`space-y-4 ${achievements.length > 0 ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-mono tracking-wider text-black uppercase font-semibold">
                      PROFESSIONAL AFFILIATIONS & ACTIVITIES
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {affiliations.map((aff) => (
                      <div
                        key={aff.id}
                        className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group shadow-sm shadow-slate-200/50 h-full"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-black group-hover:text-indigo-600 transition-colors">
                            {aff.organization}
                          </h4>
                          <div className="text-xs font-mono text-black">
                            Role: <span className="text-indigo-600 font-medium">{aff.role}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-white/60 backdrop-blur-md border border-slate-200 text-[11px] font-mono text-black shrink-0 ml-2">
                          {aff.period}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Width Row: Volunteer Experiences */}
          {volunteerWork.filter(v => v.isLive !== false).length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                <HeartHandshake className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-mono tracking-wider text-black uppercase font-semibold">
                  VOLUNTEER EXPERIENCES
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {volunteerWork.filter(v => v.isLive !== false).map((vol) => (
                  <div
                    key={vol.id}
                    className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all space-y-1.5 group shadow-sm shadow-slate-200/50"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-black group-hover:text-indigo-600 transition-colors">
                        {vol.title || vol.role}
                      </h4>
                      {vol.period && (
                        <span className="text-[11px] font-mono text-black ml-2 shrink-0">
                          {vol.period}
                        </span>
                      )}
                    </div>
                    {(vol.organization || (!vol.title && vol.role)) && (
                      <div className="text-xs font-mono text-black">
                        {vol.organization}
                      </div>
                    )}
                    {vol.description && (
                      <p className="text-xs text-black font-light pt-1 text-justify">
                        {vol.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Width Row: References */}
          {visibleReferences.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-mono tracking-wider text-black uppercase font-semibold">
                  ACADEMIC & PROFESSIONAL REFERENCES
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleReferences.map((ref) => (
                  <div key={ref.id} className="p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all shadow-sm shadow-slate-200/50 flex flex-col space-y-3">
                    <h4 className="text-base font-bold text-black">
                      {ref.website ? (
                        <a href={ref.website} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                          {ref.name}
                        </a>
                      ) : (
                        ref.name
                      )}
                    </h4>
                    
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wide">
                        {ref.designation || ref.role}
                      </div>
                      {ref.department && (
                        <div className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wide">
                          {ref.department}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-black font-medium">{ref.institution || ref.organization}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
