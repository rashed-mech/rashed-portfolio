import re

with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

training_card_code = """
const TrainingCard: React.FC<{ tr: Training; onClickTitle: (tr: Training, slideIdx: number) => void }> = ({ tr, onClickTitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = tr.galleryUrls || [];
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(p => (p + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div 
      className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 transition-all flex flex-col h-full min-h-[300px] group/card shadow-sm shadow-slate-200/50 hover:border-indigo-400 cursor-pointer"
      onClick={() => onClickTitle(tr, currentSlide)}
    >
      <div className="absolute inset-0 z-0 bg-white/85 backdrop-blur-md" />

      {totalSlides > 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out group-hover/card:scale-105"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((url, idx) => (
              <div 
                key={idx}
                className="w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat opacity-[0.85]"
                style={{ backgroundImage: `url(${formatImageUrl(url)})` }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full opacity-100">
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

        <div className="relative overflow-hidden w-full flex-1 pointer-events-none">
          <div className="w-full flex-shrink-0 flex flex-col items-start mt-2">
            <div className="inline-block bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm shadow-black/5 border border-white/60 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); onClickTitle(tr, currentSlide); }} 
                className="text-left focus:outline-none block"
              >
                <h4 className="text-sm sm:text-base font-bold text-black group-hover/card:text-indigo-600 transition-colors leading-snug hover:underline cursor-pointer">
                  {tr.title}
                </h4>
              </button>
              <div className="text-xs font-mono text-black mt-1.5">
                {tr.issuer}
              </div>
              {tr.description && (
                <p className="text-xs text-black font-light leading-relaxed mt-2 line-clamp-3">
                  {tr.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
"""

content = content.replace(
    "const CertificationCard: React.FC",
    training_card_code + "\nconst CertificationCard: React.FC"
)

# Now find the mapping loop for trainings
training_grid_regex = re.compile(
    r'<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{trainings\.map\(\(tr\) => \(\s*<div\s*key=\{tr\.id\}.*?</div>\s*</div>\s*\)\)\}\s*</div>',
    re.DOTALL
)

replacement_grid = """<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {trainings.map((tr) => (
                <TrainingCard 
                  key={tr.id}
                  tr={tr}
                  onClickTitle={(trObj, idx) => {
                    if (trObj.galleryUrls && trObj.galleryUrls.length > 0) {
                      setSelectedTraining(trObj);
                      setSelectedSlideIdx(idx);
                    }
                  }}
                />
              ))}
            </div>"""

if training_grid_regex.search(content):
    content = training_grid_regex.sub(replacement_grid, content)
else:
    print("Could not find the trainings.map section!")

# Now let's fix the two modals so the images do not collapse
# 1. Certificate preview modal
modal1_find = """            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {modalSlides.length > 1 && ("""

modal1_repl = """            <div className="mt-6 relative w-full h-[50vh] sm:h-[70vh] rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center group/modal overflow-hidden">
              {modalSlides.length > 1 && ("""
content = content.replace(modal1_find, modal1_repl)

modal1_img_find = """                <img 
                  key={currentModalObj.imageUrl}
                  src={formatImageUrl(currentModalObj.imageUrl)} 
                  alt={currentModalObj.title} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                  title="Click to view full size in new tab"
                  onClick={() => window.open(formatImageUrl(currentModalObj.imageUrl), '_blank')}
                />"""
                
modal1_img_repl = """                <img 
                  key={currentModalObj.imageUrl}
                  src={formatImageUrl(currentModalObj.imageUrl)} 
                  alt={currentModalObj.title} 
                  className="max-w-full max-h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                  title="Click to view full size in new tab"
                  onClick={() => window.open(formatImageUrl(currentModalObj.imageUrl), '_blank')}
                />"""
content = content.replace(modal1_img_find, modal1_img_repl)

# 2. Training preview modal
modal2_find = """            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {selectedTraining.galleryUrls.length > 1 && ("""

modal2_repl = """            <div className="mt-6 relative w-full h-[50vh] sm:h-[70vh] rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center group/modal overflow-hidden">
              {selectedTraining.galleryUrls.length > 1 && ("""
content = content.replace(modal2_find, modal2_repl)

modal2_img_find = """              <img 
                key={selectedTraining.galleryUrls[selectedSlideIdx]}
                src={formatImageUrl(selectedTraining.galleryUrls[selectedSlideIdx])} 
                alt={selectedTraining.title} 
                className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                title="Click to view full size in new tab"
                onClick={() => window.open(formatImageUrl(selectedTraining.galleryUrls![selectedSlideIdx]), '_blank')}
              />"""

modal2_img_repl = """              <img 
                key={selectedTraining.galleryUrls[selectedSlideIdx]}
                src={formatImageUrl(selectedTraining.galleryUrls[selectedSlideIdx])} 
                alt={selectedTraining.title} 
                className="max-w-full max-h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                title="Click to view full size in new tab"
                onClick={() => window.open(formatImageUrl(selectedTraining.galleryUrls![selectedSlideIdx]), '_blank')}
              />"""
content = content.replace(modal2_img_find, modal2_img_repl)

with open('src/components/TrainingSection.tsx', 'w') as f:
    f.write(content)
