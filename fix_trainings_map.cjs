const fs = require('fs');

let content = fs.readFileSync('src/components/admin/tabs/TrainingsTab.tsx', 'utf8');

// The start of the list to the end of DragDropContext
const listStart = content.indexOf('<DragDropContext onDragEnd={onDragEnd}>');
const listEnd = content.indexOf('</DragDropContext>') + '</DragDropContext>'.length;

const goodList = `<DragDropContext onDragEnd={onDragEnd}>
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
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-sm font-bold text-white">
                                {tr.title}
                              </h3>
                              <p className="text-xs font-mono text-indigo-400">
                                {tr.issuer}
                              </p>
                            </div>
                            <div className="flex space-x-2 shrink-0">
                              <button
                                onClick={() => openEdit(tr)}
                                className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(tr.id, tr.title)}
                                className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {tr.description && (
                            <p className="text-xs text-slate-300 line-clamp-3">
                              {tr.description}
                            </p>
                          )}
                          {tr.skillsAcquired && tr.skillsAcquired.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {tr.skillsAcquired.map((s, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {tr.credentialUrl && (
                            <div className="mt-3 pt-2 border-t border-slate-700">
                              <a
                                href={tr.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1 text-[11px] font-mono text-indigo-400 hover:underline"
                              >
                                <span>Verification Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
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

content = content.substring(0, listStart) + goodList + content.substring(listEnd);
fs.writeFileSync('src/components/admin/tabs/TrainingsTab.tsx', content);
