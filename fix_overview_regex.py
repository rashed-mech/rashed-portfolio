import re
with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

content = re.sub(
    r'(\s+)</div>\s*</motion\.div>\s*</section>',
    r'\1</div>\1)}\n      </motion.div>\n    </section>',
    content
)

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
