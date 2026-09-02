import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

content = content.replace("const urls = value.split('\\\n').map(u => u.trim()).filter(Boolean);", "const urls = value.split('\\n').map(u => u.trim()).filter(Boolean);")

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
