import re
with open('server.ts', 'r') as f:
    content = f.read()

if "/api/admin/section-config" not in content:
    server_route = """
app.post('/api/admin/section-config', requireAdmin, async (req, res) => {
  try {
    const { sectionConfig } = req.body;
    db.getData().sectionConfig = sectionConfig;
    db.sync();
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
"""
    content = content.replace("app.post('/api/admin/metrics'", server_route + "\napp.post('/api/admin/metrics'")
    with open('server.ts', 'w') as f:
        f.write(content)
