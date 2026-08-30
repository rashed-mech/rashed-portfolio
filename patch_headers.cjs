const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We have a few variants, so let's match carefully. 
  // e.g. "— I. OVERVIEW"
  // Some might not have "— " at the end if the developer manually typed it differently, but the previous grep showed "— I. OVERVIEW" etc.
  // Actually, some have "— " at both ends or just at the beginning. 
  // Let's replace the outer container manually, capturing whatever is inside the span and stripping any leading/trailing dashes.
  
  const regex = /<div className="inline-flex items-center space-x-2">\s*<span className="text-indigo-600 font-mono text-xs font-semibold tracking-widest uppercase">\s*(.*?)\s*<\/span>\s*<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, (match, p1) => {
      // Clean up dashes from the matched text (p1)
      let cleanTitle = p1.replace(/—/g, '').trim();
      return `<div className="inline-flex items-center space-x-3">
            <span className="w-8 h-px bg-gray-400"></span>
            <span className="text-gray-500 text-xs font-medium tracking-[0.2em] uppercase">
              ${cleanTitle}
            </span>
          </div>`;
    });
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
