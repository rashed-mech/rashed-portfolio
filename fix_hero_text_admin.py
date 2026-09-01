import re

with open('src/types.ts', 'r') as f:
    content = f.read()

if 'researchInterestText?: string;' not in content:
    content = content.replace('  researchInterests?: string[];', '  researchInterests?: string[];\n  researchInterestText?: string;')
    with open('src/types.ts', 'w') as f:
        f.write(content)

with open('src/components/admin/tabs/ProfileTab.tsx', 'r') as f:
    content = f.read()

# State
if 'const [researchInterestText, setResearchInterestText]' not in content:
    content = content.replace(
        '  const [researchInterestsText, setResearchInterestsText] = useState(',
        '  const [researchInterestText, setResearchInterestText] = useState(profile.researchInterestText || "");\n  const [researchInterestsText, setResearchInterestsText] = useState('
    )

# Payload
if 'researchInterestText: researchInterestText,' not in content:
    content = content.replace(
        'researchInterests: parsedInterests,',
        'researchInterests: parsedInterests,\n      researchInterestText: researchInterestText,'
    )

# UI
if 'value={researchInterestText}' not in content:
    new_ui = """          <div className="space-y-1.5 mt-4">
            <label className="text-xs font-semibold text-slate-300">Research Interest Paragraph</label>
            <textarea
              value={researchInterestText}
              onChange={(e) => setResearchInterestText(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white resize-y leading-relaxed font-sans"
              rows={4}
              placeholder="Hi! I'm Rashedul Islam..."
            />
          </div>"""
    content = content.replace(
        '<p className="text-xs text-slate-500 mt-1">These will appear as pills under your introduction.</p>\n          </div>',
        f'<p className="text-xs text-slate-500 mt-1">These will appear as pills under your introduction.</p>\n          </div>\n{new_ui}'
    )

with open('src/components/admin/tabs/ProfileTab.tsx', 'w') as f:
    f.write(content)

# Update Hero.tsx
with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

old_text = "Hi! I'm Rashedul Islam, a mechanical engineer a native of Cox's Bazar, Bangladesh, with a strong and lasting interest in Computational Fluid Dynamics and hydrogen combustion. I completed my B.Sc. in Mechanical Engineering at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur, and from early on I found myself pulled toward the questions CFD lets you ask- how fuels ignite and burn, how flows behave under pressure and turbulence, and how small changes in geometry or chemistry ripple through a system's performance. That curiosity has stayed with me, and I continue to work with tools like CONVERGE, ANSYS Fluent, and COMSOL Multiphysics to explore combustion and reacting-flow problems, with hydrogen as a fuel of particular interest given its promise for cleaner energy systems."
new_text = "{profile.researchInterestText || \"" + old_text + "\"}"

content = content.replace(old_text, new_text)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)

