import re

with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

# Fix imports
content = content.replace(
    "import React from 'react';",
    "import React, { useState } from 'react';"
)
content = content.replace(
    "  BookOpen\n} from 'lucide-react';",
    "  BookOpen,\n  X,\n  ChevronLeft,\n  ChevronRight\n} from 'lucide-react';"
)

# Insert State inside component
state_code = """
  const [selectedPillarIdx, setSelectedPillarIdx] = useState<number | null>(null);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);
  
  const selectedPillar = selectedPillarIdx !== null ? pillars[selectedPillarIdx] : null;
  const modalSlides = selectedPillar?.galleryUrls || [];

  const handlePillarClick = (idx: number) => {
    if (pillars[idx].galleryUrls && pillars[idx].galleryUrls.length > 0) {
      setSelectedPillarIdx(idx);
      setSelectedSlideIdx(0);
    }
  };
"""

content = content.replace(
    "  const metrics = data?.metrics?.length ? data.metrics : fallbackMetrics;",
    "  const metrics = data?.metrics?.length ? data.metrics : fallbackMetrics;\n" + state_code
)

# Make pillar cards clickable
card_code_find = """              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col group shadow-sm shadow-slate-200/50\""""

card_code_repl = """              <div 
                key={idx}
                onClick={() => handlePillarClick(idx)}
                className={`p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border transition-all flex flex-col group shadow-sm shadow-slate-200/50 ${pillar.galleryUrls && pillar.galleryUrls.length > 0 ? 'hover:border-indigo-400 cursor-pointer border-slate-200' : 'border-slate-200 hover:border-indigo-300'}`}"""

content = content.replace(card_code_find, card_code_repl)

# Add Modal at the end of the section
modal_code = """        </div>
      </motion.div>

      {/* Gallery Modal */}
      {selectedPillar && modalSlides.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPillarIdx(null)}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans">
                  {selectedPillar.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{selectedPillar.tag}</p>
              </div>
              <button 
                onClick={() => setSelectedPillarIdx(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Image Viewer */}
            <div className="flex-1 min-h-0 bg-slate-50/50 p-4 sm:p-6 flex items-center justify-center relative group/modal overflow-hidden">
              {modalSlides.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedSlideIdx(prev => (prev - 1 + modalSlides.length) % modalSlides.length); }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedSlideIdx(prev => (prev + 1) % modalSlides.length); }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}
              
              <div className="relative w-full h-[40vh] sm:h-[60vh] flex items-center justify-center">
                <img 
                  key={modalSlides[selectedSlideIdx]}
                  src={modalSlides[selectedSlideIdx].startsWith('http') || modalSlides[selectedSlideIdx].startsWith('data:') ? modalSlides[selectedSlideIdx] : `https://${modalSlides[selectedSlideIdx]}`} 
                  alt={`${selectedPillar.title} - view ${selectedSlideIdx + 1}`} 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>
            
            {/* Footer / Controls */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-center bg-white">
              {modalSlides.length > 1 && (
                <div className="flex items-center gap-2">
                  {modalSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlideIdx(idx)}
                      className={`transition-all rounded-full ${idx === selectedSlideIdx ? 'w-6 h-2 bg-indigo-600' : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>"""

content = content.replace("        </div>\n      </motion.div>\n    </section>", modal_code)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)

