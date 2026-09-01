import re
import glob

for file in glob.glob('src/components/admin/tabs/*.tsx'):
    with open(file, 'r') as f:
        content = f.read()
    
    # We want to replace <Draggable draggableId={something.id} ... with <Draggable key={something.id} draggableId={something.id}
    # It might already have a key in some places (e.g. HighlightsTab used DraggableComponent key={...})
    # So we only replace if key= is not there.
    
    # Using regex: <Draggable draggableId={([^}]+)}
    def replacer(match):
        draggable_id = match.group(1)
        # Check if key is already present in this tag
        # It's safer to just inject key={draggable_id} if there's no key
        return f'<Draggable key={{{draggable_id}}} draggableId={{{draggable_id}}}'
        
    new_content = re.sub(r'<Draggable\s+draggableId={([^}]+)}', replacer, content)
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
