import re
with open('src/types.ts', 'r') as f:
    content = f.read()

if "export interface SectionConfig" not in content:
    section_config = """
export interface SectionConfig {
  capabilities: { title: string; subtitle: string };
  projects: { title: string; subtitle: string };
  experience: { title: string; subtitle: string };
  publications: { title: string; subtitle: string };
  trainings: { title: string; subtitle: string };
  honors: { title: string; subtitle: string };
}
"""
    content = content.replace("export interface PortfolioData {", section_config + "\nexport interface PortfolioData {")
    content = content.replace("profile: Profile;", "profile: Profile;\n  sectionConfig?: SectionConfig;")
    with open('src/types.ts', 'w') as f:
        f.write(content)
