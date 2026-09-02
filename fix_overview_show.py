import re

with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    """        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">""",
    """        {/* 4 Core Pillars Grid */}
        {data?.sectionConfig?.overview?.showPillars !== false && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">"""
)

# And then we need to close it. We need to find the end of that block.
# Let's search for "      </motion.div>\n\n      {/* Gallery Modal */}"
content = content.replace(
    """        </div>
      </motion.div>

      {/* Gallery Modal */}""",
    """          </div>
        )}
      </motion.div>

      {/* Gallery Modal */}"""
)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)

