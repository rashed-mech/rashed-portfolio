const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const routeCode = `
  app.get('/api/scholar/stats', async (req: Request, res: Response) => {
    try {
      const scholarUrl = req.query.url as string;
      if (!scholarUrl) {
        return res.status(400).json({ success: false, message: 'Google Scholar URL is required.' });
      }

      const response = await fetch(scholarUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });
      
      if (!response.ok) {
        throw new Error(\`Scholar responded with status: \${response.status}\`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      let citations = null;
      let hIndex = null;

      const cells = $('#gsc_rsb_st td.gsc_rsb_std');
      if (cells.length >= 2) {
        citations = parseInt($(cells[0]).text().trim(), 10);
        hIndex = parseInt($(cells[2]).text().trim(), 10);
      }

      if (citations !== null && hIndex !== null && !isNaN(citations) && !isNaN(hIndex)) {
        res.json({ success: true, data: { citations, hIndex } });
      } else {
        res.status(500).json({ success: false, message: 'Could not parse Scholar stats' });
      }
    } catch (err: any) {
      console.error("Scholar stats error:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  });
`;

if (!content.includes('/api/scholar/stats')) {
  // Insert before `/api/scholar/sync`
  const syncRoute = "app.get('/api/scholar/sync'";
  if (content.includes(syncRoute)) {
    content = content.replace(syncRoute, routeCode + '\n  ' + syncRoute);
    fs.writeFileSync('server.ts', content);
  }
}
