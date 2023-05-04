// const fetch = require("node-fetch");
const { join } = require("path");
const puppeteer = require("puppeteer");

const minimal_args = [
    "--disable-speech-api", // 	Disables the Web Speech API (both speech recognition and synthesis)
    "--disable-background-networking", // Disable several subsystems which run network requests in the background. This is for use 									  // when doing network performance testing to avoid noise in the measurements. ↪
    "--disable-background-timer-throttling", // Disable task throttling of timer tasks from background pages. ↪
    "--disable-backgrounding-occluded-windows",
    "--disable-breakpad",
    "--disable-client-side-phishing-detection",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-dev-shm-usage",
    "--disable-domain-reliability",
    "--disable-extensions",
    "--disable-features=AudioServiceOutOfProcess",
    "--disable-hang-monitor",
    "--disable-ipc-flooding-protection",
    "--disable-notifications",
    "--disable-offer-store-unmasked-wallet-cards",
    "--disable-popup-blocking",
    "--disable-print-preview",
    "--disable-prompt-on-repost",
    "--disable-renderer-backgrounding",
    "--disable-setuid-sandbox",
    "--disable-sync",
    "--hide-scrollbars",
    "--ignore-gpu-blacklist",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-first-run",
    "--no-pings",
    "--no-sandbox",
    "--no-zygote",
    "--password-store=basic",
    "--use-gl=swiftshader",
    "--use-mock-keychain",
];

async function testCrawler(url) {
    const browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless: true, // Không có giao diện UI => nhẹ hơn
        args: minimal_args,
        userDataDir: join(__dirname, ".cache", "puppeteer")
    })

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
        if ((request.resourceType() === 'image') || (request.resourceType() === 'media')) {
            request.abort();
        } else {
            request.continue();
        }
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const html = await page.content(() => {
        return document.querySelector('body').outerHTML;
    })
    await page.close();
    return html;
}

async function main() {
    const content = await testCrawler("https://www.cve.org/Media/News/AllNews");
    console.log(content)
}
main()

