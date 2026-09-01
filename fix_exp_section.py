import re

with open('src/components/ExperienceSection.tsx', 'r') as f:
    content = f.read()

old_thesis = """                  {edu.thesis && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">
                        Dissertation / Thesis:
                      </span>
                      <p className="font-light italic text-gray-900">
                        {edu.thesis}
                      </p>
                    </div>
                  )}"""

new_thesis = """                  {edu.thesis && (
                    <div className="pt-2 border-t border-slate-100 text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">
                        Dissertation / Thesis:
                      </span>
                      <p className="font-light italic text-gray-900">
                        {edu.thesis}
                      </p>
                    </div>
                  )}
                  {edu.advisor && (
                    <div className="text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-gray-500 block text-[10px] uppercase tracking-wider">
                        Advisor:
                      </span>
                      <p className="font-light text-gray-800">
                        {edu.advisor}
                      </p>
                    </div>
                  )}
                  {edu.synopsis && (
                    <div className="text-xs text-gray-800 space-y-1">
                      <span className="font-mono text-gray-500 block text-[10px] uppercase tracking-wider">
                        Synopsis:
                      </span>
                      <p className="font-light text-gray-800 whitespace-pre-line">
                        {edu.synopsis}
                      </p>
                    </div>
                  )}"""

if old_thesis in content:
    content = content.replace(old_thesis, new_thesis)
else:
    print("could not find old thesis block")

with open('src/components/ExperienceSection.tsx', 'w') as f:
    f.write(content)
