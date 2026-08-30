const fs = require('fs');

function fixSyntax(file) {
  let content = fs.readFileSync(file, 'utf8');
  // I know the error is an extra `</div>` or unbalanced `</div>`.
  // Let's replace:
  /*
            )}
          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
  */
  // For TrainingsTab:
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/Draggable>/g, "</div></div></div>)}\n</Draggable>");
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/Draggable>/g, "</div></div></div></div>)}\n</Draggable>");
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/Draggable>/g, "</div></div>)}\n</Draggable>");
  fs.writeFileSync(file, content);
}

// Wait, the safest is to count <div> and </div> inside Draggable!
// But how?
