import re

with open('src/components/admin/tabs/ProfileTab.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Headline (Main Hero Tagline)',
    'Overview Section Sub-Heading (e.g., Mechanical Engineering...)'
)

with open('src/components/admin/tabs/ProfileTab.tsx', 'w') as f:
    f.write(content)
