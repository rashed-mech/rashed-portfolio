import re

with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

# Add selectedTraining state
content = content.replace(
    "  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);",
    "  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);\n  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);"
)

# Update the trainings card mapping to make it clickable
training_card_find = """              {trainings.map((tr) => (
                <div
                  key={tr.id}
                  className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
                >"""

training_card_repl = """              {trainings.map((tr) => (
                <div
                  key={tr.id}
                  onClick={() => { if (tr.galleryUrls && tr.galleryUrls.length > 0) { setSelectedTraining(tr); setSelectedSlideIdx(0); } }}
                  className={`p-6 rounded-2xl bg-white/85 backdrop-blur-md border transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50 ${tr.galleryUrls && tr.galleryUrls.length > 0 ? 'hover:border-indigo-400 cursor-pointer border-slate-200' : 'border-slate-200 hover:border-indigo-300'}`}
                >"""
content = content.replace(training_card_find, training_card_repl)

# Add Training Modal at the end, just before the closing </section>
training_modal = """
      {/* Training Preview Modal */}
      {selectedTraining && selectedTraining.galleryUrls && selectedTraining.galleryUrls.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTraining(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedTraining(null)}
              className="absolute top-4 right-4 p-2 text-black hover:text-black hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {selectedTraining.title}
              </h3>
              <p className="text-sm text-black mt-1 font-mono text-justify">
                {selectedTraining.issuer} • {selectedTraining.year}
              </p>
            </div>

            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {selectedTraining.galleryUrls.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev - 1 + selectedTraining.galleryUrls!.length) % selectedTraining.galleryUrls!.length);
                    }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev + 1) % selectedTraining.galleryUrls!.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-black hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              <img 
                key={selectedTraining.galleryUrls[selectedSlideIdx]}
                src={formatImageUrl(selectedTraining.galleryUrls[selectedSlideIdx])} 
                alt={selectedTraining.title} 
                className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                title="Click to view full size in new tab"
                onClick={() => window.open(formatImageUrl(selectedTraining.galleryUrls![selectedSlideIdx]), '_blank')}
              />
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedTraining(null)}
                  className="px-4 py-2 text-sm font-semibold text-black hover:text-black transition-colors"
                >
                  Close
                </button>
                {selectedTraining.galleryUrls.length > 1 && (
                  <div className="text-xs font-mono text-black bg-slate-100 px-3 py-1.5 rounded-full">
                    {selectedSlideIdx + 1} / {selectedTraining.galleryUrls.length}
                  </div>
                )}
              </div>
              
              {selectedTraining.credentialUrl && (
                <a 
                  href={selectedTraining.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto text-center inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20 active:scale-95"
                >
                  Verify Credential <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
"""

content = content.replace("    </section>", training_modal)

with open('src/components/TrainingSection.tsx', 'w') as f:
    f.write(content)
