import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

old_code = "{['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels'].map((interest, idx) => ("
new_code = "{(profile.researchInterests || ['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels']).map((interest, idx) => ("

content = content.replace(old_code, new_code)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
