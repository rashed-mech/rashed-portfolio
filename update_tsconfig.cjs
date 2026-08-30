const fs = require('fs');
let c = fs.readFileSync('tsconfig.json', 'utf8');
const data = JSON.parse(c);
if (!data.exclude) {
  data.exclude = [];
}
if (!data.exclude.includes("src/fonts/vfs_tinos.ts")) {
  data.exclude.push("src/fonts/vfs_tinos.ts");
}
fs.writeFileSync('tsconfig.json', JSON.stringify(data, null, 2));
