const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the inline-flex container and the blue span
  const regex = /<div className="inline-flex items-center space-x-2">\s*<span className="text-indigo-600 font-mono text-xs font-semibold tracking-widest uppercase">\s*— (.*?)\s*<\/span>\s*<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, `<div className="inline-flex items-center space-x-3">
            <span className="w-8 h-px bg-gray-400"></span>
            <span className="text-gray-500 text-xs font-medium tracking-[0.2em] uppercase">
              $1
            </span>
          </div>`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
