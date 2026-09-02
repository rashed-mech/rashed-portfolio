import re

with open('src/types.ts', 'r') as f:
    content = f.read()

content = content.replace(
    '  capabilities: { title: string; subtitle: string };',
    '  overview?: { showPillars: boolean };\n  capabilities: { title: string; subtitle: string };'
)

with open('src/types.ts', 'w') as f:
    f.write(content)
