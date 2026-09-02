import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

# Let's fix the split issue
content = re.sub(
    r"value\.split\('.*?'\)\.map", 
    "value.split('\\n').map", 
    content,
    flags=re.DOTALL
)

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
