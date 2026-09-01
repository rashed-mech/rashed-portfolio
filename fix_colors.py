import re

with open('src/components/ExperienceSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<span className="font-mono text-gray-500 block text-[10px] uppercase tracking-wider">\n                        Advisor:',
    '<span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">\n                        Advisor:'
)

content = content.replace(
    '<span className="font-mono text-gray-500 block text-[10px] uppercase tracking-wider">\n                        Synopsis:',
    '<span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">\n                        Synopsis:'
)

content = content.replace(
    '<span className="font-mono text-gray-700 block text-[10px] uppercase tracking-wider">\n                        Relevant Coursework:',
    '<span className="font-mono text-indigo-600 block text-[11px] uppercase tracking-wider">\n                        Relevant Coursework:'
)

with open('src/components/ExperienceSection.tsx', 'w') as f:
    f.write(content)

