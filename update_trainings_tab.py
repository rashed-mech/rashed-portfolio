import re

with open('src/components/admin/tabs/TrainingsTab.tsx', 'r') as f:
    content = f.read()

# Add galleryUrls state init
content = content.replace(
    """  const [formData, setFormData] = useState<Partial<Training>>({
    title: '',
    issuer: '',
    year: '',
    credentialUrl: '',
    description: '',
    skillsAcquired: []
  });""",
    """  const [formData, setFormData] = useState<Partial<Training>>({
    title: '',
    issuer: '',
    year: '',
    credentialUrl: '',
    description: '',
    galleryUrls: [],
    skillsAcquired: []
  });"""
)

content = content.replace(
    """    setFormData({
      title: tr.title,
      issuer: tr.issuer,
      year: tr.year,
      credentialUrl: tr.credentialUrl || '',
      description: tr.description || '',
      skillsAcquired: tr.skillsAcquired || []
    });""",
    """    setFormData({
      title: tr.title,
      issuer: tr.issuer,
      year: tr.year,
      credentialUrl: tr.credentialUrl || '',
      description: tr.description || '',
      galleryUrls: tr.galleryUrls || [],
      skillsAcquired: tr.skillsAcquired || []
    });"""
)

content = content.replace(
    """  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      year: '',
      credentialUrl: '',
      description: '',
      skillsAcquired: []
    });""",
    """  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      year: '',
      credentialUrl: '',
      description: '',
      galleryUrls: [],
      skillsAcquired: []
    });"""
)

# Add galleryUrls input
gallery_input = """              <div>
                <label className="text-xs font-semibold text-slate-300">Gallery Image URLs (One URL per line - for Modal Carousel)</label>
                <textarea
                  rows={2}
                  value={(formData.galleryUrls || []).join('\\n')}
                  onChange={(e) => setFormData({ ...formData, galleryUrls: e.target.value.split('\\n').map(u => u.trim()).filter(Boolean) })}
                  placeholder="https://example.com/image1.jpg\\nhttps://example.com/image2.jpg"
                  className="w-full mt-1 px-3 py-2 text-xs text-white bg-slate-900/90 border border-slate-700 rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300">Description</label>"""

content = content.replace(
    """              <div>
                <label className="text-xs font-semibold text-slate-300">Description</label>""",
    gallery_input
)

with open('src/components/admin/tabs/TrainingsTab.tsx', 'w') as f:
    f.write(content)
