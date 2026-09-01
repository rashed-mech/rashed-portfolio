import re

with open('src/types.ts', 'r') as f:
    content = f.read()

new_types = """
export interface CorePillar {
  id: string;
  icon: string;
  title: string;
  tag: string;
  description: string;
}

export interface CoreMetric {
  id: string;
  value: string;
  label: string;
  sub: string;
}

"""

if "export interface CorePillar" not in content:
    # Insert before PortfolioData
    content = content.replace("export interface PortfolioData {", new_types + "export interface PortfolioData {")

    # Insert inside PortfolioData
    content = content.replace("  profile: Profile;", "  profile: Profile;\n  pillars?: CorePillar[];\n  metrics?: CoreMetric[];")

with open('src/types.ts', 'w') as f:
    f.write(content)
