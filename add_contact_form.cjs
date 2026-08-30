const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

if (!c.includes("import { submitContactMessage }")) {
  c = c.replace(/import \{ Profile \} from '\.\.\/types';/, "import { Profile } from '../types';\nimport { submitContactMessage } from '../api';\nimport { Send, CheckCircle, AlertCircle } from 'lucide-react';");
}

const formState = `  const [isEngaged, setIsEngaged] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await submitContactMessage(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };`;

c = c.replace(/  const \[isEngaged, setIsEngaged\] = useState\(false\);/, formState);

const ctaAndFormRegex = /\{\/\* Inline CTA Reveal \*\/\}.*<\/section>/s;

const formUI = `{/* Contact Form & CTA */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-slate-900 rounded-xl p-6 md:p-8 flex flex-col justify-center shadow-xl border border-slate-800">
            <h3 className="text-2xl font-space font-bold text-white mb-4">
              Line operational. Ready to build?
            </h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              The assembly sequence is complete. Let's connect to discuss fluid analysis, mechanical design, or your next complex integration. You can reach out directly via email, connect on LinkedIn, or send a secure message using the terminal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={\`mailto:\${profile.email}\`}
                className="inline-flex items-center justify-center space-x-2 bg-[#E3A34D] hover:bg-[#c98a39] text-slate-900 px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              {profile.social?.linkedin && (
                <a 
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors border border-slate-700"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Connect</span>
                </a>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-space font-bold text-slate-900 mb-6 flex items-center gap-2">
               Contact Messages
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm"
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-ibm font-semibold text-slate-600 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#E3A34D] focus:ring-1 focus:ring-[#E3A34D] transition-colors font-sans text-sm resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Message transmitted successfully.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-ibm text-sm font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
`;

c = c.replace(ctaAndFormRegex, formUI);

fs.writeFileSync(file, c);
