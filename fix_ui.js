const fs = require('fs');
const path = require('path');

// 1. Fix App.tsx background
const appFile = './src/App.tsx';
let appContent = fs.readFileSync(appFile, 'utf8');
appContent = appContent.replace(/bg-slate-50/, 'bg-[#e4e7eb]');
appContent = appContent.replace(/bg-white/, 'bg-white/85 backdrop-blur-md');
fs.writeFileSync(appFile, appContent);

// 2. Fix index.css for selection issue
const cssFile = './src/index.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');
if (!cssContent.includes('::selection')) {
  cssContent += `
::selection {
  background-color: #a5b4fc;
  color: #1e1b4b;
}
::-moz-selection {
  background-color: #a5b4fc;
  color: #1e1b4b;
}
`;
  fs.writeFileSync(cssFile, cssContent);
}

// 3. Update components for 85% transparency on white backgrounds
const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace standard card backgrounds
  content = content.replace(/bg-white border/g, 'bg-white/85 backdrop-blur-md border');
  content = content.replace(/bg-slate-50 border/g, 'bg-white/60 backdrop-blur-md border');
  
  // Replace header background
  if (file === 'Header.tsx') {
    content = content.replace(/bg-white\/90/g, 'bg-[#e4e7eb]/85 backdrop-blur-lg');
  }
  
  // Replace footer background
  if (file === 'Footer.tsx') {
    content = content.replace(/bg-white/g, 'bg-transparent');
  }

  fs.writeFileSync(filePath, content);
});

console.log("UI updates applied successfully.");
