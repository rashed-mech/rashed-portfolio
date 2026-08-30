const fs = require('fs');
const path = require('path');

const sections = [
  'OverviewSection.tsx',
  'CapabilitiesSection.tsx',
  'ProjectsSection.tsx',
  'ExperienceSection.tsx',
  'PublicationsSection.tsx',
  'TrainingSection.tsx',
  'HonorsAndActivitiesSection.tsx',
  'ContactSection.tsx'
];

for (const file of sections) {
  const filePath = path.join('src/components', file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes("framer-motion")) {
    // Inject import
    content = content.replace("import React", "import { motion } from 'framer-motion';\nimport React");
    
    // Replace <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> with motion.div
    const targetDiv = '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">';
    if (content.includes(targetDiv)) {
      content = content.replace(targetDiv, `<motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >`);
      // We need to replace the corresponding closing </div>.
      // Easiest is to replace the very last </div></section>
      content = content.replace("</div>\n    </section>", "</motion.div>\n    </section>");
      content = content.replace("</div>\n      {/* Certificate Preview Modal", "</motion.div>\n      {/* Certificate Preview Modal");
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Animated ${file}`);
  }
}
