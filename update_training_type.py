import re

with open('src/types.ts', 'r') as f:
    content = f.read()

if 'galleryUrls?: string[];' not in content.split('export interface Training')[1].split('}')[0]:
    content = content.replace(
        '  description?: string;',
        '  description?: string;\n  galleryUrls?: string[];'
    )
    with open('src/types.ts', 'w') as f:
        f.write(content)
        print("Updated Training type")
