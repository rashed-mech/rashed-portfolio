const fs = require('fs');

function patchFile(file, itemsArrayName, renderItemRegex, itemKeyProp, reorderApiCallName) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (content.includes('DragDropContext')) {
    return;
  }
  
  content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';");
  
  // Need to import the reorder API if not already imported
  if (!content.includes(reorderApiCallName)) {
    content = content.replace("} from '../../../api';", `, ${reorderApiCallName} } from '../../../api';`);
  }
  
  // Add onDragEnd function inside the component
  const onDragEndCode = `
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(${itemsArrayName});
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    // Call the original onRefresh to update optimistic state? No, better to update via API then onRefresh
    try {
      setLoading(true); // Wait, loading might not be available, or is it? yes, loading is in all tabs
      await ${reorderApiCallName}(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoading(false);
    }
  };
`;
  content = content.replace('const [loading, setLoading] = useState(false);', 'const [loading, setLoading] = useState(false);' + onDragEndCode);
  
  // Wrap the items list
  // Finding where the map happens
  // We'll have to manually supply a patch for the rendering part.
  
  fs.writeFileSync(file, content);
}
// I will apply this logic manually per file by creating custom rewrite scripts.
