const puppeteer = require('puppeteer');
const inputs = require('./input.js');

async function launchBrowser() {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  const page = await browser.newPage();
  return { browser, page };
}

async function getWebContent(page, url) {
  await page.goto(url);
  await page.waitForSelector('body');
  const html = await page.content();
  return html;
}

function getContent(html, startStr, endStr) {
  const regexGetContent = new RegExp(`${startStr}(.*?)${endStr}`);
  const match = html.match(regexGetContent);
  if (!match) {
    throw new Error(`Failed to get content between "${startStr}" and "${endStr}"`);
  }
  return match[1];
}

function getLink(html, website, startStr, endStr) {
  const content = getContent(html, startStr, endStr);
  const contentFormat = content.replace(/"/g, "'");
  const regexGetLink = new RegExp(`href='(.*?)'`);
  const match = contentFormat.match(regexGetLink);
  if (!match) {
    throw new Error(`Failed to get link between "${startStr}" and "${endStr}" Content inside: "${contentFormat}"`);
  }
  const link = match[1];
  return link.includes(website) ? link : website + link;
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  return `${day} ${month} ${year}`;
}

async function scrapeData(input, page) {
  const { website, topicLink, linkStart, linkEnd, titleStart, titleEnd, authorStart, authorEnd } = input;
  const html = await getWebContent(page, topicLink);
  const link = getLink(html, website, linkStart, linkEnd);
  const article = await getWebContent(page, link);
  const title = getContent(article, titleStart,
