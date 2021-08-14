/**
 * Settings for scraper function:
 *
 * @PARENT_MENU_WRAPPER wrapper for parent categories
 *@WAY_TO_EVERY_URL_WRAPPER full way to every URL wrapper like <li>
 @WAY_TO_HREF final part of way to href attribute of <a>
 */

const getCategories = async (browser, baseUrl) => {
    const PARENT_MENU_WRAPPER = 'ul.catalog-menu';
    const WAY_TO_EVERY_URL_WRAPPER =
        'li.catalog-menu__item .catalog-menu__category li.catalog-menu__level-1';

    const scrapedData = [];

    try {
        let page = await browser.newPage();
        console.log(`Navigating to ${baseUrl}...`);
        await page.goto(baseUrl);

        await page.waitForSelector(PARENT_MENU_WRAPPER);

        let parentCategories = [];
        await page.waitForSelector(PARENT_MENU_WRAPPER);

        let urls = await page.$$eval(WAY_TO_EVERY_URL_WRAPPER, items => {
            items = items.map(
                item => item.querySelector('div.catalog-menu__level-1-link > a').href
            );

            return items;
        });
        // console.log('[urls]', urls);

        let names = await page.$$eval(WAY_TO_EVERY_URL_WRAPPER, items => {
            items = items.map(item =>
                item
                    .querySelector('div.catalog-menu__level-1-link > a')
                    .textContent.replace(/(\n)/g, '')
                    .trim()
            );

            return items;
        });
        // console.log('[names]', names);

        for (let i = 0; i < urls.length; i++) {
            let categoryItm = {
                categoryId: null,
                categoryName: null,
                categoryUrl: null,
                subCategories: []
            };

            categoryItm.categoryId = urls.indexOf(urls[i]);
            categoryItm.categoryName = names[i];
            categoryItm.categoryUrl = urls[i];

            parentCategories.push(categoryItm);
            // console.log('[parentCategories]', parentCategories);
        }

        for (let i = 0; i < urls.length; i++) {
            let subcategoryLink = urls[i].replace(/'/g, '');
            console.log('[subcategoryLink]', subcategoryLink);

            let newPage = await browser.newPage();
            await newPage.goto(subcategoryLink);
            await page.waitForSelector('main');
            
        //     let subcategoryObj = {};
        //     subcategoryObj['subcategoryName'] = await newPage.$eval(
        //         'main div.container div.shop-categories div.shop-categories__container section.shop-category a.shop-category__title',
        //         text => text.textContent
        //     );

        //     parentCategories.map(categoryItm => {
        //         let [subCategories] = categoryItm;

        //         parentCategories.indexOf(categoryItm) === urls.indexOf(urls[i]) &&
        //             subCategories.push(currentPageData);
        //     });

            await newPage.close();
        }

    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }

    // console.log('[scrapedData_out_of_try]', scrapedData);
    return parentCategories;
};

module.exports = {
    getCategories
};
