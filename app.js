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
    
    await browser.close();
    return links;
}

async function getDetail(url) {
    const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
    const page = await browser.newPage();
    await page.goto(url);
    
    const author = null;
    const tag = null;
    const linkWebsite = null;
    const linkArticle = url;
    const title = await page.$eval('h1.title', element => element.textContent);
    const published = await page.$eval('time', element => element.textContent);
    
    await browser.close();

    const article = {
        "Website": linkWebsite,
        "Link": linkArticle,
        "Title": title,
        "Published": published,
        "Author": author,
        "Tag": tag,
    };
    return article;
}

async function start() {
    const url = "https://www.cve.org/Media/News/AllNews";
    const hint = '/Media/News/item/news';
    const links = await getLinks(url, hint);

    const articles = [];
    for (const link of links){
        const article = await getDetail(link);
        articles.push(article);
    }

    const data = JSON.stringify(articles, null, 2);
    await fs.writeFile('CVE News.json', data);
    console.log(typeof (links))
};

start();