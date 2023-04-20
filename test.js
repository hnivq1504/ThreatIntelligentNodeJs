const puppeteer = require("puppeteer-core");

const url = "https://www.cve.org/Media/News/AllNews";
const excutePath = "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe";

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
    const link = await page.$eval('a[href')
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