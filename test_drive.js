const https = require('https');
https.get('https://drive.google.com/thumbnail?id=1uHdhS_9toIz1McR5Qn78qE2opogHWl5c&sz=w800', (res) => {
  console.log(res.statusCode);
  console.log(res.headers['content-type']);
});
https.get('https://drive.google.com/uc?export=view&id=1uHdhS_9toIz1McR5Qn78qE2opogHWl5c', (res) => {
  console.log("uc view:", res.statusCode, res.headers['content-type']);
});
