const fs = require('fs');
let content = fs.readFileSync('src/components/TrainingSection.tsx', 'utf-8');

// Add ChevronLeft, ChevronRight
if (!content.includes('ChevronLeft')) {
  content = content.replace("X\n}", "X,\n  ChevronLeft,\n  ChevronRight\n}");
}

// Modify CertificationCard prop
content = content.replace(
  "const CertificationCard: React.FC<{ cert: Certification; onClickTitle: (slide: any) => void }> = ({ cert, onClickTitle }) => {",
  "const CertificationCard: React.FC<{ cert: Certification; onClickTitle: (cert: Certification, slideIdx: number) => void }> = ({ cert, onClickTitle }) => {"
);

// Modify background image onClick
const oldBg = `{hasBg && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover/card:scale-105 opacity-[0.85]"
          style={{ backgroundImage: \`url(\${currentSlideObj?.imageUrl})\` }}
        />
      )}`;
const newBg = `{hasBg && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover/card:scale-105 opacity-[0.85] cursor-pointer"
          style={{ backgroundImage: \`url(\${currentSlideObj?.imageUrl})\` }}
          onClick={() => onClickTitle(cert, currentSlide)}
        />
      )}`;
content = content.replace(oldBg, newBg);

// Modify title button onClick
content = content.replace(
  `                  <button 
                    onClick={() => onClickTitle(slides[idx])} 
                    className="text-left focus:outline-none block"
                  >`,
  `                  <button 
                    onClick={() => onClickTitle(cert, idx)} 
                    className="text-left focus:outline-none block"
                  >`
);

// State replacement in TrainingSection
const oldState = "const [selectedCert, setSelectedCert] = useState<any>(null); // Uses slide object {title, imageUrl, credentialUrl, issuer, year}";
const newState = `const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState<number>(0);
  
  const modalSlides = selectedCert ? [
    { title: selectedCert.title, imageUrl: selectedCert.imageUrl, credentialUrl: selectedCert.credentialUrl },
    ...(selectedCert.modules || [])
  ] : [];
  const currentModalObj = modalSlides[selectedSlideIdx];`;
content = content.replace(oldState, newState);

// Update onClickTitle in TrainingSection
content = content.replace(
  `onClickTitle={(slide) => setSelectedCert({ ...slide, issuer: cert.issuer, year: cert.year })}`,
  `onClickTitle={(certObj, idx) => {
                    setSelectedCert(certObj);
                    setSelectedSlideIdx(idx);
                  }}`
);

// Update Modal rendering
const modalStart = `{selectedCert && (`;
const idx = content.indexOf(modalStart);
if (idx !== -1) {
  content = content.substring(0, idx);
}

const newModalStr = `{selectedCert && currentModalObj && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {currentModalObj.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 font-mono">
                {selectedCert.issuer} • {selectedCert.year}
              </p>
            </div>

            <div className="mt-6 flex-1 min-h-0 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-center relative group/modal">
              {modalSlides.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev - 1 + modalSlides.length) % modalSlides.length);
                    }}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Certificate"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev + 1) % modalSlides.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Certificate"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {currentModalObj.imageUrl ? (
                <img 
                  key={currentModalObj.imageUrl}
                  src={currentModalObj.imageUrl} 
                  alt={currentModalObj.title} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
                />
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <Award className="w-16 h-16 opacity-20" />
                  <p className="text-sm font-medium">No certificate image available</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>
                {modalSlides.length > 1 && (
                  <div className="text-xs font-mono text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {selectedSlideIdx + 1} / {modalSlides.length}
                  </div>
                )}
              </div>
              
              {currentModalObj.credentialUrl ? (
                <a 
                  href={currentModalObj.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto text-center inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20 active:scale-95"
                >
                  Verify Credential <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">No external verification link</span>
              )}
            </div>
          </div>
        </div>
      )}`;

content = content + newModalStr;
fs.writeFileSync('src/components/TrainingSection.tsx', content);
