import re

with open('src/components/admin/tabs/ProfileTab.tsx', 'r') as f:
    content = f.read()

# Add state
if 'const [researchInterestsText, setResearchInterestsText] = useState(' not in content:
    content = content.replace(
        '  const [aboutParagraphsText, setAboutParagraphsText] = useState(\n    (profile.aboutText || []).join(\'\\n\\n\')\n  );',
        '  const [aboutParagraphsText, setAboutParagraphsText] = useState(\n    (profile.aboutText || []).join(\'\\n\\n\')\n  );\n  const [researchInterestsText, setResearchInterestsText] = useState(\n    (profile.researchInterests || []).join(\', \')\n  );'
    )

# Add to payload
if 'researchInterests: parsedInterests' not in content:
    content = content.replace(
        'const parsedAbout = aboutParagraphsText',
        'const parsedInterests = researchInterestsText.split(\',\').map(i => i.trim()).filter(Boolean);\n    const parsedAbout = aboutParagraphsText'
    )
    content = content.replace(
        'aboutText: parsedAbout,',
        'aboutText: parsedAbout,\n      researchInterests: parsedInterests,'
    )

# Add UI
new_ui = """        </div>

        <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-indigo-400">
            Current Research Interests
          </h3>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Comma-Separated Interests</label>
            <input
              type="text"
              value={researchInterestsText}
              onChange={(e) => setResearchInterestsText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white"
              placeholder="Material Science, Renewable Energy, Hydrogen Fuel"
            />
            <p className="text-xs text-slate-500 mt-1">These will appear as pills under your introduction.</p>
          </div>
        </div>

        {/* Affiliation & Contact */}"""

content = content.replace('        </div>\n\n        {/* Affiliation & Contact */}', new_ui)

with open('src/components/admin/tabs/ProfileTab.tsx', 'w') as f:
    f.write(content)
    print("Updated ProfileTab")

