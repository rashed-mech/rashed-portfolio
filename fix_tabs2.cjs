const fs = require('fs');

let t = fs.readFileSync('src/components/admin/tabs/TrainingsTab.tsx', 'utf8');
const badT = `            {tr.credentialUrl && (
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>`;

const goodT = `            {tr.credentialUrl && (
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
    </div>
  )}
</Draggable>
))}
{provided.placeholder}
</div>
)}
</Droppable>
</DragDropContext>`;

t = t.replace(badT, goodT);
// But wait! `badT` might have been altered by `fix_tabs.cjs` earlier!
