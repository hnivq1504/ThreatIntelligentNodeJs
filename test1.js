const https = require('https');
const cheerio = require('cheerio');

const url = 'https://www.cve.org/Media/News/item/news/2023/04/11/Halborn-Added-as-CNA';

https.get(url, (res) => {
  let html = '';
  res.on('data', (chunk) => {
    html += chunk;
  });

  res.on('end', () => {
    const $ = cheerio.load(html);
    const title = $('title').text();
    console.log(title);
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
