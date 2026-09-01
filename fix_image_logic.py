with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

old_logic = """  const projectImages = selectedProject 
    ? (selectedProject.images && selectedProject.images.length > 0 
        ? selectedProject.images 
        : (selectedProject.imageUrl ? [selectedProject.imageUrl] : []))
    : [];"""

new_logic = """  const projectImages = selectedProject 
    ? [
        ...(selectedProject.imageUrl ? [selectedProject.imageUrl] : []),
        ...(selectedProject.images || [])
      ]
    : [];"""

if old_logic in content:
    content = content.replace(old_logic, new_logic)
else:
    print("Could not find old logic to replace")

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
