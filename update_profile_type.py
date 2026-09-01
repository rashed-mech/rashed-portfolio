import re

with open('src/types.ts', 'r') as f:
    content = f.read()

if 'researchInterests?: string[];' not in content:
    content = content.replace('  aboutText: string[];', '  aboutText: string[];\n  researchInterests?: string[];')
    
    with open('src/types.ts', 'w') as f:
        f.write(content)
        print("Updated types.ts")
else:
    print("Already updated")
