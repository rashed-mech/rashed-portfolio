const fs = require('fs');
let file = 'src/components/admin/tabs/TrainingsTab.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/hover:bg-slate-100 :bg-slate-800/g, 'hover:bg-slate-700/50 hover:text-white');
content = content.replace(/hover:text-indigo-600/g, 'hover:text-indigo-400');
content = content.replace(/hover:text-red-600/g, 'hover:text-red-400');

fs.writeFileSync(file, content, 'utf8');

file = 'src/components/admin/tabs/CertificationsTab.tsx';
content = fs.readFileSync(file, 'utf8');
content = content.replace(/hover:text-indigo-600 hover:bg-indigo-50/g, 'hover:text-indigo-400 hover:bg-slate-700/50');
content = content.replace(/hover:text-red-400 hover:bg-red-50/g, 'hover:text-red-400 hover:bg-slate-700/50');
fs.writeFileSync(file, content, 'utf8');

console.log('Fixed hovers');
