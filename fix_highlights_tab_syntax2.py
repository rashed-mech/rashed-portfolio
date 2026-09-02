import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

content = content.replace("value.split('').map", "value.split('\\n').map")
content = content.replace('placeholder="https://example.com/image1.jpghttps://example.com/image2.jpg"', 'placeholder="https://example.com/image1.jpg\\nhttps://example.com/image2.jpg"')

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
