import { motion } from 'motion/react';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check,
  Filter,
  RefreshCw,
  Sparkles,
  ArrowUpDown,
  Award
} from 'lucide-react';
import { Publication } from '../types';
import { BibtexModal } from './BibtexModal';

interface PublicationsSectionProps {
  config?: { title: string; subtitle: string };
  publications: Publication[];
  scholarUrl?: string;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ publications, scholarUrl, config }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'citations' | 'journal_first' | 'oldest'>('latest');
  const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
  const [activeBibtexPub, setActiveBibtexPub] = useState<Publication | null>(null);
  
  // Citations Sync State
  const [citationCounts, setCitationCounts] = useState<Record<string, number>>({});
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncCitations = async (currentCounts: Record<string, number>) => {
    setIsSyncing(true);
    let updatedCount = 0;
    
    try {
      const newCounts = { ...currentCounts };
      let scholarSuccess = false;

      // 1. Try Google Scholar Scraper Backend first
      if (scholarUrl) {
        try {
          const scholarRes = await fetch(`/api/scholar/sync?url=${encodeURIComponent(scholarUrl)}`);
          if (scholarRes.ok) {
            const data = await scholarRes.json();
            if (data.success && data.data) {
              const scholarCitations = data.data as Record<string, number>;
              
              // Map fetched titles to our publications
              for (const pub of publications) {
                const pubTitleLower = pub.title.toLowerCase();
                const matchedKey = Object.keys(scholarCitations).find(k => pubTitleLower.includes(k) || k.includes(pubTitleLower.substring(0, 30)));
                
                if (matchedKey) {
                  newCounts[pub.id] = scholarCitations[matchedKey];
                  updatedCount++;
                }
              }
              scholarSuccess = true;
            }
          }
        } catch (e) {
          console.error("Google Scholar backend sync failed, falling back...", e);
        }
      }

      // 2. Fallback to Semantic Scholar if Google Scholar failed or wasn't available
      if (!scholarSuccess) {
        for (const pub of publications) {
          if (pub.doi) {
            try {
              const cleanDoi = pub.doi.replace('https://doi.org/', '');
              const res = await fetch(`https://api.semanticscholar.org/graph/v1/paper/DOI:${cleanDoi}?fields=citationCount`);
              if (res.ok) {
                const data = await res.json();
                if (data && typeof data.citationCount === 'number') {
                  newCounts[pub.id] = data.citationCount;
                  updatedCount++;
                }
              }
            } catch (e) {
              console.error("Failed to fetch DOI for", pub.id, e);
            }
          }
        }
      }
      
      setCitationCounts(newCounts);
      
    } catch (err: any) {
      console.error('Failed to sync citations.', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Initialize citation counts from props and start auto-sync
  useEffect(() => {
    const initial: Record<string, number> = {};
    publications.forEach(pub => {
      if (pub.citations !== undefined) {
        initial[pub.id] = pub.citations;
      }
    });
    setCitationCounts(initial);

    // Automatically sync on load
    handleSyncCitations(initial);
  }, [publications, scholarUrl]);

  // Dynamically extract categories from all loaded publications
  const categories = useMemo(() => {
    const set = new Set<string>();
    publications.forEach(pub => {
      if (pub.category) set.add(pub.category);
      if (pub.statusNote) set.add(pub.statusNote);
    });
    
    // Sort categories: Journal first, Conference second, others alphabetically
    const sorted = Array.from(set).sort((a, b) => {
      if (a.toLowerCase() === 'journal') return -1;
      if (b.toLowerCase() === 'journal') return 1;
      if (a.toLowerCase() === 'conference') return -1;
      if (b.toLowerCase() === 'conference') return 1;
      return a.localeCompare(b);
    });

    return ['all', ...sorted];
  }, [publications]);

  // Find the highest publication year across all papers to badge newest items
  const maxYear = useMemo(() => {
    if (publications.length === 0) return new Date().getFullYear();
    return Math.max(...publications.map(p => p.year || 0));
  }, [publications]);

  const filteredAndSortedPubs = useMemo(() => {
    // 1. Filter
    const matched = publications.filter(pub => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        pub.category === selectedCategory || 
        pub.statusNote === selectedCategory;
        
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.venue.toLowerCase().includes(q) ||
        (pub.tags && pub.tags.some(t => t.toLowerCase().includes(q))) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    // 2. Sort
    return matched.sort((a, b) => {
      const citationsA = citationCounts[a.id] ?? a.citations ?? 0;
      const citationsB = citationCounts[b.id] ?? b.citations ?? 0;
      const yearA = a.year || 0;
      const yearB = b.year || 0;

      if (sortBy === 'citations') {
        if (citationsB !== citationsA) return citationsB - citationsA;
        return yearB - yearA;
      }

      if (sortBy === 'journal_first') {
        const isJournalA = a.category?.toLowerCase() === 'journal' ? 1 : 0;
        const isJournalB = b.category?.toLowerCase() === 'journal' ? 1 : 0;
        if (isJournalB !== isJournalA) return isJournalB - isJournalA;
        if (yearB !== yearA) return yearB - yearA;
        return citationsB - citationsA;
      }

      if (sortBy === 'oldest') {
        if (yearA !== yearB) return yearA - yearB;
        return (a.title || '').localeCompare(b.title || '');
      }

      // Default: 'latest' (Newest Year First -> Most Cited / Journal priority within same year)
      if (yearB !== yearA) {
        return yearB - yearA;
      }
      
      // If same year: Journal papers or higher citations go first
      const isJournalA = a.category?.toLowerCase() === 'journal' ? 1 : 0;
      const isJournalB = b.category?.toLowerCase() === 'journal' ? 1 : 0;
      if (isJournalB !== isJournalA) return isJournalB - isJournalA;
      
      if (citationsB !== citationsA) return citationsB - citationsA;
      return (a.title || '').localeCompare(b.title || '');
    });
  }, [publications, selectedCategory, searchQuery, sortBy, citationCounts]);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-12 sm:py-16 border-t border-slate-200" id="publications">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black font-sans">{config?.title ?? "Peer-Reviewed Journal Papers, Conference Proceedings & Preprints"}</h2>
          {(config?.subtitle ?? "Scholarly articles published in international journals and conferences covering hybrid microgrid optimization, machine learning diagnostics, solar PV soiling, and battery degradation.") && (
            <p className="text-sm sm:text-base text-gray-800 font-light leading-relaxed w-full max-w-full text-justify ">{config?.subtitle ?? "Scholarly articles published in international journals and conferences covering hybrid microgrid optimization, machine learning diagnostics, solar PV soiling, and battery degradation."}</p>
          )}
        </div>

        {/* Filter, Sort & Search Control Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 text-gray-800 hover:text-black border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'ALL PAPERS' : cat}
                </button>
              ))}
              
              {scholarUrl && (
                <>
                  <div className="h-4 w-px bg-slate-300 mx-1 hidden sm:block"></div>
                  <a 
                    href={scholarUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                    title="View Google Scholar Profile"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Scholar Profile</span>
                  </a>
                </>
              )}
            </div>

            {/* Right controls: Sorting + Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              
              {/* Sort selector */}
              <div className="flex items-center space-x-1.5 bg-white/90 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm text-xs text-gray-900">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="font-mono text-[11px] text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="latest">Latest Work First</option>
                  <option value="citations">Most Cited First</option>
                  <option value="journal_first">Journals First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, author, venue..."
                  className="w-full pl-9 pr-4 py-2 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl text-xs text-black placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors shadow-sm"
                />
              </div>
            </div>

          </div>
        </div>
        
        {/* Publications List */}
        {filteredAndSortedPubs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm text-gray-700 font-mono">No publications matched your filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs font-mono text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedPubs.map((pub, idx) => {
              const isExpanded = !!expandedAbstracts[pub.id];
              const displayCitations = citationCounts[pub.id] !== undefined ? citationCounts[pub.id] : pub.citations;
              const isLatestYear = pub.year === maxYear;
              const isTopFeatured = idx === 0 && (pub.featured || isLatestYear);

              return (
                <div
                  key={pub.id}
                  className={`p-5 sm:p-6 rounded-2xl backdrop-blur-md border transition-all space-y-3.5 group shadow-sm ${
                    isTopFeatured
                      ? 'bg-gradient-to-r from-white via-indigo-50/20 to-white border-indigo-300 shadow-indigo-100/60 ring-1 ring-indigo-500/20'
                      : 'bg-white/85 border-slate-200 hover:border-indigo-300 shadow-slate-200/50'
                  }`}
                >
                  {/* Top Bar: Venue & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      
                      {/* Latest Work / Featured Highlight Badge */}
                      {isTopFeatured && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
                          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                          <span>Latest Highlight</span>
                        </span>
                      )}

                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${
                        pub.category === 'Journal'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : pub.category === 'Under Review' || pub.statusNote === 'Under Review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : pub.category === 'Conference'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-slate-50 text-gray-900 border-slate-200'
                      }`}>
                        {pub.statusNote || pub.category}
                      </span>
                      
                      <span className="text-xs font-mono font-bold text-gray-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {pub.year}
                      </span>
                    </div>

                    {displayCitations !== undefined && displayCitations > 0 && (
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold shadow-xs">
                        {displayCitations} Citations
                      </span>
                    )}
                  </div>

                  {/* Paper Title */}
                  <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-indigo-600 transition-colors leading-snug">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noreferrer" className="hover:underline">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h3>

                  {/* Authors & Venue */}
                  <div className="space-y-1 text-xs text-gray-800">
                    <p className="font-light">
                      <span className="text-gray-700 font-mono">Authors: </span>
                      {pub.authors}
                    </p>
                    <p className="font-mono text-indigo-600 font-medium">
                      {pub.venue}
                    </p>
                  </div>

                  {/* Tags */}
                  {pub.tags && pub.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pub.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-50 text-gray-800 border border-slate-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expandable Abstract */}
                  {isExpanded && pub.abstract && (
                    <div className="mt-3 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 text-xs text-gray-800 font-light leading-relaxed space-y-1 animate-fadeIn shadow-inner">
                      <span className="text-[11px] font-mono text-indigo-700 uppercase font-semibold block">
                        Abstract
                      </span>
                      <p>{pub.abstract}</p>
                    </div>
                  )}

                  {/* Actions Row */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    {pub.abstract ? (
                      <button
                        onClick={() => toggleAbstract(pub.id)}
                        className="inline-flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            <span>Hide Abstract</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            <span>View Abstract</span>
                          </>
                        )}
                      </button>
                    ) : <div />}

                    <div className="flex items-center space-x-3">
                      {pub.bibtex && (
                        <button
                          onClick={() => setActiveBibtexPub(pub)}
                          className="inline-flex items-center space-x-1 text-indigo-600 hover:underline cursor-pointer font-medium"
                        >
                          <Quote className="w-3.5 h-3.5" />
                          <span>BibTeX</span>
                        </button>
                      )}

                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi.replace('https://doi.org/', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-gray-800 hover:text-indigo-600 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                          <span>DOI</span>
                        </a>
                      )}

                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1 text-gray-800 hover:text-indigo-600 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5 text-rose-500" />
                          <span>PDF</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
            
            {/* Ongoing research note */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center space-x-3 text-xs font-mono text-indigo-900 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Additionally, multiple research investigations are ongoing and preparing for publication submission.</span>
            </div>
          </div>
        )}

      </motion.div>

      {/* BibTeX Modal */}
      {activeBibtexPub && (
        <BibtexModal
          publication={activeBibtexPub}
          onClose={() => setActiveBibtexPub(null)}
        />
      )}
    </section>
  );
};

