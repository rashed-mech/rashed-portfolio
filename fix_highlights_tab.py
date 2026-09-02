import re

with open('src/components/admin/tabs/HighlightsTab.tsx', 'r') as f:
    content = f.read()

new_ui = """                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-slate-400 mb-1">Icon Name (Lucide React)</label>
                              <input
                                type="text"
                                value={pillar.icon}
                                onChange={(e) => updatePillar(pillar.id, 'icon', e.target.value)}
                                className="w-full md:w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-slate-400 mb-1">Gallery Image URLs (One URL per line - for Modal Carousel)</label>
                              <textarea
                                value={(pillar.galleryUrls || []).join('\\n')}
                                onChange={(e) => updatePillar(pillar.id, 'galleryUrls', e.target.value as any)}
                                rows={2}
                                placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>"""

content = content.replace(
    """                            <div className="md:col-span-2">
                              <label className="block text-xs font-medium text-slate-400 mb-1">Icon Name (Lucide React)</label>
                              <input
                                type="text"
                                value={pillar.icon}
                                onChange={(e) => updatePillar(pillar.id, 'icon', e.target.value)}
                                className="w-full md:w-1/3 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              />
                            </div>""",
    new_ui
)

# And modify updatePillar to handle galleryUrls mapping
update_func = """  const updatePillar = (id: string, field: keyof CorePillar, value: string) => {
    if (field === 'galleryUrls') {
      const urls = value.split('\\n').map(u => u.trim()).filter(Boolean);
      setPillars(pillars.map(p => p.id === id ? { ...p, galleryUrls: urls } : p));
    } else {
      setPillars(pillars.map(p => p.id === id ? { ...p, [field]: value } : p));
    }
  };"""

content = re.sub(
    r"  const updatePillar = \(id: string, field: keyof CorePillar, value: string\) => \{\s+setPillars\(pillars.map\(p => p.id === id \? \{ ...p, \[field\]: value \} : p\)\);\s+\};",
    update_func,
    content
)

with open('src/components/admin/tabs/HighlightsTab.tsx', 'w') as f:
    f.write(content)
