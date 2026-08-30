import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-transparent py-12 text-gray-700" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex justify-end pb-8 border-b border-slate-100">
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-transparent/60 backdrop-blur-md border border-slate-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4 text-indigo-600" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-700 gap-3">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-gray-700">
            Energy Systems & Microgrid Research · Cox's Bazar & Dinajpur
          </p>
        </div>

      </div>
    </footer>
  );
};
