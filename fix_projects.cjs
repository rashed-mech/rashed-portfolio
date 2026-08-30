const fs = require('fs');

let content = fs.readFileSync('src/components/admin/tabs/ProjectsTab.tsx', 'utf8');

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
const oldGrid = `<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">`;

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
                      className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center justify-between text-xs">`;
content = content.replace(oldGrid, newGrid);

const oldListEnd = `              </div>
            </div>
          </div>
        ))}
      </div>`;

const newListEnd = `              </div>
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

fs.writeFileSync('src/components/admin/tabs/ProjectsTab.tsx', content);
