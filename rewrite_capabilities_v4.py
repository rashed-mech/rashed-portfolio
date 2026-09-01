with open('src/components/CapabilitiesSection.tsx', 'r') as f:
    content = f.read()

# Replace blue with pink for accents
content = content.replace('blue-', 'pink-')
content = content.replace('emerald-', 'pink-')

# Specifically replace the card background
# className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
# We want it to be whitish pink with 95% opacity.
# In Tailwind: bg-pink-50/95 or bg-rose-50/95. Let's use bg-pink-50/95.

content = content.replace('bg-white border border-slate-200 hover:border-pink-300', 
                          'bg-pink-50/95 backdrop-blur-sm border border-pink-100 hover:border-pink-300')

with open('src/components/CapabilitiesSection.tsx', 'w') as f:
    f.write(content)
