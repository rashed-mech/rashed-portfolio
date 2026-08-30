import { motion } from 'motion/react';
import React from 'react';
import { Code2, Github, ExternalLink, Activity, ArrowRight, Cpu, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200" id="projects">
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
            Undergraduate Engineering & Mechanical Design Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-light max-w-2xl leading-relaxed">
            Mechanical system design, SolidWorks CAD modeling, high gear ratio transmission kinematics, and assistive electro-mechanical solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
              id={`project-card-${project.id}`}
            >
              <div className="space-y-4">
                {/* Header: Category & Date */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {project.category}
                  </span>
                  {project.date && (
                    <span className="text-gray-700 font-mono text-[11px]">{project.date}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-indigo-600 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-800 font-light leading-relaxed">
                  {project.description}
                </p>

                {project.fullDescription && (
                  <p className="text-xs text-gray-700 font-light italic border-l-2 border-indigo-200 pl-2.5">
                    {project.fullDescription}
                  </p>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-gray-800 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="flex items-center space-x-3 pt-5 mt-4 border-t border-slate-100">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-900 bg-white hover:bg-white/60 backdrop-blur-md border border-slate-200 hover:border-indigo-200 transition-colors shadow-sm"
                    >
                      <Github className="w-3.5 h-3.5 text-gray-700" />
                      <span>Code Repository</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-indigo-600 hover:underline transition-colors ml-auto"
                    >
                      <span>Live Suite</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

