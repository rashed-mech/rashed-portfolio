const fs = require('fs');

let content = fs.readFileSync('src/components/admin/tabs/TimelineTab.tsx', 'utf8');

// The start of the Experience list to the end of DragDropContext
const expStart = content.indexOf('<DragDropContext onDragEnd={onDragEndExp}>');
const expEnd = content.indexOf('</DragDropContext>', expStart) + '</DragDropContext>'.length;

const goodExp = `<DragDropContext onDragEnd={onDragEndExp}>
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
                      <div className="flex items-start space-x-3">
                        <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                                <span>{exp.role}</span>
                                {exp.current && (
                                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 uppercase">Current</span>
                                )}
                              </h3>
                              <div className="text-xs text-indigo-400 font-mono">{exp.organization}</div>
                              <div className="text-xs text-slate-400">{exp.period} | {exp.location}</div>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => openExpEdit(exp)} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleExpDelete(exp.id)} className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {exp.description && (
                            <p className="mt-3 text-xs text-slate-300 line-clamp-2">{exp.description}</p>
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
content = content.substring(0, expStart) + goodExp + content.substring(expEnd);

const eduStart = content.indexOf('<DragDropContext onDragEnd={onDragEndEdu}>');
const eduEnd = content.indexOf('</DragDropContext>', eduStart) + '</DragDropContext>'.length;

const goodEdu = `<DragDropContext onDragEnd={onDragEndEdu}>
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
                      <div className="flex items-start space-x-3">
                        <div {...provided.dragHandleProps} className="pt-1 text-slate-500 hover:text-slate-300 cursor-grab active:cursor-grabbing">
                          <GripVertical className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="text-sm font-bold text-white">{edu.degree}</h3>
                              <div className="text-xs text-indigo-400 font-mono">{edu.institution}</div>
                              <div className="text-xs text-slate-400">{edu.year}</div>
                              {edu.result && <div className="text-[11px] font-mono text-emerald-400 mt-1">{edu.result}</div>}
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => openEduEdit(edu)} className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEduDelete(edu.id)} className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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
content = content.substring(0, eduStart) + goodEdu + content.substring(eduEnd);

fs.writeFileSync('src/components/admin/tabs/TimelineTab.tsx', content);
