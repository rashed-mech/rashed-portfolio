import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# Replace React imports to include useState
content = content.replace("import React from 'react';", "import React, { useState } from 'react';")
content = content.replace("import { Code2, Github, ExternalLink, Activity, ArrowRight, Cpu, Layers } from 'lucide-react';", 
                          "import { Code2, Github, ExternalLink, Activity, ArrowRight, Cpu, Layers, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';")

# Add utility for formatting imageUrl if it exists in the codebase, else we might not need it
# In TrainingSection, formatImageUrl is used. Let's import it from '../utils/format' or define it inline.
content = content.replace("import { Project } from '../types';", "import { Project } from '../types';\nimport { formatImageUrl } from '../utils/format';")

# Define state inside the component
state_code = """
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  
  if (!projects || projects.length === 0) return null;
"""
content = content.replace("  if (!projects || projects.length === 0) return null;", state_code)

# Add onClick and cursor-pointer to the project card
card_orig = 'className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"'
card_new = 'className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50 cursor-pointer"\n              onClick={() => setSelectedProjectIdx(idx)}'

content = content.replace(card_orig, card_new)
content = content.replace("projects.map((project) => (", "projects.map((project, idx) => (")

# Now append the modal before the closing </section>
modal_code = """
      {/* Project Preview Modal */}
      {selectedProjectIdx !== null && projects[selectedProjectIdx] && (
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
                {projects[selectedProjectIdx].title}
              </h3>
              <p className="text-sm text-gray-700 mt-1 font-mono">
                {projects[selectedProjectIdx].category} {projects[selectedProjectIdx].date && `• ${projects[selectedProjectIdx].date}`}
              </p>
            </div>

            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {projects.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(prev => (prev! - 1 + projects.length) % projects.length);
                    }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(prev => (prev! + 1) % projects.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {projects[selectedProjectIdx].imageUrl ? (
                <img 
                  key={projects[selectedProjectIdx].imageUrl}
                  src={formatImageUrl(projects[selectedProjectIdx].imageUrl!)} 
                  alt={projects[selectedProjectIdx].title} 
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
                {projects.length > 1 && (
                  <div className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {selectedProjectIdx + 1} / {projects.length}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {projects[selectedProjectIdx].githubUrl && (
                  <a
                    href={projects[selectedProjectIdx].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-gray-900 bg-white hover:bg-gray-50 border border-slate-200 transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4 text-gray-700" />
                    <span>View Code</span>
                  </a>
                )}
                {projects[selectedProjectIdx].liveUrl && (
                  <a 
                    href={projects[selectedProjectIdx].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto text-center inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20 active:scale-95"
                  >
                    Live Preview <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("    </section>\n  );\n};", modal_code + "    </section>\n  );\n};")

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
