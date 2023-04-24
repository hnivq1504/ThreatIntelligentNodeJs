const puppeteer = require('puppeteer');
const fs = require('fs');
const inputs = require('./input.js');

function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
}


const URL = "https://www.cve.org/Media/News/AllNews";

let browser, page;

async function launchBrowser() {
    browser = await puppeteer.launch();
    page = await browser.newPage();
}

function readInput() {
    const input = inputs.inputs[0];

    const website = input.website;
    const topic_link = input.topic_link;
    const start_str = input.start_str;
    const end_str = input.end_str;


    return { website, topic_link, start_str, end_str };
}

async function getWebContent(url) {
    await page.goto(url);
    const html = await page.evaluate(() => {
        return document.documentElement.outerHTML;
    });
    return html;
}

function getLink(html, start_str, end_str, website) {
    const regexLinkZone = new RegExp(`${start_str}(.*?)${end_str}`);
    const match = html.match(regexLinkZone);
    const linkZone = match ? match[1] : null;
    const linkZoneFormat = linkZone.replace(/"/g, "'");
    const regexLink = new RegExp(`href='(.+?)'`);
    const link = linkZoneFormat.match(regexLink);
    if (link[1].includes(website) == true) {
        return link[1];
    }
    else {
        return website + link[1];
    }
}

function getContent(html, start_str, end_str) {
    const regex = new RegExp(`${start_str}(.*?)${end_str}`);
    const match = html.match(regex);
    const content = match ? match[1] : null;
    return result;
}

async function getDetail(url) {
    await page.goto(url);

    const author = null;
    const tag = null;
    const linkWebsite = null;
    const linkArticle = url;
    const title = await page.$eval('h1.title', element => element.textContent);
    const timestamp = getCurrentDate();

    const article = {
        "Website": linkWebsite,
        "Link": linkArticle,
        "Title": title,
        "Timestamp": timestamp,
        "Author": author,
        "Tag": tag,
    };
    return article;
}

async function main() {

    while (1 === 1) {
        //get ds cau hinh trang web tu elastic
        for (ds) {
            //   xu ly tuwng site
            //-lay du lieu : neu xay ra loi thi cap nhat vao elastic (loi layu link, lay title)
            //cap nhat vao elastic
        }
        //delay 1 phut

    }
    const { website, start_str, end_str } = readInput();
    await launchBrowser();
    const document = await getWebContent(URL);
    const linkArticle = await getLink(document);
    const webcontent = getWebContent(linkArticle);
    const title = await getContent(webcontent, title_start, title_end)
    '
    const detail = await getDetail(linkArticle);
    await browser.close();
}

main();
