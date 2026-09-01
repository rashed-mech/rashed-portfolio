import re
import os

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

    # Match <p className="..."> {config?.subtitle ?? "..."} </p>
    pattern = re.compile(r'(<p\s+className="[^"]*"\s*>\s*\{config\?\.subtitle \?\? ("[^"]*")\}\s*</p>)')
    
    def repl(m):
        full_p = m.group(1)
        fallback_str = m.group(2)
        return f"{{(config?.subtitle ?? {fallback_str}) && (\n            {full_p}\n          )}}"
        
    new_content = pattern.sub(repl, content)
    
    with open(file_path, 'w') as f:
        f.write(new_content)

