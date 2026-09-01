with open('server.ts', 'r') as f:
    content = f.read()

route = """
  app.post('/api/admin/section-config', verifyAuth, (req: Request, res: Response) => {
    try {
      const { sectionConfig } = req.body;
      db.updateSectionConfig(sectionConfig);
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating section config:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
"""

content = content.replace("  app.post('/api/admin/trainings', verifyAuth, (req: Request, res: Response) => {", 
                          route + "\n  app.post('/api/admin/trainings', verifyAuth, (req: Request, res: Response) => {")

with open('server.ts', 'w') as f:
    f.write(content)
