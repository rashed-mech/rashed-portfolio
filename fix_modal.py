import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# I will just write a new component entirely to avoid regex issues
new_component = """import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Code2, Github, ExternalLink, Activity, ArrowRight, Cpu, Layers, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';
import { formatImageUrl } from '../utils/formatUrl';

interface ProjectsSectionProps {
  config?: { title: string; subtitle: string };
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, config }) => {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);
  
  if (!projects || projects.length === 0) return null;

  const selectedProject = selectedProjectIdx !== null ? projects[selectedProjectIdx] : null;
  const projectImages = selectedProject 
    ? (selectedProject.images && selectedProject.images.length > 0 
        ? selectedProject.images 
        : (selectedProject.imageUrl ? [selectedProject.imageUrl] : []))
    : [];

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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">{config?.title || "Undergraduate Engineering & Mechanical Design Projects"}</h2>
          <p className="text-sm sm:text-base text-gray-800 font-light leading-relaxed w-full max-w-full text-justify ">{config?.subtitle || "Mechanical system design, SolidWorks CAD modeling, high gear ratio transmission kinematics, and assistive electro-mechanical solutions."}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50 cursor-pointer"
              id={`project-card-${project.id}`}
              onClick={() => {
                setSelectedProjectIdx(idx);
                setSelectedSlideIdx(0);
              }}
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
                    <div
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-900 bg-white hover:bg-white/60 backdrop-blur-md border border-slate-200 hover:border-indigo-200 transition-colors shadow-sm"
                    >
                      <Github className="w-3.5 h-3.5 text-gray-700" />
                      <span>Code Repository</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Preview Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProjectIdx(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProjectIdx(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-gray-900 hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-gray-700 mt-1 font-mono">
                {selectedProject.category} {selectedProject.date && `• ${selectedProject.date}`}
              </p>
            </div>

            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {projectImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev - 1 + projectImages.length) % projectImages.length);
                    }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev + 1) % projectImages.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {projectImages.length > 0 ? (
                <img 
                  key={projectImages[selectedSlideIdx]}
                  src={formatImageUrl(projectImages[selectedSlideIdx])} 
                  alt={`${selectedProject.title} preview`} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
                />
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <ImageIcon className="w-16 h-16 opacity-20" />
                  <p className="text-sm font-medium">No project image available</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedProjectIdx(null)}
                  className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-black transition-colors"
                >
                  Close
                </button>
                {projectImages.length > 1 && (
                  <div className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {selectedSlideIdx + 1} / {projectImages.length}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-gray-900 bg-white hover:bg-gray-50 border border-slate-200 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4 text-gray-700" />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
"""

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(new_component)
