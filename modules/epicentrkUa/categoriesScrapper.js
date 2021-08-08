const scraperObject = {
    async scraper(page) {
        await page.waitForSelector('ul.catalog-menu');
        // console.log('Secelector \'.header__group\' was downloaded');
        let scrapedData = [];

        async function scrapeCurrentPage() {
            let parentCategories = [];

            await page.waitForSelector('ul.catalog-menu');

            let urls = await page.$$eval(
                'li.catalog-menu__item .catalog-menu__category li.catalog-menu__level-1 ',
                items => {
                    items = items.map(
                        item => item.querySelector('div.catalog-menu__level-1-link > a').href
                    );

                    return items;
                }
            );
            // console.log('[urls]', urls);

            let names = await page.$$eval(
                'li.catalog-menu__item .catalog-menu__category li.catalog-menu__level-1 ',
                items => {
                    items = items.map(item =>
                        item
                            .querySelector('div.catalog-menu__level-1-link > a')
                            .textContent.replace(/(\n)/g, '').trim()
                    );

                    return items;
                }
            );
            // console.log('[names]', names);
            
            for(let i = 0; i < urls.length; i++) {
                let categoryItm = {
                    categoryName: null,
                    categoryUrl: null
                };
                
                categoryItm.categoryName = names[i];
                categoryItm.categoryUrl = urls[i];
                
                parentCategories.push(categoryItm);
            }
            console.log('[parentCategories]', parentCategories);
        }

        let data = await scrapeCurrentPage();
        // // console.log(data);
    }
};

module.exports = scraperObject;
