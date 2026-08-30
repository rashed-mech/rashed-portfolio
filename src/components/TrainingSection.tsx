import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { 
  Award, 
  MapPin,
  ShieldCheck,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Training, Certification } from '../types';
import { formatImageUrl } from '../utils/formatUrl';

interface TrainingSectionProps {
  trainings?: Training[];
  certifications?: Certification[];
}

const CertificationCard: React.FC<{ cert: Certification; onClickTitle: (cert: Certification, slideIdx: number) => void }> = ({ cert, onClickTitle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { title: cert.title, imageUrl: cert.imageUrl, credentialUrl: cert.credentialUrl },
    ...(cert.modules || [])
  ];
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(p => (p + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const currentSlideObj = slides[currentSlide] || slides[0];

  return (
    <div 
      className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col h-full min-h-[300px] group/card shadow-sm shadow-slate-200/50"
    >
      {/* Base Background for all cards */}
      <div className="absolute inset-0 z-0 bg-white/85 backdrop-blur-md" />

      {/* Background Image Layer (Sliding) */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden cursor-pointer"
        onClick={() => onClickTitle(cert, currentSlide)}
      >
        <div 
          className="flex h-full transition-transform duration-500 ease-in-out group-hover/card:scale-105"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slideObj, idx) => (
            <div 
              key={idx}
              className="w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat opacity-[0.85]"
              style={slideObj.imageUrl ? { backgroundImage: `url(${formatImageUrl(slideObj.imageUrl)})` } : {}}
            />
          ))}
        </div>
      </div>

      {/* Content Layer (z-10) */}
      <div className="relative z-10 flex flex-col h-full opacity-100">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-50/90 text-indigo-700 border border-indigo-200/80">
            {cert.year}
          </span>
          {totalSlides > 1 && (
            <div className="flex items-center space-x-1.5 bg-white/50 px-2 py-1 rounded-full backdrop-blur-sm">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-4 bg-indigo-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                  title={slides[idx]}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative overflow-hidden w-full flex-1">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slideObj, idx) => (
              <div key={idx} className="w-full flex-shrink-0 flex flex-col min-h-[50px] items-start">
                <div className="inline-block bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-white/40">
                  <button 
                    onClick={() => onClickTitle(cert, idx)} 
                    className="text-left focus:outline-none block"
                  >
                    <h4 className="text-sm font-bold text-black group-hover/card:text-indigo-600 transition-colors leading-snug hover:underline cursor-pointer">
                      {slideObj.title}
                    </h4>
                  </button>
                  <div className="text-xs font-mono text-gray-800 mt-1">
                    {cert.issuer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-col space-y-3 shrink-0">
          {cert.modules && cert.modules.length > 0 && (
            <div className="pt-3 flex flex-wrap gap-1.5 border-t border-slate-200/60">
              {cert.modules.map((m, mIdx) => {
                const isActive = currentSlide === mIdx + 1;
                return (
                  <button
                    key={mIdx}
                    onClick={() => setCurrentSlide(mIdx + 1)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors duration-300 border focus:outline-none cursor-pointer hover:border-indigo-400 ${
                      isActive 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-white/90 text-gray-900 border-slate-200/80 backdrop-blur-sm hover:bg-indigo-50'
                    }`}
                  >
                    {m.title}
                  </button>
                );
              })}
            </div>
          )}
          
          {currentSlideObj?.credentialUrl && (
            <div className="pt-2 border-t border-slate-200/60 shrink-0">
              <a 
                href={currentSlideObj?.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 hover:underline bg-white/50 px-2 py-1 -ml-2 rounded-lg backdrop-blur-sm transition-colors"
              >
                Cross-Reference Credential <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const TrainingSection: React.FC<TrainingSectionProps> = ({ 
  trainings = [],
  certifications = [] 
}) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState<number>(0);
  
  const modalSlides = selectedCert ? [
    { title: selectedCert.title, imageUrl: selectedCert.imageUrl, credentialUrl: selectedCert.credentialUrl },
    ...(selectedCert.modules || [])
  ] : [];
  const currentModalObj = modalSlides[selectedSlideIdx];

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200 relative" id="training">
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
            Professional Training, Field Visits & Certifications
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-light max-w-2xl leading-relaxed">
            Industrial workshops, power plant field visits, and internationally accredited certifications in energy, materials science, CAD, and quality engineering.
          </p>
        </div>

        {/* Subsection 1: Professional Training & Field Visits */}
        {trainings.length > 0 && (
          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-mono tracking-wider text-gray-900 uppercase font-semibold">
                PROFESSIONAL TRAINING & FIELD VISITS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainings.map((tr) => (
                <div
                  key={tr.id}
                  className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:border-indigo-300 group-hover:bg-indigo-100 transition-colors">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-100 text-[11px] font-mono text-indigo-700">
                        {tr.year}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-black group-hover:text-indigo-600 transition-colors leading-snug">
                      {tr.title}
                    </h4>
                    <div className="text-xs font-mono text-gray-800">
                      {tr.issuer}
                    </div>
                    {tr.description && (
                      <p className="text-xs text-gray-700 font-light leading-relaxed">
                        {tr.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subsection 2: Certifications */}
        {certifications.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-200">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-mono tracking-wider text-gray-900 uppercase font-semibold">
                CERTIFICATIONS
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certifications.map((cert) => (
                <CertificationCard 
                  key={cert.id} 
                  cert={cert} 
                  onClickTitle={(certObj, idx) => {
                    setSelectedCert(certObj);
                    setSelectedSlideIdx(idx);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Certificate Preview Modal */}
      {selectedCert && currentModalObj && (
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
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-gray-900 hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="pr-10 shrink-0">
              <h3 className="text-xl sm:text-2xl font-bold text-black leading-tight">
                {currentModalObj.title}
              </h3>
              <p className="text-sm text-gray-700 mt-1 font-mono">
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
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Previous Certificate"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSlideIdx(prev => (prev + 1) % modalSlides.length);
                    }}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 bg-white/80 hover:bg-white text-gray-800 hover:text-indigo-600 rounded-full shadow-md backdrop-blur-md transition-all opacity-0 group-hover/modal:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Next Certificate"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {currentModalObj.imageUrl ? (
                <img 
                  key={currentModalObj.imageUrl}
                  src={formatImageUrl(currentModalObj.imageUrl)} 
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
                  className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-black transition-colors"
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
      )}    </section>
  );
};
