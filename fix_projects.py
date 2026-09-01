import re

with open('src/types.ts', 'r') as f:
    types = f.read()
if 'images?: string[];' not in types:
    types = types.replace('imageUrl?: string;', 'imageUrl?: string;\n  images?: string[];')
    with open('src/types.ts', 'w') as f:
        f.write(types)

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# Add selectedSlideIdx state
content = content.replace(
    'const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);',
    'const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);\n  const [selectedSlideIdx, setSelectedSlideIdx] = useState(0);'
)

# Reset slide index when opening
content = content.replace(
    'onClick={() => setSelectedProjectIdx(idx)}',
    'onClick={() => {\n                setSelectedProjectIdx(idx);\n                setSelectedSlideIdx(0);\n              }}'
)

# Remove Live preview
remove_live_preview = """                {projects[selectedProjectIdx].liveUrl && (
                  <a 
                    href={projects[selectedProjectIdx].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto text-center inline-flex justify-center items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-600/20 active:scale-95"
                  >
                    Live Preview <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}"""
content = content.replace(remove_live_preview, '')

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)
