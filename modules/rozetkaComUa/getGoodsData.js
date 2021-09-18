const getGoodsData = async (browser, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];

        const scrapeCurrentPage = async page => {
            await page.waitForSelector('.content_type_catalog');

            let isGoodsExist = false;
            let goods = '';

            try {
                goods = await page.$eval(
                    'li.catalog-grid__cell .ng-star-inserted .goods-tile .goods-tile__inner > a.goods-tile__heading',
                    a => a.href
                );
                isGoodsExist = true;
            } catch (error) {
                isGoodsExist = false;
            }

            if (isGoodsExist) {
                let urls = await page.$$eval(
                    'ul.catalog-grid .catalog-grid__cell .ng-star-inserted .goods-tile',
                    links => {
                        links = links.map(
                            link =>
                                link.querySelector('.goods-tile__inner > a.goods-tile__heading')
                                    .href
                        );
                        links = links.filter((link, index) => links.indexOf(link) === index);
                        return links;
                    }
                );
                // console.log(urls);

                let pagePromise = (link, index) =>
                    new Promise(async (resolve, reject) => {
                        let dataObj = {};
                        let newPage = await browser.newPage();
                        await newPage.goto(link, {timeout: 60000});

                        dataObj['goodId'] = index;
                        dataObj['goodUrl'] = link;

                        try {
                            dataObj['goodTitle'] = await newPage.$eval(
                                'h1',
                                text => text.textContent
                            );
                        } catch (error) {
                            dataObj['goodTitle'] = 'Product name not defined';
                        }

                        /**
                         * Finding Price selector Begin
                         */
                        let isFirstPriceSelector = false;
                        let firstPriceSelector = '';

                        try {
                            firstPriceSelector = await newPage.$eval(
                                '.product-prices__big',
                                text => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj['goodPrice'] = await newPage.$eval(
                                '.product-prices__big',
                                text => text.textContent.replace(/(\D)/gm, '')
                            );
                        }
                        // Finding Price selector End

                        try {
                            let goodStatus = await newPage.$eval('.status-label', text =>
                                text.textContent.trim()
                            );

                            goodStatus === 'Есть в наличии' &&
                                (dataObj['goodStatus'] = 'В наличии ');
                            goodStatus === 'Заканчивается' &&
                                (dataObj['goodStatus'] = 'В наличии ');
                            goodStatus === 'Нет в наличии' &&
                                (dataObj['goodStatus'] = 'Нет в наличии');
                            goodStatus === 'Товар закончился' &&
                                (dataObj['goodStatus'] = 'Нет в наличии');
                        } catch (error) {
                            dataObj['goodStatus'] = 'Not defined';
                        }

                        /**
                         * Finding Seller selector Begin
                         */
                        let isFirstSellerSelector = false;
                        let firstSellerSelector = '';

                        try {
                            firstSellerSelector = await newPage.$eval(
                                '.product-seller__logo > img',
                                img => img.alt
                            );
                            isFirstSellerSelector = true;
                        } catch (error) {
                            isFirstSellerSelector = false;
                        }

                        if (isFirstSellerSelector) {
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.product-seller__logo > img',
                                img => img.alt.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                            );
                        }

                        let isSecondSellerSelector = false;
                        let secondSellerSelector = '';

                        try {
                            secondSellerSelector = await newPage.$eval(
                                '.product-seller__logo button > img',
                                img => img.alt
                            );
                            isSecondSellerSelector = true;
                        } catch (error) {
                            isSecondSellerSelector = false;
                        }

                        if (isSecondSellerSelector) {
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.product-seller__logo button > img',
                                img => img.alt.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                            );
                        }
                        // Finding Seller selector End

                        /**
                         * Finding Image selector Begin
                         */
                        let isFirstImgSelector = false;
                        let firstImgSelector = '';

                        try {
                            firstImgSelector = await newPage.$eval(
                                '.picture-container__picture',
                                img => img.src
                            );
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj['goodImgUrl'] = await newPage.$eval(
                                '.picture-container__picture',
                                img => img.src
                            );
                        }
                        //Finding Image selector End

                        /**
                         * Finding Brand selector Begin
                         */
                        let isFirstBrandSelector = false;
                        let firstBrandSelector = '';

                        try {
                            firstBrandSelector = await newPage.$eval(
                                '.p-char .p-char__item .p-char__brand .p-char__brand-logo',
                                img => img.alt
                            );
                            isFirstBrandSelector = true;
                        } catch (error) {
                            isFirstBrandSelector = false;
                        }

                        if (isFirstBrandSelector) {
                            dataObj['goodBrand'] = await newPage.$eval(
                                '.p-char .p-char__item .p-char__brand .p-char__brand-logo',
                                img => img.alt
                            );
                        }
                        //Finding Brand selector End

                        /**
                         * Finding Description selector Begin
                         */
                        let isFirstDescriptionSelector = false;
                        let firstDescriptionSelector = '';

                        try {
                            firstDescriptionSelector = await newPage.$eval(
                                '.product-about__description-content',
                                text => text.textContent
                            );
                            isFirstDescriptionSelector = true;
                        } catch (error) {
                            isFirstDescriptionSelector = false;
                        }

                        if (isFirstDescriptionSelector) {
                            dataObj['goodDescription'] = await newPage.$eval(
                                '.product-about__description-content',
                                text => text.textContent
                            );
                        }
                        //Finding Description selector End

                        /**
                         * Finding good's Code selector Begin
                         */
                        let isFirstCodeSelector = false;
                        let firstCodeSelector = '';

                        try {
                            firstCodeSelector = await newPage.$eval(
                                '.product__rating > .product__code',
                                text => text.textContent
                            );
                            isFirstCodeSelector = true;
                        } catch (error) {
                            isFirstCodeSelector = false;
                        }

                        if (isFirstCodeSelector) {
                            dataObj['goodCode'] = await newPage.$eval(
                                '.product__rating > .product__code',
                                text => text.textContent.replace(/\D/g, '')
                            );
                        }
                        //Finding good's Code selector End

                        await newPage.close();
                        resolve(dataObj);
                    });

                for (let link in urls) {
                    let index = link;
                    let currentPageData = await pagePromise(urls[link], index);
                    // console.log('[currentPageData]', currentPageData);
                    scrapedData.push(currentPageData);
                }

                // await page.close();
            } else {
                return {
                    message_en:
                        'There are no available goods. Please, try select another category or subcategory.'
                };
            }

            let isNextButton = false;
            let nextButtonUrl = null;

            try {
                nextButtonUrl = await page.$eval(
                    'a.pagination__direction_type_forward',
                    a => a.href
                    );
                    isNextButton = true;
            } catch (error) {
                isNextButton = false;
            }

            if (isNextButton && nextButtonUrl !== '') {
                await page.close();
                let newPage = await browser.newPage();
                await newPage.goto(nextButtonUrl);
                return scrapeCurrentPage(newPage);
            }

            return scrapedData;
        };

        data = await scrapeCurrentPage(page);
    } catch (err) {
        console.log('Could not create a browser instance => : ', err);
    }

    return data;
};

module.exports = {
    getGoodsData
};
