const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/admin/tabs/**/*.tsx');
files.forEach(file => {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('<Draggable ')) {
    c = c.replace(/<Draggable(\s+key=\{[^}]+\})\s+draggableId=\{([^}]+)\}\s+index=\{([^}]+)\}>/g, '<Draggable draggableId={$2} index={$3}>');
    c = c.replace(/<Draggable\s+draggableId=\{([^}]+)\}\s+index=\{([^}]+)\}\s+key=\{[^}]+\}>/g, '<Draggable draggableId={$1} index={$2}>');
    fs.writeFileSync(file, c);
  }
});
