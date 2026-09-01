import re
with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

bad = '<div className="text-xs font-bold text-slate-800 my-3 text-center bg-slate-100/80 py-1.5 rounded border border-slate-200">'
good = '<div className="text-[11px] font-bold text-slate-800 my-auto text-center px-2 py-3">'

content = content.replace(bad, good)
content = content.replace('p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col group shadow-sm shadow-slate-200/50', 'h-full p-4 sm:p-5 rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 hover:border-indigo-300 transition-all flex flex-col group shadow-sm shadow-slate-200/50')

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
