import React, { useState, useEffect } from 'react';
import { 
  fetchPortfolioData, 
  isAdminLoggedIn, 
  fetchAdminData,
  removeAuthToken 
} from './api';
import { PortfolioData } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { PublicationsSection } from './components/PublicationsSection';
import { TrainingSection } from './components/TrainingSection';
import { HonorsAndActivitiesSection } from './components/HonorsAndActivitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { formatImageUrl } from './utils/formatUrl';

export function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<'home' | 'admin'>(() => {
    return window.location.pathname.startsWith('/admin') ? 'admin' : 'home';
  });
  const [isAuth, setIsAuth] = useState<boolean>(isAdminLoggedIn());
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Load portfolio data
  const loadData = async () => {
    try {
      setError(null);
      if (isAdminLoggedIn()) {
        try {
          const adminData = await fetchAdminData();
          setData(adminData);
          setIsAuth(true);
          return;
        } catch (adminErr) {
          console.warn('Admin session expired or invalid, falling back to public data:', adminErr);
          removeAuthToken();
          setIsAuth(false);
        }
      }
      
      const publicData = await fetchPortfolioData();
      
      // Auto-update Google Scholar stats
      if (publicData.profile?.social?.scholar) {
        try {
          fetch(`/api/scholar/stats?url=${encodeURIComponent(publicData.profile.social.scholar)}`)
            .then(res => res.json())
            .then(resData => {
              if (resData.success && resData.data) {
                setData(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    profile: {
                      ...prev.profile,
                      stats: {
                        ...prev.profile.stats,
                        citations: resData.data.citations,
                        hIndex: resData.data.hIndex
                      }
                    }
                  };
                });
              }
            }).catch(e => console.warn('Silent scholar sync failed', e));
        } catch(e) {}
      }

      setData(publicData);
      setIsAuth(false);
    } catch (err: any) {
      console.error('Failed to load portfolio data:', err);
      setError(err.message || 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listen to browser URL navigation (popstate)
    const handlePopState = () => {
      setRoute(window.location.pathname.startsWith('/admin') ? 'admin' : 'home');
      setIsAuth(isAdminLoggedIn());
    };

    // Secret shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to access admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (data?.profile?.logoUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      // logoImage needs to format from raw link to drive view link
      link.href = formatImageUrl(data.profile.logoUrl) || data.profile.logoUrl;
    }
  }, [data?.profile?.logoUrl]);

  useEffect(() => {
    // Browser tab title. If the admin hasn't set a custom one, fall back to
    // "<Name> — <Title>" so the tab still looks sensible out of the box.
    if (data?.profile) {
      document.title = data.profile.siteTitle?.trim()
        || `${data.profile.name} — ${data.profile.title}`;
    }
  }, [data?.profile?.siteTitle, data?.profile?.name, data?.profile?.title]);

  const navigateTo = (newRoute: 'home' | 'admin') => {
    setRoute(newRoute);
    const path = newRoute === 'admin' ? '/admin' : '/';
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsAuth(isAdminLoggedIn());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f12] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono tracking-widest uppercase text-[#d4af37]">
            Loading Energy Systems Portfolio...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0b0f12] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0e141a] rounded-2xl border border-red-800/80 p-6 text-center space-y-4">
          <div className="w-12 h-12 bg-red-950/80 text-red-400 rounded-full flex items-center justify-center mx-auto text-lg font-mono">
            !
          </div>
          <h2 className="text-base font-bold text-white">Failed to connect to backend</h2>
          <p className="text-xs text-slate-300 font-light">{error || 'Unknown error occurred.'}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              loadData();
            }}
            className="px-4 py-2 bg-[#d4af37] text-[#0b0f12] text-xs font-mono font-bold rounded-xl"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  // Admin Route View (only visible when directly accessing /admin or via secret shortcut)
  if (route === 'admin') {
    if (!isAuth) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAuth(true);
            loadData();
          }}
          onBackToSite={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminDashboard
        data={data}
        onRefresh={loadData}
        onLogout={() => {
          setIsAuth(false);
          navigateTo('home');
        }}
        onViewLive={() => navigateTo('home')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />
    );
  }

  // Public Frontend Portfolio View (Original pristine design with NO visible admin buttons or banners)
  return (
    <div className="min-h-screen bg-[#e4e7eb] text-black antialiased" id="public-portfolio-root">
      
      {/* Main Navbar */}
      <Header
        profile={data.profile}
        onOpenAdmin={() => navigateTo('admin')}
        isAdminLoggedIn={isAuth}
      />

      {/* Main Content Sections */}
      <main className="space-y-0">
        <Hero profile={data.profile} data={data} />
        <OverviewSection profile={data.profile} />
        <CapabilitiesSection skillGroups={data.skillGroups} />
        <ProjectsSection projects={data.projects} />
        <ExperienceSection experience={data.experience} education={data.education} />
        <PublicationsSection publications={data.publications} scholarUrl={data.profile.social.scholar} />
        <TrainingSection trainings={data.trainings} certifications={data.certifications} />
        <HonorsAndActivitiesSection 
          achievements={data.achievements} 
          affiliations={data.affiliations} 
          volunteerWork={data.volunteerWork} 
          references={data.references} 
        />
        <ContactSection profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        onOpenAdmin={() => navigateTo('admin')}
        isAdminLoggedIn={isAuth}
      />
    </div>
  );
}

export default App;
