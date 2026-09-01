import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# The block to remove
research_block_regex = r"""              <div className="flex items-center space-x-4 mt-8 mb-4">
                <div className="w-12 sm:w-16 h-\[2px\] bg-indigo-600"></div>
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black font-sans">
                  My Current Research Interest
                </h3>
              </div>
              <p className="text-justify text-black leading-relaxed">
                Hi! I'm Rashedul Islam.*?
              </p>
              <div className="pt-2">
                <div className="flex flex-wrap gap-2">
                  \{\['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels'\].map\(\(interest, idx\) => \(
                    <span key=\{idx\} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
                      \{interest\}
                    </span>
                  \)\)\}
                </div>
              </div>"""

# Find it and remove it
match = re.search(research_block_regex, content, re.DOTALL)
if match:
    block_content = match.group(0)
    content = content.replace(block_content, '')
    
    # We want to insert it after the flex-row container ends.
    # The container ends at:
    #           </div>
    #         </div>
    # 
    #         {/* Overview Heading */}
    
    insert_point = """          </div>
        </div>

        {/* Overview Heading */}"""
        
    new_section = """          </div>
        </div>

        {/* My Current Research Interest - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="w-full mb-16"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 sm:w-16 h-[2px] bg-indigo-600"></div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-black font-sans">
              My Current Research Interest
            </h3>
          </div>
          <p className="text-justify text-black leading-relaxed w-full">
            Hi! I'm Rashedul Islam, a mechanical engineer a native of Cox's Bazar, Bangladesh, with a strong and lasting interest in Computational Fluid Dynamics and hydrogen combustion. I completed my B.Sc. in Mechanical Engineering at Hajee Mohammad Danesh Science and Technology University (HSTU), Dinajpur, and from early on I found myself pulled toward the questions CFD lets you ask- how fuels ignite and burn, how flows behave under pressure and turbulence, and how small changes in geometry or chemistry ripple through a system's performance. That curiosity has stayed with me, and I continue to work with tools like CONVERGE, ANSYS Fluent, and COMSOL Multiphysics to explore combustion and reacting-flow problems, with hydrogen as a fuel of particular interest given its promise for cleaner energy systems.
          </p>
          <div className="pt-4">
            <div className="flex flex-wrap gap-2">
              {['Material Science', 'Additive Manufacturing Materials', 'Renewable Energy', 'Hydrogen Fuel', 'CFD in biofuels'].map((interest, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium rounded-md">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Overview Heading */}"""
        
    content = content.replace(insert_point, new_section)
    print("Replaced successfully")
else:
    print("Could not find the block to extract")

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
