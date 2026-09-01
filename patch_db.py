with open('src/server/db.ts', 'r') as f:
    content = f.read()

INITIAL_PILLARS = """
const INITIAL_PILLARS = [
  {
    id: 'pillar-1',
    icon: 'Cpu',
    title: 'Hybrid Energy Modelling',
    tag: 'HOMER Pro · PVsyst · RETscreen',
    description: 'Hybrid system optimization, LCOE/NPC/LCOH techno-economic analysis, load assessment, life cycle analysis (LCA), and off-grid system validation.'
  },
  {
    id: 'pillar-2',
    icon: 'Flame',
    title: 'Hydrogen & CFD Simulation',
    tag: 'CONVERGE 3.0 · ANSYS Fluent · SolidWorks',
    description: 'Combustion modeling of green hydrogen vs conventional fuels in PFI SI engines, thermo-hydraulic heat exchanger modeling, and atomistic molecular dynamics.'
  },
  {
    id: 'pillar-3',
    icon: 'Wrench',
    title: 'Electrical & Maintenance',
    tag: 'Preventive & Corrective Diagnostics',
    description: 'Electrical installation assessment, solar PV integration, diesel/biogas generator performance monitoring, and safety compliance in resource-constrained environments.'
  },
  {
    id: 'pillar-4',
    icon: 'Compass',
    title: 'Fieldwork & Humanitarian Support',
    tag: 'Remote Infrastructure · Capacity Building',
    description: 'Hands-on fieldwork across coastal Bangladesh, technician coaching, technical documentation, and applying energy expertise for humanitarian operations (MSF).'
  }
];

const INITIAL_METRICS = [
  { id: 'metric-1', value: '6 Papers', label: 'Journal Publications & Research', sub: '3 Published · 2 Under Review · 1 Submitted' },
  { id: 'metric-2', value: '3.363 / 4.00', label: 'B.Sc. Mechanical Engineering', sub: 'HSTU Dinajpur (2019–2022)' },
  { id: 'metric-3', value: 'CSWE', label: 'SolidWorks Certified', sub: 'CAD Professional & Sheet Metal' },
  { id: 'metric-4', value: '2 Medals', label: 'Physics & Math Olympiad', sub: 'Divisional & Regional Awards' }
];

"""

if "INITIAL_PILLARS" not in content:
    content = content.replace("const DEFAULT_PORTFOLIO_DATA", INITIAL_PILLARS + "const DEFAULT_PORTFOLIO_DATA")
    
    # Add to DEFAULT_PORTFOLIO_DATA
    replacement = """
  publications: INITIAL_PUBLICATIONS,
  projects: INITIAL_PROJECTS,
  pillars: INITIAL_PILLARS,
  metrics: INITIAL_METRICS,
"""
    content = content.replace("\n  publications: INITIAL_PUBLICATIONS,\n  projects: INITIAL_PROJECTS,\n", replacement)

    # Add to mergeWithDefaults
    merge_replacement = """
      publications: Array.isArray(parsed.publications) ? parsed.publications : DEFAULT_PORTFOLIO_DATA.publications,
      pillars: Array.isArray(parsed.pillars) ? parsed.pillars : DEFAULT_PORTFOLIO_DATA.pillars,
      metrics: Array.isArray(parsed.metrics) ? parsed.metrics : DEFAULT_PORTFOLIO_DATA.metrics,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects,
"""
    content = content.replace("""
      publications: Array.isArray(parsed.publications) ? parsed.publications : DEFAULT_PORTFOLIO_DATA.publications,
      projects: Array.isArray(parsed.projects) ? parsed.projects : DEFAULT_PORTFOLIO_DATA.projects,
""", merge_replacement)

with open('src/server/db.ts', 'w') as f:
    f.write(content)
