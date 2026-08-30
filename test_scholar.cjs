const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  const url = 'https://scholar.google.com/citations?user=lCyuApIAAAAJ&hl=en&authuser=1';
  console.log('Fetching', url);
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });
    
    const html = response.data;
    const $ = cheerio.load(html);
    
    const citationsMap = {};
    
    $('.gsc_a_tr').each((i, el) => {
      const title = $(el).find('.gsc_a_at').text().trim();
      const citationText = $(el).find('.gsc_a_ac').text().trim();
      const citationCount = parseInt(citationText, 10);
      
      if (title && !isNaN(citationCount)) {
        citationsMap[title.toLowerCase()] = citationCount;
      }
    });
    
    console.log(citationsMap);
  } catch(e) {
    console.error('Failed:', e.message);
    if(e.response) {
      console.error('Status:', e.response.status);
    }
  }
}
test();
