const fs = require('fs');
let content = fs.readFileSync('src/server/db.ts', 'utf-8');

content = content.replace(
  "modules: ['Phase Diagrams', 'Hardening, Polymers, Properties', 'Electrical Properties and Semiconductors', 'Ceramics and Composites']",
  "modules: [\n      { title: 'Phase Diagrams' },\n      { title: 'Hardening, Polymers, Properties' },\n      { title: 'Electrical Properties and Semiconductors' },\n      { title: 'Ceramics and Composites' }\n    ]"
);

fs.writeFileSync('src/server/db.ts', content);
