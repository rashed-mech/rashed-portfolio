const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/**/*.tsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Pattern to match:
  // <div className="inline-flex items-center space-x-3">\s*<span className="w-8 h-px bg-gray-400"></span>\s*<span className="text-gray-500 text-xs font-medium tracking-\[0.2em\] uppercase">\s*[IVX]+\.[^<]*\s*</span>\s*</div>
  const regex = /<div className="inline-flex items-center space-x-3">\s*<span className="w-8 h-px bg-gray-400"><\/span>\s*<span className="text-gray-500 text-xs font-medium tracking-\[0\.2em\] uppercase">\s*[IVX]+\.[^<]*\s*<\/span>\s*<\/div>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content);
    console.log('Patched', file);
  }
}
