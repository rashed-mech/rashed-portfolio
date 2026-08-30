const fs = require('fs');
const file = 'data/portfolio_db.json';
const raw = fs.readFileSync(file, 'utf8');
const data = JSON.parse(raw.replace(/[\x00-\x1F\x7F-\x9F]/g, ""));
if (data.adminConfig) {
  data.adminConfig.passwordHashOrPlain = 'admin@rashed1998';
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('Password updated successfully in DB');
} else {
  console.log('No adminConfig in DB');
}
