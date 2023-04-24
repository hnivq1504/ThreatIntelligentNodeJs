//declare module
const puppeteer = require('puppeteer');
const inputs = require('./input.js');

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  return `${day} ${month} ${year}`;
}

let browser, page;
async function launchBrowser() {
  browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  page = await browser.newPage();
}

async function getWebContent(url) {
  await page.goto(url);
  const html = await page.evaluate(() => {
    return document.querySelector('body').outerHTML;
  })
  await browser.close();
  return html;
}

function getContent(html, start_str, end_str) {
  let regexGetContent = new RegExp(`${start_str}(.*?)${end_str}`);
  let match = html.match(regexGetContent);
  let content = match ? match[1] : null;
  try {
    if (content === null) {
      throw new Error(`Failed to get content between "${start_str}" and "${end_str}"`);
    }
    return content;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

function getLink(html, website, start_str, end_str) {
  let content = getContent(html, start_str, end_str);
  let contentFormat = content.replace(/"/g, "'");
  let regexGetLink = new RegExp(`href='(.*?)'`);
  let match = contentFormat.match(regexGetLink);
  let link = match ? match[1] : null
  try {
    if (link === null) {
      throw new Error(`Failed to get link between "${start_str}" and "${end_str}" Content inside: "${contentFormat}"`);
    }
    if (link.includes(website) == true) {
      return link;
    }
    else {
      return website + link;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function main() {
  while (1 === 1) {
    await launchBrowser();
    for (const input of inputs.inputs) {
      let { website, topic_link, link_start, link_end,
        title_start, title_end, author_start, author_end } = input;
      let html = await getWebContent(input.topic_link);
      let link = getLink(html, input.website, input.link_start, input.link_end);
      let article = await getWebContent(link);
      let title = getContent(article, input.title_start, input.title_end);
      let author = getContent(article, input.author_start, input.author_end);
      let tag = getContent(article, input.tag_start, input.tag_end);
      let timestamp = getCurrentDate();
      let data = {
        "Website": input.website,
        "Link": link,
        "Title": title,
        "Timestamp": timestamp,
        "Author": author,
        "Tag": tag,
      }
    }
    await browser.close()
  }
  // await launchBrowser();
  // let webContent = await getWebContent('https://threatpost.com/category/vulnerabilities/')
  // let link = getLink(webContent, 'https://threatpost.com/', 'class="c-card__title"', '">');
  // // let content = getContent(webContent,'class="media-content"','class=""')
  // console.log(link);
  // await browser.close();
}

main();