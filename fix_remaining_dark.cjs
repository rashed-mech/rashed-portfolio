const fs = require('fs');

const files = [
  'src/components/admin/tabs/CertificationsTab.tsx',
  'src/components/admin/tabs/TrainingsTab.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/dark:text-indigo-400/g, '');
  content = content.replace(/dark:border-slate-600/g, '');
  content = content.replace(/dark:hover:bg-indigo-900\/50/g, 'hover:bg-indigo-900/50');
  content = content.replace(/dark:hover/g, ''); 
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed remaining dark prefixes');
