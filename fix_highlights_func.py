import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

# Let's find the start of the function
start = content.find("const updatePillar = (id: string, field: keyof CorePillar, value: string) => {")
end = content.find("};", start) + 2

if start != -1:
    new_func = """const updatePillar = (id: string, field: keyof CorePillar, value: string) => {
    if (field === 'galleryUrls') {
      const urls = value.split('\\n').map(u => u.trim()).filter(Boolean);
      setPillars(pillars.map(p => p.id === id ? { ...p, galleryUrls: urls } : p));
    } else {
      setPillars(pillars.map(p => p.id === id ? { ...p, [field]: value } : p));
    }
  };"""
    content = content[:start] + new_func + content[end:]
    
    # Also fix placeholder
    content = content.replace('placeholder="https://example.com/image1.jpghttps://example.com/image2.jpg"', 'placeholder="https://example.com/image1.jpg\\nhttps://example.com/image2.jpg"')
    
    with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
        f.write(content)
