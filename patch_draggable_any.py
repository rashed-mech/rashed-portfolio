import re
with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

# Replace the broken syntax
bad1 = "{/* @ts-expect-error key is allowed by React */}\n<Draggable draggableId={pillar.id} index={index} key={pillar.id}>"
bad2 = "{/* @ts-expect-error key is allowed by React */}\n<Draggable draggableId={metric.id} index={index} key={metric.id}>"

content = content.replace(bad1, "<DraggableComponent key={pillar.id} draggableId={pillar.id} index={index}>")
content = content.replace(bad2, "<DraggableComponent key={metric.id} draggableId={metric.id} index={index}>")

content = content.replace("</Draggable>", "</DraggableComponent>")

if "const DraggableComponent = Draggable as any;" not in content:
    content = content.replace("export const HighlightsTab", "const DraggableComponent = Draggable as any;\n\nexport const HighlightsTab")

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
