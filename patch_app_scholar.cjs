const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace loadData to fetch scholar stats if profile.social.scholar exists
const oldLoadData = `      const publicData = await fetchPortfolioData();
      setData(publicData);`;

const newLoadData = `      const publicData = await fetchPortfolioData();
      
      // Auto-update Google Scholar stats
      if (publicData.profile?.social?.scholar) {
        try {
          fetch(\`/api/scholar/stats?url=\${encodeURIComponent(publicData.profile.social.scholar)}\`)
            .then(res => res.json())
            .then(resData => {
              if (resData.success && resData.data) {
                setData(prev => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    profile: {
                      ...prev.profile,
                      stats: {
                        ...prev.profile.stats,
                        citations: resData.data.citations,
                        hIndex: resData.data.hIndex
                      }
                    }
                  };
                });
              }
            }).catch(e => console.warn('Silent scholar sync failed', e));
        } catch(e) {}
      }

      setData(publicData);`;

content = content.replace(oldLoadData, newLoadData);
fs.writeFileSync('src/App.tsx', content);
