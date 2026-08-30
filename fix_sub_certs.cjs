const fs = require('fs');

const file = 'src/components/admin/tabs/CertificationsTab.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/bg-slate-50 dark:bg-slate-800\/50/g, 'bg-slate-800/50');
content = content.replace(/border-slate-200 dark:border-slate-700/g, 'border-slate-700');
content = content.replace(/bg-red-100/g, 'bg-red-950/80');
content = content.replace(/text-red-600/g, 'text-red-400');
content = content.replace(/text-indigo-600 hover:text-indigo-700/g, 'text-indigo-400 hover:text-indigo-300');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed sub-certificates styles');
