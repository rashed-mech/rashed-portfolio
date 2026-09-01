import re

sections = {
    'CapabilitiesSection': 'capabilities',
    'ProjectsSection': 'projects',
    'ExperienceSection': 'experience',
    'PublicationsSection': 'publications',
    'TrainingSection': 'trainings',
    'HonorsAndActivitiesSection': 'honors'
}

for section, key in sections.items():
    file = f"src/components/{section}.tsx"
    with open(file, 'r') as f:
        content = f.read()
    
    # Add config prop
    if "config?:" not in content:
        content = re.sub(r"interface " + section + "Props {", f"interface {section}Props {{\n  config?: {{ title: string; subtitle: string }};", content)
        
        # update component signature
        # e.g., export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ skillGroups }) => {
        if section == "ExperienceSection":
            content = content.replace("  experience,\n  education\n}) => {", "  experience,\n  education,\n  config\n}) => {")
            content = content.replace("  experience,\n  education,\n}) => {", "  experience,\n  education,\n  config\n}) => {")
        elif section == "HonorsAndActivitiesSection":
            content = content.replace("  references \n}) => {", "  references,\n  config\n}) => {")
            content = content.replace("  references\n}) => {", "  references,\n  config\n}) => {")
        else:
            content = re.sub(r"export const " + section + r": React\.FC<" + section + r"Props> = \(\{\s*(.*?)\s*\}\) => \{", f"export const {section}: React.FC<{section}Props> = ({{ \\1, config }}) => {{", content)

        # replace hardcoded title and subtitle with {config?.title || "..."}
        # First let's extract the actual hardcoded text
        title_match = re.search(r'<h2 className="[^"]*tracking-tight[^"]*">\s*(.*?)\s*</h2>', content, re.DOTALL)
        subtitle_match = re.search(r'<p className="[^"]*leading-relaxed[^"]*">\s*(.*?)\s*</p>', content, re.DOTALL)
        
        if title_match and subtitle_match:
            title = title_match.group(1).strip()
            subtitle = subtitle_match.group(1).strip()
            
            # Subtitle might need text-justify max-w-full
            content = re.sub(r'<h2 className="([^"]*tracking-tight[^"]*)">\s*.*?\s*</h2>', f'<h2 className="\\1">{{config?.title || "{title}"}}</h2>', content, flags=re.DOTALL)
            
            # Force max-w-full and text-justify
            content = re.sub(r'<p className="([^"]*leading-relaxed[^"]*)">\s*.*?\s*</p>', f'<p className="\\1 w-full max-w-full text-justify text-justify-last-left">{{config?.subtitle || "{subtitle}"}}</p>', content, count=1, flags=re.DOTALL)
            
        with open(file, 'w') as f:
            f.write(content)
            
