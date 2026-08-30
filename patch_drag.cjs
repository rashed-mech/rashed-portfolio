const fs = require('fs');
let file = 'src/components/GrowIdeaCanvas.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace pointerMove and pointerDown
const oldHandlers = `  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsPouring(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add drop
    const dropId = Date.now();
    setDrops(prev => [...prev, { id: dropId, x, y }]);
    
    // Wait for drop to fall then grow plant
    setTimeout(() => {
      setDrops(prev => prev.filter(d => d.id !== dropId));
      
      const plantTypes: ('daisy' | 'lavender' | 'sprout')[] = ['daisy', 'lavender', 'sprout'];
      const randomType = plantTypes[Math.floor(Math.random() * plantTypes.length)];
      const randomScale = 0.6 + Math.random() * 0.6;
      
      setPlants(prev => [...prev, { id: dropId, x, type: randomType, scale: randomScale }]);
    }, 600); // match drop animation duration
  };`;

const newHandlers = `  const lastDropTime = useRef(0);

  const spawnDropAndPlant = (x: number, y: number) => {
    const now = Date.now();
    if (now - lastDropTime.current < 150) return; // throttle pouring
    lastDropTime.current = now;

    // The drop should come from the watering can's spout which is approx (x-40, y-30) when centered
    const startX = x - 20;
    const startY = y - 20;
    const dropId = now;
    
    setDrops(prev => [...prev, { id: dropId, x: startX, y: startY }]);
    
    setTimeout(() => {
      setDrops(prev => prev.filter(d => d.id !== dropId));
      
      const plantTypes: ('daisy' | 'lavender' | 'sprout')[] = ['daisy', 'lavender', 'sprout'];
      const randomType = plantTypes[Math.floor(Math.random() * plantTypes.length)];
      const randomScale = 0.5 + Math.random() * 0.7;
      
      setPlants(prev => {
        // Prevent overlapping too much
        const isTooClose = prev.some(p => Math.abs(p.x - startX) < 20);
        if (isTooClose && Math.random() > 0.3) return prev;
        return [...prev, { id: dropId, x: startX, type: randomType, scale: randomScale }];
      });
    }, 600);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    
    if (isPouring) {
      spawnDropAndPlant(x, y);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsPouring(true);
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnDropAndPlant(x, y);
  };`;

content = content.replace(oldHandlers, newHandlers);
fs.writeFileSync(file, content, 'utf8');
console.log('Patched dragging and pouring.');
