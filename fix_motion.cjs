const fs = require('fs');
const path = require('path');

const directory = 'src/components';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes("'framer-motion'")) {
    content = content.replace(/'framer-motion'/g, "'motion/react'");
    fs.writeFileSync(filePath, content);
  }
}
