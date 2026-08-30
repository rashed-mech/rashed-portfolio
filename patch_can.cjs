const fs = require('fs');
let file = 'src/components/GrowIdeaCanvas.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldCan = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4a2 2 0 1 0 0 4h5a2 2 0 1 0 0-4h-5z" />
      <path d="M12 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8" />
      <path d="M6 10l5-3" />
      <circle cx="4" cy="11" r="2" />
    </svg>`;

const newCan = `<svg width="50" height="50" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <path d="M42 26C52 22 56 32 50 40" stroke="#fda4af" strokeWidth="4" strokeLinecap="round"/>
      {/* Spout */}
      <path d="M18 36L4 20" stroke="#fda4af" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="4" cy="20" rx="2" ry="6" fill="#f43f5e" transform="rotate(45 4 20)" />
      {/* Body */}
      <path d="M40 54L22 54C19 54 16 51 16 48L18 24C18 21 21 18 24 18L38 18C41 18 44 21 44 24L46 48C46 51 43 54 40 54Z" fill="#fda4af"/>
      {/* Top opening */}
      <ellipse cx="31" cy="18" rx="10" ry="3" fill="#fb7185"/>
    </svg>`;

content = content.replace(oldCan, newCan);
fs.writeFileSync(file, content, 'utf8');
console.log('Patched Watering Can SVG');
