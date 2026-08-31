with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

start_marker = "{/* Narrative & Impact Highlights */}"
end_marker = "        {/* 4 Core Pillars Grid */}"

import re
start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

replacement = """{/* Narrative & Impact Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-12">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all group shadow-sm shadow-slate-200/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="text-xl sm:text-2xl font-mono font-bold text-indigo-600 group-hover:scale-105 transition-transform origin-left">
                    {m.value}
                  </div>
                  {idx === 0 && (displayCitations > 0 || displayHIndex > 0) && (
                    <div className="flex flex-col items-end text-right">
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                        {displayCitations} Citations
                      </span>
                      <span className="text-[9px] font-mono text-indigo-500 mt-1">
                        h-index {displayHIndex}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-xs font-medium text-gray-900 mt-1">
                  {m.label}
                </div>
              </div>
              <div className="text-[10px] font-mono text-gray-700 mt-3">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

"""

new_content = content[:start_idx] + replacement + content[end_idx:]

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(new_content)
