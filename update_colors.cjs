const fs = require('fs');
const path = require('path');

const directory = 'src/components';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(directory, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace slate text colors with darker variants for better contrast on gray bg
  content = content.replace(/text-slate-900/g, 'text-black');
  content = content.replace(/text-slate-800/g, 'text-gray-900');
  content = content.replace(/text-slate-700/g, 'text-gray-900');
  content = content.replace(/text-slate-600/g, 'text-gray-800');
  content = content.replace(/text-slate-500/g, 'text-gray-700');
  
  fs.writeFileSync(filePath, content);
}

// Do the same for App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
appContent = appContent.replace(/text-slate-900/g, 'text-black');
fs.writeFileSync('src/App.tsx', appContent);

console.log("Colors updated.");
