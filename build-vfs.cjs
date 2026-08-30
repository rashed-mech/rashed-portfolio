const fs = require('fs');

const fonts = [
  'Tinos-Regular.ttf',
  'Tinos-Bold.ttf',
  'Tinos-Italic.ttf',
  'Tinos-BoldItalic.ttf'
];

const vfs = {};

for (const font of fonts) {
  const path = `src/fonts/${font}`;
  if (fs.existsSync(path)) {
    vfs[font] = fs.readFileSync(path).toString('base64');
  } else {
    console.error(`Font not found: ${path}`);
  }
}

const content = `export const vfsTinos = ${JSON.stringify(vfs, null, 2)};`;
fs.writeFileSync('src/fonts/vfs_tinos.ts', content);
console.log('Successfully generated src/fonts/vfs_tinos.ts');
