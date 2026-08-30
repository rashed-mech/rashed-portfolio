const fs = require('fs');

let content = fs.readFileSync('src/components/admin/tabs/TrainingsTab.tsx', 'utf8');

// The messed up end
const badEnd = `              )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;
content = content.replace(badEnd, `        ))}\n      </div>`);

// Now patch properly
const oldGrid = `<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="trainings-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {trainings.map((tr, index) => (
                <Draggable key={tr.id} draggableId={tr.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-5 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start space-x-3">
                            <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                              <GripVertical className="w-5 h-5" />
                            </div>`;

const newGrid = `<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="trainings-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {trainings.map((tr, index) => (
                <Draggable key={tr.id} draggableId={tr.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-5 rounded-2xl bg-slate-800 border border-slate-700 shadow-sm flex flex-col justify-between"
                    >
                      <div className="flex items-start space-x-3">
                        <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="space-y-2.5 flex-1">
                          <div className="flex items-start justify-between gap-2">`;
content = content.replace(oldGrid, newGrid);

const oldListEnd = `              </div>
            )}
          </div>
        ))}
      </div>`;

const newListEnd = `              </div>
            )}
          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;
content = content.replace(oldListEnd, newListEnd);

fs.writeFileSync('src/components/admin/tabs/TrainingsTab.tsx', content);
