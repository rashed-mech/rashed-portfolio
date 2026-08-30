const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminLogin.tsx', 'utf8');

// Remove initial states
code = code.replace("useState('admin')", "useState('')");
code = code.replace("useState('adminpassword123')", "useState('')");

// Remove the Quick Credentials Helper block
const helperRegex = /\{\/\* Quick Credentials Helper \*\/\}(.|\n)*?(?=\<\/div\>\n\s*\<\/div\>\n\s*\<\/div\>)/;
code = code.replace(helperRegex, '');

fs.writeFileSync('src/components/admin/AdminLogin.tsx', code);
console.log('Patched AdminLogin.tsx');
