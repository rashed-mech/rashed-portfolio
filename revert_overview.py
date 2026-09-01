import re
with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

# Revert the h-full on the container
content = content.replace('className="h-full p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col group shadow-sm shadow-slate-200/50"', 
                          'className="p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col group shadow-sm shadow-slate-200/50"')

# Revert the sub-heading style
content = content.replace('<div className="text-[11px] font-bold text-slate-800 my-auto text-center px-2 py-3">',
                          '<div className="text-xs font-bold text-slate-800 mb-2">')

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
