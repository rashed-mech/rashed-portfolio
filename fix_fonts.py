import re

with open('src/components/OverviewSection.tsx', 'r') as f:
    content = f.read()

# Increase title font
content = content.replace('text-[14px] font-bold text-slate-900', 'text-base font-bold text-slate-900')

# Increase tag font
content = content.replace('text-xs font-bold text-slate-800 mb-2', 'text-[13px] font-bold text-slate-800 mb-2')

# Increase description font
content = content.replace('text-xs text-slate-700 leading-relaxed', 'text-[13px] sm:text-sm text-slate-700 leading-relaxed')

with open('src/components/OverviewSection.tsx', 'w') as f:
    f.write(content)
