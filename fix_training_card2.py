import re

with open('src/components/TrainingSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'className="ticker absolute whitespace-nowrap',
    'className="ticker whitespace-nowrap'
)

with open('src/components/TrainingSection.tsx', 'w') as f:
    f.write(content)
