
const puppeteer = require('puppeteer');
const inputs = require('./input.js');

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
    for (const input of inputs.inputs) {
      let html = await getWebContent(input.topic_link, page);
      let link = getLink(html, input.website, input.link_start, input.link_end);
      let article = await getWebContent(link);
      let title = getContent(article, input.title_start, input.title_end);
      let author = getContent(article, input.author_start, input.author_end);
      let timestamp = getCurrentDate();
      let data = {
        "Website": input.website,
        "Link": link,
        "Title": title,
        "Timestamp": timestamp,
        "Author": author,
      }
      console.log(data);
    }
  }

  await browser.close();

}

main();