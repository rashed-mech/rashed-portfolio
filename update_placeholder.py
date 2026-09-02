import re

with open('src/components/admin/tabs/ProfileTab.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'placeholder="e.g. Advancing Healthcare Informatics & Computer Vision..."',
    'placeholder="Mechanical Engineering, Renewable Energy Systems & Field Analysis"'
)

with open('src/components/admin/tabs/ProfileTab.tsx', 'w') as f:
    f.write(content)
