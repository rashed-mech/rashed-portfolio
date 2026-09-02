import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

old_heading = "Mechanical Engineering, Renewable Energy Systems & Field Analysis"
new_heading = "{profile.headline || \"Mechanical Engineering, Renewable Energy Systems & Field Analysis\"}"

content = content.replace(old_heading, new_heading)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
