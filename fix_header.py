import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

content = content.replace("{ name: 'OVERVIEW', href: '#overview' }", "{ name: 'OVERVIEW', href: '#hero' }")

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)
