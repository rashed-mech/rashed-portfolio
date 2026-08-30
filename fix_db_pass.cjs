const fs = require('fs');
const file = 'data/portfolio_db.json';
if (fs.existsSync(file)) {
  let db = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (db.adminConfig) {
    db.adminConfig.passwordHashOrPlain = 'admin@rashed1998';
    fs.writeFileSync(file, JSON.stringify(db, null, 2));
    console.log('Updated db');
  }
}
