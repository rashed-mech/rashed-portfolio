import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

old_blocks = """              <p className="text-justify text-black leading-relaxed">
                Hi! I'm Rashedul Islam, a mechanical engineer a native of Cox's Bazar, Bangladesh, with a strong and lasting interest in Computational Fluid Dynamics and hydrogen combustion. I completed my B.Sc. in Mechanical Engineering at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur, and from early on I found myself pulled toward the questions CFD lets you ask- how fuels ignite and burn, how flows behave under pressure and turbulence, and how small changes in geometry or chemistry ripple through a system's performance. That curiosity has stayed with me, and I continue to work with tools like CONVERGE, ANSYS Fluent, and COMSOL Multiphysics to explore combustion and reacting-flow problems, with hydrogen as a fuel of particular interest given its promise for cleaner energy systems.
              </p>
              <div className="pt-4 mt-2 border-t border-slate-200">
                <h4 className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider mb-2">Current Research Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels'].map((interest, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>"""

new_blocks = """              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[0] || profile.bio}
              </p>
              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[1] || "Experienced in electrical system assessment, solar PV integration, generator performance monitoring, and energy efficiency optimization. Proven ability to design, validate, and document energy systems for off-grid and resource-constrained environments."}
              </p>
              <p className="text-justify text-black leading-relaxed">
                {profile.aboutText?.[2] || "Published researcher with hands-on fieldwork in remote energy infrastructure in coastal Bangladesh. Seeking to apply technical energy expertise in support of MSF humanitarian operations in Bangladesh."}
              </p>
              <div className="flex items-center space-x-4 mt-8 mb-4">
                <div className="w-12 sm:w-16 h-[2px] bg-indigo-600"></div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black font-sans">
                  My Current Research Interest
                </h3>
              </div>
              <p className="text-justify text-black leading-relaxed">
                Hi! I'm Rashedul Islam, a mechanical engineer a native of Cox's Bazar, Bangladesh, with a strong and lasting interest in Computational Fluid Dynamics and hydrogen combustion. I completed my B.Sc. in Mechanical Engineering at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur, and from early on I found myself pulled toward the questions CFD lets you ask- how fuels ignite and burn, how flows behave under pressure and turbulence, and how small changes in geometry or chemistry ripple through a system's performance. That curiosity has stayed with me, and I continue to work with tools like CONVERGE, ANSYS Fluent, and COMSOL Multiphysics to explore combustion and reacting-flow problems, with hydrogen as a fuel of particular interest given its promise for cleaner energy systems.
              </p>
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  {['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels'].map((interest, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>"""

if old_blocks in content:
    content = content.replace(old_blocks, new_blocks)
else:
    print("Could not find blocks.")

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
