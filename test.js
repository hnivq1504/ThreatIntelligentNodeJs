const puppeteer = require("puppeteer-core");

const url = "https://www.cve.org/Media/News/AllNews";
const excutePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";

async function test() {
    const browser = await puppeteer.launch({
        executablePath: excutePath,
        headless: false,
        defaultViewport: {
            width: 1200,
            height: 800
        }
    });
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.evaluate(() => {
        const anchorTags = Array.from(document.querySelectorAll('a'));
        const filterAnchorTags = anchorTags.filter(tag => {
            return tag.href && tag.href.includes('/Media/News/item/news');
        });
        const url = filterAnchorTags.map(tag => tag.href);
        return url;
    });
    
    console.log(links)



    // const link = await page.$eval('a[href')
    // const [element] = await page.$x("/html/body/div/div/div/div/div[1]/main/div/div[1]/article/div/div/h2/a");
    // if (element) {
    //     await element.click();
    //     const pageTitle = await page.$eval('.content .title', element => element.textContent.trim());
    //     console.log(pageTitle);
    // } else {
    //     console.error('Element not found!!!');
    // }
    await browser.close();
}

test()

const puppeteer = require('puppeteer');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const fs = require('fs/promises');

async function getLinks(url, hint,) {
    const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.evaluate(() => {
        const anchorTags = Array.from(document.querySelectorAll('a'));
        const filterAnchorTags = anchorTags.filter(tag => {
            return tag.href && tag.href.includes('/Media/News/item/news')
        });
        const url = filterAnchorTags.map(tag => tag.href);
        return url;
    });

    return links;
}

async function getDetail(url) {
    const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
    const page = await browser.newPage();
    await page.goto(url);
    
    const title = await page.title();
    await browser.close();
    console.log(title);
}

async function start() {
    const url = "https://www.cve.org/Media/News/AllNews";
    const hint = '/Media/News/item/news';
    const links = await getLinks(url, hint);
    await fs.writeFile('CVE News.txt', links.join("\r\n"));
    console.log(typeof (links))
    await browser.close();
};

getDetail("https://www.cve.org/Media/News/item/news/2023/04/11/Halborn-Added-as-CNA");