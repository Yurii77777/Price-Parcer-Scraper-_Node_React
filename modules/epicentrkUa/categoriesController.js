const categoriesScrapper = require('./categoriesScrapper');

let scrapeAll = async browserInstance => {
    let browser;
    let scrapedData = {};

    try {
        browser = await browserInstance;

        scrapedData['Categories'] = await categoriesScrapper.scraper(browser);
        await browser.close();
        
        
    } catch (err) {
        console.log('Could not resolve the browser instance => ', err);
    }
    
    // console.log('[scrapedData]', scrapedData);
    return scrapedData;
};

module.exports = browserInstance => scrapeAll(browserInstance);
