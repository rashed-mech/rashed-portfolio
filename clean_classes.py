import re

sections = [
    'CapabilitiesSection',
    'ProjectsSection',
    'ExperienceSection',
    'PublicationsSection',
    'TrainingSection',
    'HonorsAndActivitiesSection'
]

for section in sections:
    file = f"src/components/{section}.tsx"
    with open(file, 'r') as f:
        content = f.read()
    
    # Clean up duplicate max-w classes
    content = content.replace("max-w-2xl leading-relaxed w-full max-w-full", "leading-relaxed w-full max-w-full")
    content = content.replace("max-w-3xl leading-relaxed w-full max-w-full", "leading-relaxed w-full max-w-full")
    
    with open(file, 'w') as f:
        f.write(content)
