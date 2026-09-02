import re

with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    """    {
      icon: Flame,
      title: 'Hydrogen & CFD Simulation',
      tag: 'CONVERGE 3.0 · ANSYS Fluent · SolidWorks',
      description: 'Combustion modeling of green hydrogen vs conventional fuels in PFI SI engines, thermo-hydraulic heat exchanger modeling, and atomistic molecular dynamics.'
    },""",
    """    {
      icon: Flame,
      title: 'Computation Fluid Dynamics',
      tag: 'CONVERGE 3.0 · ANSYS Fluent · SolidWorks',
      description: 'Combustion modeling of green hydrogen vs conventional fuels in PFI SI engines, thermo-hydraulic heat exchanger modeling, and atomistic molecular dynamics.',
      galleryUrls: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
      ]
    },"""
)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
