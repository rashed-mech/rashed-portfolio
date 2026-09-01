with open('src/components/CapabilitiesSection.tsx', 'r') as f:
    content = f.read()

# First replace all pink- with blue-
content = content.replace('pink-', 'blue-')

# Then fix the specific card background that got altered
content = content.replace('bg-blue-50/95 backdrop-blur-sm border border-blue-100 hover:border-blue-300', 
                          'bg-white border border-slate-200 hover:border-blue-300')

with open('src/components/CapabilitiesSection.tsx', 'w') as f:
    f.write(content)
