
const puppeteer = require('puppeteer');
const dataBase = require('./database');
const translate = require('./translate');

const client = dataBase.connectElastic();

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

let browser, page;
async function launchBrowser() {
  browser = await puppeteer.launch(/* { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" } */);
  page = await browser.newPage();
}

async function getWebContent(url) {
  if (url === '') return '';
  await page.goto(url);
  const html = await page.evaluate(() => {
    return document.querySelector('body').outerHTML;
  })
  return html;
}

function getContent(html, start_str, end_str) {
  if (start_str + end_str === '') return '';
  let regexGetContent = new RegExp(`${start_str}(.*?)${end_str}`);
  let match = html.match(regexGetContent);
  let content = match ? match[1] : null;
  if (content === null) {
    throw new Error(`1.Failed to get content between "${start_str}" and "${end_str}"`);
  }
  return content;
}

function getLink(html, website, start_str, end_str) {
  if (start_str + end_str === '') return '';
  let content = getContent(html, start_str, end_str);
  let contentFormat = content.replace(/"/g, "'");
  let regexGetLink = new RegExp(`href='(.*?)'`);
  let match = contentFormat.match(regexGetLink);
  let link = match ? match[1] : null
  if (link === null) {
    throw new Error(`2.Failed to get link between "${start_str}" and "${end_str}" Content inside: "${contentFormat}"`);
  }
  if (link.includes(website)) {
    return link;
  } else {
    return website + link;
  }
}

async function main() {
  await launchBrowser();
  while (1 === 1) {
    const body = await client.search({
      index: 'fe_hsoc_crawler_setting',
      size: 1000
    });
    const inputs = body.hits.hits;
    for (const input of inputs) {
      let data = {
        "website": input._source.website,
        'topic':input._source.topic_name,
        "language": input._source.language,
        "link": '',
        "title_en": '',
        "title_vn": '',
        "timestamp": '',
        "author": '',
      }
      let html = await getWebContent(input._source.topic_link, page);
      let link = getLink(html, input._source.website, input._source.link_start, input._source.link_end);
      let article = await getWebContent(link);
      let title = getContent(article, input._source.title_start, input._source.title_end);
      let author = getContent(article, input._source.author_start, input._source.author_end);
      let timestamp = getCurrentDate();
      data['title_'+data.language]=title;
      data['link'] = link;
      data['author'] = author;
      data['timestamp'] = timestamp;
      /* switch (data.language){
        case 'vn':
              data['title_en'] = translate.vnToEn(title);
        case 'en':
              data['title_vn'] = translate.enToVn(title);
      } */
   
      console.log(data);
      await dataBase.sendOutputDoc('fe_hsoc_secnews_2023', data);
    }
    await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
  }
  await browser.close();
}

main();