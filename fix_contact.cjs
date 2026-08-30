const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(/<AnimatePresence>[\s\S]*?\{showContact && \([\s\S]*?<motion\.div[\s\S]*?className="overflow-hidden"[\s\S]*?>/g, '<div className="mt-6 overflow-hidden">');
c = c.replace(/<\/motion\.div>\s*\}\)\s*<\/AnimatePresence>/g, '</div>');

// also remove `const [showContact, setShowContact] = useState(false);` and its use in useEffect
c = c.replace(/const \[showContact, setShowContact\] = useState\(false\);\n?/g, '');
// For the useEffect, let's just find and replace the whole block since it only deals with timeout and showContact
const effectRegex = /useEffect\(\(\) => \{[\s\S]*?\}, \[isEngaged\]\);\n?/g;
c = c.replace(effectRegex, '');

fs.writeFileSync(file, c);
