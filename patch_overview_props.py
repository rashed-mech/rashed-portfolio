with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

import re

# Add PortfolioData import if missing
if "PortfolioData" not in content:
    content = content.replace("import { Profile } from '../types';", "import { Profile, PortfolioData } from '../types';")

# Update props interface
content = content.replace("interface OverviewSectionProps {\n  profile: Profile;\n}", "interface OverviewSectionProps {\n  profile: Profile;\n  data?: PortfolioData;\n}")

# Update component signature
content = content.replace("export const OverviewSection: React.FC<OverviewSectionProps> = ({ profile }) => {", "export const OverviewSection: React.FC<OverviewSectionProps> = ({ profile, data }) => {")

# Use pillars and metrics from data, fallback to hardcoded if not present
fallback_pillars = """  const fallbackPillars = [
    {
      icon: Cpu,
      title: 'Hybrid Energy Modelling',
      tag: 'HOMER Pro · PVsyst · RETscreen',
      description: 'Hybrid system optimization, LCOE/NPC/LCOH techno-economic analysis, load assessment, life cycle analysis (LCA), and off-grid system validation.'
    },
    {
      icon: Flame,
      title: 'Hydrogen & CFD Simulation',
      tag: 'CONVERGE 3.0 · ANSYS Fluent · SolidWorks',
      description: 'Combustion modeling of green hydrogen vs conventional fuels in PFI SI engines, thermo-hydraulic heat exchanger modeling, and atomistic molecular dynamics.'
    },
    {
      icon: Wrench,
      title: 'Electrical & Maintenance',
      tag: 'Preventive & Corrective Diagnostics',
      description: 'Electrical installation assessment, solar PV integration, diesel/biogas generator performance monitoring, and safety compliance in resource-constrained environments.'
    },
    {
      icon: Compass,
      title: 'Fieldwork & Humanitarian Support',
      tag: 'Remote Infrastructure · Capacity Building',
      description: 'Hands-on fieldwork across coastal Bangladesh, technician coaching, technical documentation, and applying energy expertise for humanitarian operations (MSF).'
    }
  ];
  
  const fallbackMetrics = [
    { value: '6 Papers', label: 'Journal Publications & Research', sub: '3 Published · 2 Under Review · 1 Submitted' },
    { value: '3.363 / 4.00', label: 'B.Sc. Mechanical Engineering', sub: 'HSTU Dinajpur (2019–2022)' },
    { value: 'CSWE', label: 'SolidWorks Certified', sub: 'CAD Professional & Sheet Metal' },
    { value: '2 Medals', label: 'Physics & Math Olympiad', sub: 'Divisional & Regional Awards' }
  ];

  const iconMap: Record<string, any> = { Cpu, Flame, Wrench, Compass, MapPin, ShieldCheck, Award, BookOpen };
  
  const pillars = data?.pillars?.length ? data.pillars.map(p => ({...p, icon: iconMap[p.icon as string] || Cpu})) : fallbackPillars;
  const metrics = data?.metrics?.length ? data.metrics : fallbackMetrics;
"""

# Replace the hardcoded const pillars and metrics with the dynamic ones
content = re.sub(r"  const pillars = \[.*?\];.*?const metrics = \[.*?\];", fallback_pillars, content, flags=re.DOTALL)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)

