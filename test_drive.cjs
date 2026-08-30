const https = require('https');
https.get('https://drive.google.com/thumbnail?id=1uHdhS_9toIz1McR5Qn78qE2opogHWl5c&sz=w1000', (res) => {
  console.log("thumbnail:", res.statusCode, res.headers['content-type']);
});
