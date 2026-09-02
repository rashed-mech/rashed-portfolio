import re

with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

# Make sure we have the Radio icon imported
if "Radio" not in content:
    content = content.replace("Award,", "Award,\n  Radio,")

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
      className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 transition-all flex flex-col h-full min-h-[340px] group/card shadow-sm shadow-slate-200/50 hover:border-indigo-400 cursor-pointer"
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

      <div className="relative z-10 flex flex-col h-full opacity-100 justify-between">
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
        </div>

        {tr.description && (
          <div className="mt-auto pt-6 w-full pointer-events-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-stretch bg-slate-100 border border-slate-200 rounded-lg overflow-hidden shadow-sm h-8 relative group/ticker">
              <div className="bg-red-600 text-white flex items-center px-3 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.1)] shrink-0">
                <Radio className="w-4 h-4 mr-1.5" />
                <span className="text-xs font-bold whitespace-nowrap">Course Outline</span>
              </div>
              <div className="flex-1 overflow-hidden relative flex items-center">
                <div 
                  className="ticker absolute whitespace-nowrap text-[11px] text-slate-700 font-medium tracking-wide"
                  style={{ animationDuration: `${tr.tickerSpeed || 15}s` }}
                  title="Hover to pause"
                >
                  {tr.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
"""

content = re.sub(r'const TrainingCard: React\.FC<.*?};', training_card_code, content, flags=re.DOTALL)

with open('src/components/TrainingSection.tsx', 'w') as f:
    f.write(content)
