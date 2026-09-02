import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';
import { formatImageUrl } from '../utils/formatUrl';

interface HeaderProps {
  profile: Profile;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'OVERVIEW', href: '#hero' },
    { name: 'SKILLS', href: '#capabilities' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'PUBLICATIONS', href: '#publications' },
    { name: 'TRAINING', href: '#training' },
    { name: 'HONORS', href: '#honors-activities' },
    { name: 'CONTACT', href: '#contact' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm border-b border-slate-200' : 'bg-[#e4e7eb]/85 border-b border-slate-200'}`} id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <a 
            href="#" 
            className="flex items-center space-x-3 group"
            id="brand-logo-link"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {scrolled && profile.avatarUrl ? (
                  <motion.img 
                    key="avatar"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    src={formatImageUrl(profile.avatarUrl)} 
                    alt={profile.name} 
                    className="absolute inset-0 w-8 h-8 rounded-full object-cover border border-slate-200 group-hover:border-indigo-400 shadow-sm bg-slate-100"
                  />
                ) : profile.logoUrl ? (
                  <motion.img 
                    key="logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    src={formatImageUrl(profile.logoUrl)} 
                    alt="Brand Logo" 
                    className="absolute inset-0 w-8 h-8 rounded-full object-cover bg-transparent"
                  />
                ) : (
                  <motion.div 
                    key="initials"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0 w-8 h-8 rounded-full border border-indigo-600 flex items-center justify-center text-indigo-600 font-serif text-sm font-semibold tracking-wider group-hover:bg-indigo-50 bg-white/50"
                  >
                    {getInitials(profile.name)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="font-sans font-bold uppercase text-sm sm:text-base tracking-[0.2em] text-black group-hover:text-indigo-600 transition-colors mt-0.5">
              {profile.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-[13px] font-sans font-semibold tracking-wider text-black hover:text-indigo-600 transition-colors uppercase after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-black hover:text-black hover:bg-slate-100 transition-colors"
              id="mobile-menu-toggle-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-indigo-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur px-4 pt-2 pb-5 space-y-1.5" id="mobile-nav-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-sans font-semibold tracking-wider text-black hover:bg-slate-50 hover:text-indigo-600 transition-colors uppercase hover:underline underline-offset-4 decoration-2 decoration-indigo-500"
            >
              {link.name}
            </a>
          ))}
          {profile.cvUrl && profile.cvUrl !== '#' && (
            <div className="pt-2 border-t border-slate-200">
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs font-mono text-indigo-600 border border-indigo-200 hover:bg-indigo-50"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD CV</span>
              </a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
