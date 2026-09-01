import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# Add autoSlideIdx state and useEffect
hook_code = """
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);
  const [autoSlideIdx, setAutoSlideIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setAutoSlideIdx(prev => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
"""
content = content.replace(
    "  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);\n  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);",
    hook_code
)

# Replace the map to include the image carousel logic
card_start_old = """
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
"""

card_start_new = """
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const cardImages = [
              ...(project.imageUrl ? [project.imageUrl] : []),
              ...(project.images || [])
            ];
            
            return (
            <div
"""
content = content.replace(card_start_old, card_start_new)

# Add the image carousel before the header
header_old = '              <div className="space-y-4">\n                {/* Header: Category & Date */}'
header_new = """              <div className="space-y-4">
                {cardImages.length > 0 && (
                  <div className="w-full h-48 -mt-2 mb-4 rounded-xl overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200/60 shadow-inner group-hover:shadow-md transition-all">
                    {cardImages.map((img, i) => (
                      <img
                        key={img}
                        src={formatImageUrl(img)}
                        alt={`${project.title} preview`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          i === (autoSlideIdx % cardImages.length) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                )}
                {/* Header: Category & Date */}"""
content = content.replace(header_old, header_new)

# Close the map block correctly
close_map_old = """
              )}
            </div>
          ))}
        </div>
"""
close_map_new = """
              )}
            </div>
          )})}
        </div>
"""
content = content.replace(close_map_old, close_map_new)

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
