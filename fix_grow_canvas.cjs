const fs = require('fs');
let file = 'src/components/GrowIdeaCanvas.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert handlePointerUp
const handlersOld = `  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsPouring(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnDropAndPlant(x, y);
  };`;

const handlersNew = `  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsPouring(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnDropAndPlant(x, y);
  };

  const handlePointerUp = () => {
    setIsPouring(false);
  };`;

if (!content.includes('const handlePointerUp = () => {')) {
  content = content.replace(handlersOld, handlersNew);
} else {
    // If it's there but globally out of scope, let's just replace the whole component body carefully
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed handlePointerUp');
