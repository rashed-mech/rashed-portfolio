const fs = require('fs');
const path = require('path');
const file = path.join(process.cwd(), 'data', 'portfolio_db.json');

if (fs.existsSync(file)) {
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (data.references && data.references.length > 0) {
    if (data.references[0].name.includes('Rasel')) {
      data.references[0].website = 'https://www.ruet.ac.bd/teachers/rasel.me';
    }
    if (data.references[1] && data.references[1].name.includes('Nazmul')) {
      data.references[1].website = 'https://hstu.ac.bd/teacher/nazmul';
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log('Patched database');
  }
} else {
  console.log('DB not found');
}
