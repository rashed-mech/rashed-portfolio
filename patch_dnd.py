import re
with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

bad1 = "<Draggable draggableId={pillar.id} index={index} key={pillar.id as any}>"
good1 = "{/* @ts-expect-error key is allowed by React */}\n<Draggable draggableId={pillar.id} index={index} key={pillar.id}>"

bad2 = "<Draggable draggableId={metric.id} index={index} key={metric.id as any}>"
good2 = "{/* @ts-expect-error key is allowed by React */}\n<Draggable draggableId={metric.id} index={index} key={metric.id}>"

content = content.replace(bad1, good1)
content = content.replace(bad2, good2)

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
