const fs = require('fs');
let file = 'src/components/ContactSection.tsx';
let c = fs.readFileSync(file, 'utf8');

// 1. Remove state and effect for showContact
const hooksRegex = /  const \[isEngaged, setIsEngaged\] = useState\(false\);\n  const \[showContact, setShowContact\] = useState\(false\);\n\n  useEffect\(\(\) => \{\n    let timeout: NodeJS\.Timeout;\n    if \(isEngaged\) \{\n[\s\S]*?\} else \{\n      setShowContact\(false\);\n    \}\n    return \(\) => clearTimeout\(timeout\);\n  \}, \[isEngaged\]\);/;

c = c.replace(hooksRegex, '  const [isEngaged, setIsEngaged] = useState(false);');

// 2. Remove AnimatePresence and motion.div wrappers
const ctaRegex = /<AnimatePresence>\s*\{showContact && \(\s*<motion\.div\s*initial=\{\{ opacity: 0, height: 0, marginTop: 0 \}\}\s*animate=\{\{ opacity: 1, height: 'auto', marginTop: 24 \}\}\s*exit=\{\{ opacity: 0, height: 0, marginTop: 0 \}\}\s*transition=\{\{ duration: 0\.4, type: 'spring', bounce: 0\.2 \}\}\s*className="overflow-hidden"\s*>\s*(<div className="bg-slate-900[\s\S]*?<\/div>)\s*<\/motion\.div>\s*\)\}\s*<\/AnimatePresence>/;

c = c.replace(ctaRegex, '<div className="mt-6 overflow-hidden">\n              $1\n            </div>');

fs.writeFileSync(file, c);
