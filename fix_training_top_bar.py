import re

with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

# Let's target the inner div of the card
old_structure = """      <div className="relative z-10 flex flex-col h-full opacity-100 justify-between">
        <div className="w-full flex-1 flex flex-col items-center justify-center pointer-events-none mt-2">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm shadow-black/5 border border-white/60 pointer-events-auto w-full flex flex-col items-center text-center">
            
            <div className="w-12 h-12 mb-3 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm shadow-black/5">
              <Award className="w-6 h-6" />
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); onClickTitle(tr, currentSlide); }} 
              className="focus:outline-none block mb-2"
            >
              <h4 className="text-base sm:text-lg font-bold text-black group-hover/card:text-indigo-600 transition-colors leading-snug hover:underline cursor-pointer">
                {tr.title}
              </h4>
            </button>
            <div className="text-sm font-mono text-slate-600 mb-3">
              {tr.issuer}
            </div>
            <div className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 rounded-full bg-indigo-50/90 backdrop-blur-sm border border-indigo-200/80 text-xs font-mono font-semibold text-indigo-700 shadow-sm shadow-black/5">
                {tr.year}
              </span>
            </div>
            
            {totalSlides > 1 && (
              <div className="flex items-center space-x-1.5 bg-slate-100/50 px-3 py-2 rounded-full mt-2" onClick={e => e.stopPropagation()}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-5 bg-indigo-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                    title={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>"""

new_structure = """      <div className="relative z-10 flex flex-col h-full opacity-100 justify-between">
        
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover/card:bg-white transition-colors shadow-sm shadow-black/5">
            <Award className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-indigo-50/90 backdrop-blur-sm border border-indigo-200/80 text-[11px] font-mono font-semibold text-indigo-700 shadow-sm shadow-black/5">
              {tr.year}
            </span>
            {totalSlides > 1 && (
              <div className="flex items-center space-x-1.5 bg-white/50 px-2 py-1.5 rounded-full backdrop-blur-sm" onClick={e => e.stopPropagation()}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-4 bg-indigo-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                    title={`View image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col items-center justify-center pointer-events-none mt-2">
          <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm shadow-black/5 border border-white/60 pointer-events-auto w-full flex flex-col items-center text-center">
            <button 
              onClick={(e) => { e.stopPropagation(); onClickTitle(tr, currentSlide); }} 
              className="focus:outline-none block mb-1"
            >
              <h4 className="text-base sm:text-lg font-bold text-black group-hover/card:text-indigo-600 transition-colors leading-snug hover:underline cursor-pointer">
                {tr.title}
              </h4>
            </button>
            <div className="text-sm font-mono text-slate-600">
              {tr.issuer}
            </div>
          </div>
        </div>"""

if old_structure in content:
    content = content.replace(old_structure, new_structure)
    with open('src/components/TrainingSection.tsx', 'w') as f:
        f.write(content)
    print("Successfully replaced.")
else:
    print("Could not find the old structure block!")
