const https = require('https');
const fs = require('fs');

https.get('https://ibb.co/JjbZy2fw', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
      fs.writeFileSync('img_url.txt', match[1]);
      console.log('Saved: ' + match[1]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
