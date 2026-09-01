import os
import glob

for file in glob.glob("src/components/*Section.tsx"):
    with open(file, 'r') as f:
        content = f.read()
    content = content.replace("text-justify-last-left", "")
    with open(file, 'w') as f:
        f.write(content)
