const fs = require('fs');

let content = fs.readFileSync('src/components/admin/tabs/ProjectsTab.tsx', 'utf8');

// Imports
content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';\nimport { GripVertical } from 'lucide-react';");
content = content.replace("deleteProjectAPI } from '../../../api';", "deleteProjectAPI, reorderProjectsAPI } from '../../../api';");

// onDragEnd
const onDragEndCode = `
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(filtered);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    try {
      setLoading(true);
      await reorderProjectsAPI(newItems.map(item => item.id));
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

// Wrapping list
const oldGrid = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className={\`p-5 rounded-2xl border \${proj.featured ? 'bg-indigo-900/10 border-indigo-500/30' : 'bg-slate-800 border-slate-700'} shadow-sm flex flex-col justify-between group\`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">`;

const newGrid = `<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {filtered.map((proj, index) => (
                <Draggable key={proj.id} draggableId={proj.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={\`p-5 rounded-2xl border \${proj.featured ? 'bg-indigo-900/10 border-indigo-500/30' : 'bg-slate-800 border-slate-700'} shadow-sm flex flex-col justify-between group\`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start space-x-3">
                            <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5" />
                            </div>`;

content = content.replace(oldGrid, newGrid);

const oldListEnd = `        ))}
      </div>`;

const newListEnd = `              )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;

content = content.replace(oldListEnd, newListEnd);

fs.writeFileSync('src/components/admin/tabs/ProjectsTab.tsx', content);
