import re

with open('src/components/ExperienceSection.tsx', 'r') as f:
    content = f.read()

# For thesis
old_thesis = '<p className="font-light italic text-black">'
new_thesis = '<p className="text-black text-justify leading-relaxed font-normal">'
content = content.replace(old_thesis, new_thesis)

# For advisor
old_advisor = '<p className="font-light text-black">'
new_advisor = '<p className="text-black text-justify leading-relaxed font-normal">'
content = content.replace(old_advisor, new_advisor)

# For synopsis
old_synopsis = '<p className="font-light text-black whitespace-pre-line">'
new_synopsis = '<p className="text-black text-justify leading-relaxed font-normal whitespace-pre-line">'
content = content.replace(old_synopsis, new_synopsis)

# For coursework (which also uses <p className="font-light text-black"> if I recall, but wait, if it does, the advisor replacement already caught it. Let's check.)

with open('src/components/ExperienceSection.tsx', 'w') as f:
    f.write(content)
