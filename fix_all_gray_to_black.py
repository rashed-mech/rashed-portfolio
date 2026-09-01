import os
import re
import glob

files = glob.glob('src/components/*.tsx')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace text colors
    content = re.sub(r'\btext-gray-[56789]00\b', 'text-black', content)
    content = re.sub(r'\btext-slate-[56789]00\b', 'text-black', content)

    # Also replace hover variants
    content = re.sub(r'\bhover:text-gray-[56789]00\b', 'hover:text-black', content)
    content = re.sub(r'\bhover:text-slate-[56789]00\b', 'hover:text-black', content)

    with open(filepath, 'w') as f:
        f.write(content)

