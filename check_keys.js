const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.tsx');
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /\.map\(\s*\([^)]*\)\s*=>\s*\(\s*<([a-zA-Z0-9_]+)([^>]*)>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const tag = match[1];
    const attributes = match[2];
    if (tag !== 'React.Fragment' && !attributes.includes('key={')) {
      console.log(`${file}: Missing key on <${tag}> in map`);
    }
  }
});
