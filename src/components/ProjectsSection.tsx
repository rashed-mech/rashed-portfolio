import { motion } from 'motion/react';
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
  const [autoSlideIdx, setAutoSlideIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAutoSlideIdx(prev => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  
  if (!projects || projects.length === 0) return null;

  const selectedProject = selectedProjectIdx !== null ? projects[selectedProjectIdx] : null;
  const projectImages = selectedProject 
    ? [
        ...(selectedProject.imageUrl ? [selectedProject.imageUrl] : []),
        ...(selectedProject.images || [])
      ]
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">{config?.title ?? "Undergraduate Engineering & Mechanical Design Projects"}</h2>
          {(config?.subtitle ?? "Mechanical system design, SolidWorks CAD modeling, high gear ratio transmission kinematics, and assistive electro-mechanical solutions.") && (
            <p className="text-sm sm:text-base text-black font-light leading-relaxed w-full max-w-full text-justify">{config?.subtitle ?? "Mechanical system design, SolidWorks CAD modeling, high gear ratio transmission kinematics, and assistive electro-mechanical solutions."}</p>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const cardImages = [
              ...(project.imageUrl ? [project.imageUrl] : []),
              ...(project.images || [])
            ];
            
            return (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
              id={`project-card-${project.id}`}
            >
              <div className="space-y-4">
                {cardImages.length > 0 && (
                  <div 
                    className="w-full h-48 -mt-2 mb-4 rounded-xl overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200/60 shadow-inner group-hover:shadow-md transition-all cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(idx);
                      setSelectedSlideIdx(autoSlideIdx % cardImages.length);
                    }}
                  >
                    <div 
                      className="flex h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                      style={{ transform: `translateX(-${(autoSlideIdx % cardImages.length) * 100}%)` }}
                    >
                      {cardImages.map((img, i) => (
                        <div 
                          key={img}
                          className="w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${formatImageUrl(img)})` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {/* Header: Title & Date */}
                <div className="flex items-start justify-between gap-3">
                  <h3 
                    className="text-base sm:text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors leading-snug cursor-pointer underline decoration-indigo-300 underline-offset-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(idx);
                      setSelectedSlideIdx(0);
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="text-black font-mono text-[11px] shrink-0 mt-1.5">{project.date}</span>
                  )}
                </div>
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-black font-light leading-relaxed text-justify">
                  {project.description}
                </p>
                {project.fullDescription && (
                  <p className="text-xs text-black font-light italic border-l-2 border-indigo-200 pl-2.5 text-justify">
                    {project.fullDescription}
                  </p>
                )}
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-black border border-slate-200"
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
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-black bg-white hover:bg-white/60 backdrop-blur-md border border-slate-200 hover:border-indigo-200 transition-colors shadow-sm"
                    >
                      <Github className="w-3.5 h-3.5 text-black" />
                      <span>Code Repository</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )})}
        </div>
      </motion.div>

      {/* Project Preview Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProjectIdx(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProjectIdx(null)}
              className="absolute top-4 right-4 p-2 text-black hover:text-black hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {selectedProject.title}
              </h3>
              {selectedProject.date && (
                <p className="text-sm text-black mt-1 font-mono text-justify">
                  {selectedProject.date}
                </p>
              )}
            </div>

            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {projectImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev - 1 + projectImages.length) % projectImages.length);
                    }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev + 1) % projectImages.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                  title="Click to view full size in new tab"
                  onClick={() => window.open(formatImageUrl(projectImages[selectedSlideIdx]), '_blank')}
                />
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-black space-y-3">
                  <ImageIcon className="w-16 h-16 opacity-20" />
                  <p className="text-sm font-medium text-justify">No project image available</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedProjectIdx(null)}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-black transition-colors"
                >
                  Close
                </button>
                {projectImages.length > 1 && (
                  <div className="text-xs font-mono text-black bg-slate-100 px-3 py-1.5 rounded-full">
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
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-black bg-white hover:bg-gray-50 border border-slate-200 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4 text-black" />
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
