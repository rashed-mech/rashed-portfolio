const fs = require('fs');

const files = [
  'src/components/admin/tabs/CertificationsTab.tsx',
  'src/components/admin/tabs/TrainingsTab.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Strip all dynamic dark: classes and prefer the dark side, or just replace specific ones.
  // Actually, replacing specific ones is safer.
  
  // CertificationsTab & TrainingsTab
  content = content.replace(/bg-indigo-50 dark:bg-indigo-900\/30/g, 'bg-indigo-900/30');
  content = content.replace(/text-indigo-600 dark:text-indigo-400/g, 'text-indigo-400');
  content = content.replace(/text-slate-500 dark:text-slate-400/g, 'text-slate-400');
  content = content.replace(/bg-slate-50 dark:bg-slate-800/g, 'bg-slate-800');
  content = content.replace(/border-slate-200 dark:border-slate-600/g, 'border-slate-700');
  content = content.replace(/border-slate-200 dark:border-slate-700/g, 'border-slate-700');
  content = content.replace(/text-slate-600 dark:text-slate-300/g, 'text-slate-300');
  content = content.replace(/text-slate-600 dark:text-slate-400/g, 'text-slate-400');
  content = content.replace(/hover:bg-indigo-100 dark:hover:bg-indigo-900\/50/g, 'hover:bg-indigo-900/50');
  content = content.replace(/hover:bg-indigo-100 dark:hover:bg-indigo-950\/60/g, 'hover:bg-indigo-950/60');
  content = content.replace(/hover:text-slate-900 dark:hover:text-white/g, 'hover:text-white');
  content = content.replace(/hover:text-indigo-700 dark:hover:text-indigo-300/g, 'hover:text-indigo-300');
  content = content.replace(/text-indigo-700 dark:text-indigo-300/g, 'text-indigo-300');
  
  // Also any bg-slate-50 without dark might be there
  content = content.replace(/className="([^"]*)bg-slate-50([^"]*)"/g, function(match, p1, p2) {
    // wait, we replaced some above, let's just make it bg-slate-900/90
    return `className="${p1}bg-slate-900/90${p2}"`;
  });
  
  // And the modal button in TrainingsTab
  content = content.replace(/hover:text-slate-600 dark:hover:text-slate-200/g, 'hover:text-slate-200');
  content = content.replace(/bg-indigo-50 dark:bg-indigo-950\/60/g, 'bg-indigo-950/60');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed dark prefixes');
