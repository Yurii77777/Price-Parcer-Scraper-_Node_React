const categoriesScrapper = require('./categoriesScrapper');

let scrapeAll = async browserInstance => {
    let browser;

    try {
        browser = await browserInstance;
        let scrapedData = {};

        scrapedData['Categories'] = await categoriesScrapper.scraper(browser);
        await browser.close();
    } catch (err) {
        console.log('Could not resolve the browser instance => ', err);
    }
};

module.exports = browserInstance => scrapeAll(browserInstance);
