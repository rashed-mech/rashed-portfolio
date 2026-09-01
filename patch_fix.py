import re
with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

# Revert my bad change
bad1 = "{/* @ts-ignore */}\n                    <Draggable draggableId={pillar.id} index={index} key={pillar.id}>"
bad2 = "{/* @ts-ignore */}\n                    <Draggable draggableId={metric.id} index={index} key={metric.id}>"

content = content.replace(bad1, "<Draggable draggableId={pillar.id} index={index} key={pillar.id as any}>")
content = content.replace(bad2, "<Draggable draggableId={metric.id} index={index} key={metric.id as any}>")

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
