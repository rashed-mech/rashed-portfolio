import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "{ name: 'CAPABILITIES', href: '#capabilities' }",
    "{ name: 'SKILLS', href: '#capabilities' }"
)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
