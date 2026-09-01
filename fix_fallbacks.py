import os
import re

files_to_check = [
    "src/components/ExperienceSection.tsx",
    "src/components/PublicationsSection.tsx",
    "src/components/TrainingSection.tsx",
    "src/components/HonorsAndActivitiesSection.tsx",
    "src/components/CapabilitiesSection.tsx",
    "src/components/ProjectsSection.tsx"
]

for file_path in files_to_check:
    with open(file_path, 'r') as f:
        content = f.read()

    # Find the title fallback pattern
    # e.g. <h2 ...>{config?.title || "..."}</h2>
    # Replace || with ??
    content = content.replace("config?.title ||", "config?.title ??")

    # Find the subtitle fallback pattern
    # The subtitle might be in a p tag: <p ...>{config?.subtitle || "..."}</p>
    # We want to change the || to ??
    content = content.replace("config?.subtitle ||", "config?.subtitle ??")

    # Also wrap the <p> in a conditional if it is a <p> tag
    # But wait, replacing just || with ?? will fix the text rendering to empty string.
    # An empty <p> isn't that bad, but it might take up space. 
    # Let's see if we can regex the <p> tag.
    
    # Simple fix first: just change || to ??
    
    with open(file_path, 'w') as f:
        f.write(content)

