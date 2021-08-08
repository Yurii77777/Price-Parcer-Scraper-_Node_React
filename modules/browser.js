const puppeteer = require('puppeteer');

const startBrowser = async (url) => {
    let page;
    
    try {
        console.log('Opening the browser......');
        let browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-setuid-sandbox'],
            ignoreHTTPSErrors: true
        });
        page = await browser.newPage();

        console.log(`Navigating to ${url}...`);
        await page.goto(url);

    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }
    return page;
}

module.exports = {
    startBrowser
};
