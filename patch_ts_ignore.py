import re
with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

content = content.replace("<Draggable draggableId={pillar.id} index={index} key={pillar.id}>", "{/* @ts-ignore */}\n                    <Draggable draggableId={pillar.id} index={index} key={pillar.id}>")
content = content.replace("<Draggable draggableId={metric.id} index={index} key={metric.id}>", "{/* @ts-ignore */}\n                    <Draggable draggableId={metric.id} index={index} key={metric.id}>")

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
