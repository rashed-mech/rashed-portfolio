import React, { useState } from 'react';
import { Reorder } from 'motion/react';
export function App() {
  const [items, setItems] = useState([1, 2, 3]);
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item} value={item}>
          {item}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
