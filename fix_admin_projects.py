import re

with open('src/components/admin/tabs/ProjectsTab.tsx', 'r') as f:
    content = f.read()

# Update EMPTY_PROJ
if "imageUrl: ''," not in content:
    content = content.replace("  technologies: [],", "  technologies: [],\n  imageUrl: '',\n  images: [],")

# Update formData assignment when editing
if "setTechInput(proj.technologies.join(', '));" in content:
    pass # we can inject state logic for image fields if we needed local state, but we don't. We just use formData.imageUrl and formData.images
    
# We need to add the input fields to the form
# Let's insert them right before the GitHub/Live URL fields

new_fields = """
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Image URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Additional Image URLs (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.images?.join('\\n') || ''}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value.split('\\n').filter(url => url.trim() !== '') })}
                  placeholder="https://...\\nhttps://..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white resize-y"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
"""

content = content.replace('              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">\n                <div>\n                  <label className="block text-xs font-semibold text-slate-300 mb-1">\n                    GitHub Repository URL', new_fields + '                <div>\n                  <label className="block text-xs font-semibold text-slate-300 mb-1">\n                    GitHub Repository URL')

with open('src/components/admin/tabs/ProjectsTab.tsx', 'w') as f:
    f.write(content)
