import re

with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

old_block = """                  {idx === 0 && (displayCitations > 0 || displayHIndex > 0) && (
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                        {displayCitations} Citations
                      </span>
                      <span className="text-[9px] font-mono text-indigo-500 mt-1">
                        h-index {displayHIndex}
                      </span>
                    </div>
                  )}"""

new_block = """                  {idx === 0 && (displayCitations > 0 || displayHIndex > 0) && (
                    <div className="flex flex-col items-end text-right">
                      <div className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-2.5 py-1 rounded-lg shadow-sm group-hover:bg-indigo-500 transition-colors">
                        <span className="text-sm font-bold font-sans">{displayCitations}</span>
                        <span className="text-[9px] uppercase tracking-widest font-semibold opacity-90">Citations</span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-slate-500 mt-1.5">
                        h-index: <span className="font-bold text-indigo-600">{displayHIndex}</span>
                      </span>
                    </div>
                  )}"""

if old_block in content:
    new_content = content.replace(old_block, new_block)
    with open('src/components/OverviewSection.tsx', 'w') as f:
        f.write(new_content)
    print("Patched successfully")
else:
    print("Could not find the old block")
