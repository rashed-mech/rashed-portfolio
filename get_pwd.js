const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/portfolio_db.json', 'utf8'));
console.log('Admin user:', data.adminConfig?.username);
console.log('Admin password:', data.adminConfig?.passwordHashOrPlain);
