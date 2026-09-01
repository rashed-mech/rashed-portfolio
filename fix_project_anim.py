import re

with open('src/components/ProjectsSection.tsx', 'r') as f:
    content = f.read()

# 1. Update setInterval to 3500
content = content.replace("3000);", "3500);")

# 2. Update image carousel to slide like certificates
old_carousel = """                {cardImages.length > 0 && (
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
                )}"""

new_carousel = """                {cardImages.length > 0 && (
                  <div 
                    className="w-full h-48 -mt-2 mb-4 rounded-xl overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200/60 shadow-inner group-hover:shadow-md transition-all cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(idx);
                      setSelectedSlideIdx(autoSlideIdx % cardImages.length);
                    }}
                  >
                    <div 
                      className="flex h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                      style={{ transform: `translateX(-${(autoSlideIdx % cardImages.length) * 100}%)` }}
                    >
                      {cardImages.map((img, i) => (
                        <div 
                          key={img}
                          className="w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${formatImageUrl(img)})` }}
                        />
                      ))}
                    </div>
                  </div>
                )}"""
content = content.replace(old_carousel, new_carousel)

# 3. Change project title color and make it explicit trigger
old_title = """                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-indigo-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="text-gray-700 font-mono text-[11px] shrink-0 mt-1.5">{project.date}</span>
                  )}
                </div>"""

new_title = """                <div className="flex items-start justify-between gap-3">
                  <h3 
                    className="text-base sm:text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors leading-snug cursor-pointer underline decoration-indigo-300 underline-offset-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectIdx(idx);
                      setSelectedSlideIdx(0);
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="text-gray-700 font-mono text-[11px] shrink-0 mt-1.5">{project.date}</span>
                  )}
                </div>"""
content = content.replace(old_title, new_title)

# Let's remove the onClick and cursor-pointer from the main card container to stop accidental clicks anywhere on the text
old_card_container = """              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50 cursor-pointer"
              id={`project-card-${project.id}`}
              onClick={() => {
                setSelectedProjectIdx(idx);
                setSelectedSlideIdx(0);
              }}"""
new_card_container = """              className="p-6 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-sm shadow-slate-200/50"
              id={`project-card-${project.id}`}"""
content = content.replace(old_card_container, new_card_container)

with open('src/components/ProjectsSection.tsx', 'w') as f:
    f.write(content)

