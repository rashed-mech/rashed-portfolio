import re

def update_modal(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Make modal bigger
    content = content.replace('max-w-4xl', 'max-w-6xl')
    
    # Add click to view full size for TrainingSection
    if 'currentModalObj.imageUrl' in content:
        old_img = """<img 
                  key={currentModalObj.imageUrl}
                  src={formatImageUrl(currentModalObj.imageUrl)} 
                  alt={currentModalObj.title} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
                />"""
        new_img = """<img 
                  key={currentModalObj.imageUrl}
                  src={formatImageUrl(currentModalObj.imageUrl)} 
                  alt={currentModalObj.title} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                  title="Click to view full size in new tab"
                  onClick={() => window.open(formatImageUrl(currentModalObj.imageUrl), '_blank')}
                />"""
        content = content.replace(old_img, new_img)

    # Add click to view full size for ProjectsSection
    if 'projectImages[selectedSlideIdx]' in content:
        old_img = """<img 
                  key={projectImages[selectedSlideIdx]}
                  src={formatImageUrl(projectImages[selectedSlideIdx])} 
                  alt={`${selectedProject.title} preview`} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
                />"""
        new_img = """<img 
                  key={projectImages[selectedSlideIdx]}
                  src={formatImageUrl(projectImages[selectedSlideIdx])} 
                  alt={`${selectedProject.title} preview`} 
                  className="w-full h-full object-contain p-2 animate-in fade-in duration-300 cursor-pointer hover:opacity-90 transition-opacity"
                  title="Click to view full size in new tab"
                  onClick={() => window.open(formatImageUrl(projectImages[selectedSlideIdx]), '_blank')}
                />"""
        content = content.replace(old_img, new_img)

    with open(filepath, 'w') as f:
        f.write(content)

update_modal('src/components/TrainingSection.tsx')
update_modal('src/components/ProjectsSection.tsx')

