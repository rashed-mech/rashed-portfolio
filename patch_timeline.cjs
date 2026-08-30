const fs = require('fs');
let content = fs.readFileSync('src/components/admin/tabs/TimelineTab.tsx', 'utf8');

content = content.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';\nimport { GripVertical } from 'lucide-react';");
content = content.replace("deleteEducationAPI } from '../../../api';", "deleteEducationAPI, reorderExperiencesAPI, reorderEducationsAPI } from '../../../api';");

const onDragEndCode = `
  const onDragEndExp = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(experience);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    try {
      setLoadingExp(true);
      await reorderExperiencesAPI(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoadingExp(false);
    }
  };

  const onDragEndEdu = async (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    if (sourceIndex === destinationIndex) return;

    const newItems = Array.from(education);
    const [reorderedItem] = newItems.splice(sourceIndex, 1);
    newItems.splice(destinationIndex, 0, reorderedItem);

    try {
      setLoadingEdu(true);
      await reorderEducationsAPI(newItems.map(item => item.id));
      showToast('Reordered successfully');
      onRefresh();
    } catch (err: any) {
      showToast(err.message || 'Failed to reorder', 'error');
    } finally {
      setLoadingEdu(false);
    }
  };
`;
// find where to insert onDragEndCode
content = content.replace('const [loadingEdu, setLoadingEdu] = useState(false);', 'const [loadingEdu, setLoadingEdu] = useState(false);' + onDragEndCode);

// Patch Experience List
const oldExpGrid = `<div className="space-y-4">
            {experience.map(exp => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">`;
const newExpGrid = `<DragDropContext onDragEnd={onDragEndExp}>
        <Droppable droppableId="exp-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {experience.map((exp, index) => (
                <Draggable key={exp.id} draggableId={exp.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-5 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>`;
content = content.replace(oldExpGrid, newExpGrid);

// Close Experience List
const oldExpListEnd = `              </div>
            ))}
          </div>`;
const newExpListEnd = `              )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;
content = content.replace(oldExpListEnd, newExpListEnd);


// Patch Education List
const oldEduGrid = `<div className="space-y-4">
            {education.map(edu => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">`;
const newEduGrid = `<DragDropContext onDragEnd={onDragEndEdu}>
        <Droppable droppableId="edu-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {education.map((edu, index) => (
                <Draggable key={edu.id} draggableId={edu.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-5 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-5 h-5" />
                          </div>`;
content = content.replace(oldEduGrid, newEduGrid);

// Close Education List
const oldEduListEnd = `              </div>
            ))}
          </div>`;
const newEduListEnd = `              )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;
content = content.replace(oldEduListEnd, newEduListEnd);

fs.writeFileSync('src/components/admin/tabs/TimelineTab.tsx', content);
