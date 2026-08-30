const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const types = [
  { name: 'Trainings', url: 'trainings', method: 'reorderTrainings' },
  { name: 'Experiences', url: 'experience', method: 'reorderExperiences' },
  { name: 'Educations', url: 'education', method: 'reorderEducations' },
  { name: 'Projects', url: 'projects', method: 'reorderProjects' }
];

for (const t of types) {
  const route = `/api/admin/${t.url}/reorder`;
  if (!content.includes(route)) {
    const fn = `
app.put('/api/admin/${t.url}/reorder', authenticateAdmin, (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'Invalid payload' });
    }
    const updated = db.${t.method}(orderedIds);
    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
`;
    // Find the place where `/api/admin/certifications/reorder` is defined and insert after it
    const certRoute = "app.put('/api/admin/certifications/reorder'";
    if (content.includes(certRoute)) {
      // Find the closing brace of that route
      const startIdx = content.indexOf(certRoute);
      const endIdx = content.indexOf('});', startIdx);
      content = content.slice(0, endIdx + 3) + fn + content.slice(endIdx + 3);
    }
  }
}

fs.writeFileSync('server.ts', content);
