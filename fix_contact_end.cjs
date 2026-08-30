const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>/g, '</div>');
c = c.replace(/<\/motion\.div>\s*\}\s*\)\s*<\/AnimatePresence>/g, '</div>');
c = c.replace(/<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>/m, '</div>');
c = c.replace(/<\/motion\.div>\s*\}\s*\)\s*<\/AnimatePresence>/m, '</div>');
c = c.replace(/<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>/g, '</div>'); // wait, the syntax was `)}` 
c = c.replace(/<\/motion\.div>\s*\}\s*\)\s*<\/AnimatePresence>/g, '</div>');

// let's just do a simpler replace
c = c.replace(/<\/motion\.div>\s*}\)\s*<\/AnimatePresence>/g, '</div>');
c = c.replace(/<\/motion\.div>\s*}\)\s*<\/AnimatePresence>/m, '</div>');

fs.writeFileSync(file, c);
