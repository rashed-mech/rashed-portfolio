const fs = require('fs');
function autoClose(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<\/\s*Draggable\s*>/g, '</div></div></div></div></Draggable>'); // Just a hack? No, let's just do it manually.
}
