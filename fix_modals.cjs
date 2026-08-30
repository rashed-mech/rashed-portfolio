const fs = require('fs');

const files = [
  'src/components/admin/tabs/CertificationsTab.tsx',
  'src/components/admin/tabs/TrainingsTab.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace classes
  content = content.replace(/bg-white dark:bg-slate-900/g, 'bg-slate-800');
  content = content.replace(/text-slate-900 dark:text-slate-100/g, 'text-white');
  content = content.replace(/text-slate-900 dark:text-white/g, 'text-white');
  content = content.replace(/bg-slate-50 dark:bg-slate-950/g, 'bg-slate-900/90');
  content = content.replace(/border-slate-300 dark:border-slate-700/g, 'border-slate-700');
  content = content.replace(/border-slate-200 dark:border-slate-800/g, 'border-slate-700');
  content = content.replace(/text-slate-700 dark:text-slate-300/g, 'text-slate-300');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-slate-400');
  content = content.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-slate-800');
  content = content.replace(/border-slate-100 dark:border-slate-800/g, 'border-slate-700');
  content = content.replace(/bg-slate-900\/50 backdrop-blur-sm/g, 'bg-black/60 backdrop-blur-sm');
  content = content.replace(/text-slate-900/g, 'text-white'); // Catch any stray text-slate-900 inside the modal
  content = content.replace(/text-slate-700/g, 'text-slate-300'); // Catch any stray text-slate-700

  // For the input text fields, add explicit text-white if not present
  // A generic way is to ensure all inputs have text-white
  content = content.replace(/className="([^"]*)bg-slate-900\/90([^"]*)"/g, function(match, p1, p2) {
    if (!p1.includes('text-white') && !p2.includes('text-white')) {
      return `className="${p1}text-white bg-slate-900/90${p2}"`;
    }
    return match;
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
