const getGoodsData = async (browser, catogoryUrl) => {
    const scrapedData = [];

    try {
        let page = await browser.newPage();
        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        await page.waitForSelector('main');

        let isGoodsExist = false;
        let goods = '';

        try {
            goods = await page.$eval('div.row div.card__info div.card__name > a', a => a.href);
            isGoodsExist = true;
        } catch (error) {
            isGoodsExist = false;
        }

        if (isGoodsExist) {
            let urls = await page.$$eval('div.row div.card__info', links => {
                links = links.map(link => link.querySelector('div.card__name > a').href);
                links = links.filter((link, index) => links.indexOf(link) === index);
                return links;
            });
            await page.close();
            // console.log(urls);

            let pagePromise = (link, index) =>
                new Promise(async (resolve, reject) => {
                    let dataObj = {};
                    let newPage = await browser.newPage();
                    await newPage.goto(link);

                    dataObj['goodId'] = index;
                    dataObj['goodUrl'] = link;

                    try {
                        dataObj['goodTitle'] = await newPage.$eval('h1', text => text.textContent);
                    } catch (error) {
                        dataObj['goodTitle'] = 'Product name not defined';
                    }
                    // Price may be absent because it's don't filter value "In stock"
                    try {
                        dataObj['goodPrice'] = await newPage.$eval('.p-price__main', text =>
                            text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                        );
                    } catch (error) {
                        dataObj['goodPrice'] = await newPage.$eval('.price-wrapper', text =>
                        text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                    );
                    }

                    try {
                        dataObj['goodStatus'] = await newPage.$eval('.p-block__status', text =>
                            text.textContent.replace(/(\r\n\t|\n|\r|\t|])/gm, '')
                        );
                    } catch (error) {
                        dataObj['goodStatus'] = await newPage.$eval('.text-status', text =>
                            text.textContent.replace(/(\r\n\t|\n|\r|\t|])/gm, '')
                        );
                    }

                    // dataObj['goodCode'] = await newPage.$eval(
                    //     '.nc.p-block__code',
                    //     text => text.textContent
                    // );

                    let isFirstSellerSelector = false;
                    let firstSellerSelector = '';

                    try {
                        firstSellerSelector = await newPage.$eval(
                            '.p-block__row--seller .p-seller .p-block__title span',
                            text => text.textContent
                        );
                        isFirstSellerSelector = true;
                    } catch (error) {
                        isFirstSellerSelector = false;
                    }

                    if (isFirstSellerSelector) {
                        dataObj['goodSeller'] = await newPage.$eval('.p-block__row--seller .p-seller .p-block__title span', text =>
                            text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                        );
                    }

                    let isSecondSellerSelector = false;
                    let secondSellerSelector = '';

                    try {
                        secondSellerSelector = await newPage.$eval(
                            '.seller-section .seller-info .seller-name .seller-title span',
                            text => text.textContent
                        );
                        isSecondSellerSelector = true;
                    } catch (error) {
                        isSecondSellerSelector = false;
                    }

                    if (isSecondSellerSelector) {
                        dataObj['goodSeller'] = await newPage.$eval('.seller-section .seller-info .seller-name .seller-title span', text =>
                            text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                        );
                    }

                    let isFirstImgSelector = false;
                    let firstImgSelector = '';

                    try {
                        firstImgSelector = await newPage.$eval(
                            '.swiper-lazy',
                            img => img.src
                        );
                        isFirstImgSelector = true;
                    } catch (error) {
                        isFirstImgSelector = false;
                    }

                    if (isFirstImgSelector) {
                        dataObj['goodImgUrl'] = await newPage.$eval('.swiper-lazy', img => img.src
                        );
                    }

                    let isSecondImgSelector = false;
                    let secondImgSelector = '';

                    try {
                        secondImgSelector = await newPage.$eval(
                            '.p-slider__slide picture .p-slider__photo',
                            img => img.src
                        );
                        isSecondImgSelector = true;
                    } catch (error) {
                        isSecondImgSelector = false;
                    }

                    if (isSecondImgSelector) {
                        dataObj['goodImgUrl'] = await newPage.$eval('.p-slider__slide picture .p-slider__photo', img => img.src
                        );
                    }

                    await newPage.close();
                    resolve(dataObj);
                });

            for (let link in urls) {
                let index = link;
                let currentPageData = await pagePromise(urls[link], index);
                // console.log('[currentPageData]', currentPageData);
                scrapedData.push(currentPageData);
            }
        } else {
            return {
                message_en:
                    'There are no available goods. Please, try select another category or subcategory.'
            };
        }
    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }

    return scrapedData;
};

module.exports = {
    getGoodsData
};
