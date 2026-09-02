with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    """        </div>
      </motion.div>
    </section>""",
    """          </div>
        )}
      </motion.div>
    </section>"""
)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
