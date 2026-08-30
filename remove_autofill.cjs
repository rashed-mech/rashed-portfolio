const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminLogin.tsx', 'utf8');

const regex = /const autofillCredentials = \([^\{]*\{[\s\S]*?\};\n/g;
code = code.replace(regex, '');
fs.writeFileSync('src/components/admin/AdminLogin.tsx', code);
console.log('Removed autofillCredentials');
