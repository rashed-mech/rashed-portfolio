const fs = require('fs');
let file = 'src/components/GrowIdeaCanvas.tsx';
let content = fs.readFileSync(file, 'utf8');

const wateringCanCode = `
const WateringCan = ({ x, y, active }: { x: number, y: number, active: boolean }) => (
  <motion.div
    className="absolute pointer-events-none z-40"
    animate={{ 
      x: x - 60, 
      y: y - 60, 
      rotate: active ? -45 : 0 
    }}
    transition={{ type: 'spring', damping: 20, stiffness: 300, rotate: { duration: 0.2 } }}
  >
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4a2 2 0 1 0 0 4h5a2 2 0 1 0 0-4h-5z" />
      <path d="M12 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8" />
      <path d="M6 10l5-3" />
      <circle cx="4" cy="11" r="2" />
    </svg>
  </motion.div>
);
`;

// Insert the WateringCan code before the main component
content = content.replace('export const GrowIdeaCanvas', wateringCanCode + '\nexport const GrowIdeaCanvas');

// Add mouse state
const mouseStateCode = `
  const [drops, setDrops] = useState<Drop[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPouring, setIsPouring] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
`;
content = content.replace(/const \[drops.*useRef<HTMLDivElement>\(null\);/s, mouseStateCode);

// update pointer down to also set pouring
const pointerDownOld = `const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;`;

const pointerDownNew = `const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsPouring(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;`;

content = content.replace(pointerDownOld, pointerDownNew);

const pointerUpNew = `
  const handlePointerUp = () => {
    setIsPouring(false);
  };
`;

content = content.replace('return (', pointerUpNew + '\n  return (');

// modify div to use the handlers and show the watering can
const containerOld = `    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="relative w-full h-[500px] bg-[#0f172a] overflow-hidden cursor-crosshair rounded-2xl shadow-xl select-none"
    >`;

const containerNew = `    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-[400px] sm:h-[500px] bg-[#0f172a] overflow-hidden cursor-none rounded-3xl shadow-xl select-none"
    >
      <WateringCan x={mousePos.x} y={mousePos.y} active={isPouring} />
`;

content = content.replace(containerOld, containerNew);

fs.writeFileSync(file, content, 'utf8');
console.log('Patched canvas for watering can.');
