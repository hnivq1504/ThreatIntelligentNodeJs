const puppeteer = require('puppeteer');
const inputs = require('./input.js');

function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  return `${day} ${month} ${year}`;
}

async function getWebContent(url, page) {
  await page.goto(url);
  await page.waitForSelector('body');
  const html = await page.content();
  return html;
}

function getContent(html, start_str, end_str) {
  let regexGetContent = new RegExp(`${start_str}(.*?)${end_str}`);
  let match = html.match(regexGetContent);
  let content = match ? match[1] : null;
  if (content === null) {
    throw new Error(`Failed to get content between "${start_str}" and "${end_str}"`);
  }
  return content;
}

function getLink(html, website, start_str, end_str) {
  let content = getContent(html, start_str, end_str);
  let contentFormat = content.replace(/"/g, "'");
  let regexGetLink = new RegExp(`href='(.*?)'`);
  let match = contentFormat.match(regexGetLink);
  let link = match ? match[1] : null
  if (link === null) {
    throw new Error(`Failed to get link between "${start_str}" and "${end_str}" Content inside: "${contentFormat}"`);
  }
  if (link.includes(website)) {
    return link;
  } else {
    return website + link;
  }
}

async function main() {
  for (const input of inputs.inputs) {
    const browser = await puppeteer.launch(/* { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" } */);
    const page = await browser.newPage();
    try {
      let html = await getWebContent(input.topic_link, page);
      let link = getLink(html, input.website, input.link_start, input.link_end);
      let article = await getWebContent(link, page);
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
      console.log(data); // or save the data to a file or database
    } catch (error) {
      console.error(error.message);
    } finally {
      await browser.close();
    }
  }
}

main();