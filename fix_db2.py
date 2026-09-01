import re
with open('src/server/db.ts', 'r') as f:
    content = f.read()

# Remove the bad insert
bad = """        sectionConfig: {
    capabilities: {
      title: "Core Engineering & Simulation Proficiencies",
      subtitle: "Multi-disciplinary expertise uniting renewable techno-economic modeling, dynamic state-space simulation, thermodynamic system analysis, and edge data acquisition."
    },
    projects: {
      title: "Undergraduate Engineering & Mechanical Design Projects",
      subtitle: "Mechanical system design, SolidWorks CAD modeling, high gear ratio transmission kinematics, and assistive electro-mechanical solutions."
    },
    experience: {
      title: "Relevant Experiences & Education",
      subtitle: "Hands-on technical appointments, mechanical systems optimization, field coaching, and mechanical engineering degree."
    },
    publications: {
      title: "Peer-Reviewed Journal Papers, Conference Proceedings & Preprints",
      subtitle: "Scholarly articles published in international journals and conferences covering hybrid microgrid optimization, machine learning diagnostics, solar PV soiling, and battery degradation."
    },
    trainings: {
      title: "Professional Training, Field Visits & Certifications",
      subtitle: "Industrial workshops, power plant field visits, and internationally accredited certifications in energy, materials science, CAD, and quality engineering."
    },
    honors: {
      title: "Honors, Co-Curricular Leadership & Academic References",
      subtitle: "Competitive olympiad awards, university organization leadership, disaster relief volunteering, and academic thesis references."
    }
  },
"""
content = content.replace(bad, "")

with open('src/server/db.ts', 'w') as f:
    f.write(content)
