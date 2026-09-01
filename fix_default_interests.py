import re

with open('src/components/admin/tabs/ProfileTab.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'const [researchInterestsText, setResearchInterestsText] = useState(\n    (profile.researchInterests || []).join(\', \')\n  );',
    'const [researchInterestsText, setResearchInterestsText] = useState(\n    (profile.researchInterests || [\'Material Science\', \'Additive Manufacturing Materials\', \'Renewable Energy\', \'Hydrogen Fuel\', \'CFD in biofuels\']).join(\', \')\n  );'
)

with open('src/components/admin/tabs/ProfileTab.tsx', 'w') as f:
    f.write(content)

