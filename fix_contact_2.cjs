const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

const regex = /<AnimatePresence>[\s\S]*?<\/AnimatePresence>/g;
const replaceWith = `<div className="mt-6 overflow-hidden">
              <div className="bg-slate-900 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-space font-bold text-white mb-2">
                    Line operational. Ready to build?
                  </h3>
                  <p className="text-slate-400 text-sm max-w-lg">
                    The assembly sequence is complete. Let's connect to discuss fluid analysis, mechanical design, or your next complex integration.
                  </p>
                </div>
                
                <div className="flex shrink-0 gap-3 w-full md:w-auto">
                  <a 
                    href={\`mailto:\${profile.email}\`}
                    className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 bg-[#E3A34D] hover:bg-[#c98a39] text-slate-900 px-6 py-3 rounded-lg font-ibm text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                  {profile.social?.linkedin && (
                    <a 
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-ibm text-xs font-bold uppercase tracking-widest transition-colors border border-slate-700"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>Connect</span>
                    </a>
                  )}
                </div>
              </div>
            </div>`;
c = c.replace(regex, replaceWith);

fs.writeFileSync(file, c);
