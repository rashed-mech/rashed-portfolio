import re

with open('src/types.ts', 'r') as f:
    content = f.read()

if 'galleryUrls?: string[];' not in content:
    content = content.replace(
        '  description: string;',
        '  description: string;\n  galleryUrls?: string[];'
    )
    with open('src/types.ts', 'w') as f:
        f.write(content)
        print("Added galleryUrls to CorePillar")
else:
    print("Already exists")
