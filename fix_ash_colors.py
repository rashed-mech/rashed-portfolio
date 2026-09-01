import os
import re
import glob

files = glob.glob('src/components/*.tsx')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace text colors using negative lookbehind for dark: and hover:
    # Also handle focus: if any.
    content = re.sub(r'(?<!dark:)(?<!hover:)(?<!focus:)\btext-slate-[34]00\b', 'text-black', content)
    content = re.sub(r'(?<!dark:)(?<!hover:)(?<!focus:)\btext-gray-[34]00\b', 'text-black', content)

    with open(filepath, 'w') as f:
        f.write(content)

