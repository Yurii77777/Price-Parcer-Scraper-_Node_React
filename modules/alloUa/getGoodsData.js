const getGoodsData = async (browser, categoryName, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];
        let id = 0;

        const scrapeCurrentPage = async page => {
            await page.waitForSelector('.page__content');

            let isGoodsExist = false;
            let goods = '';

            try {
                goods = await page.$eval(
                    '.products-layout__item .product-card .product-card__content > a',
                    a => a.href
                );
                isGoodsExist = true;
            } catch (error) {
                isGoodsExist = false;
            }

            if (isGoodsExist) {
                let urls = await page.$$eval(
                    '.products-layout__container .products-layout__item .product-card',
                    links => {
                        links = links.map(
                            link => link.querySelector('.product-card__content > a').href
                        );
                        links = links.filter((link, index) => links.indexOf(link) === index);
                        return links;
                    }
                );
                // console.log(urls);

                let pagePromise = (link, id) =>
                    new Promise(async (resolve, reject) => {
                        let dataObj = {};
                        let newPage = await browser.newPage();
                        await newPage.setViewport({
                            width: 1280,
                            height: 800,
                            deviceScaleFactor: 1
                        });
                        await newPage.goto(link, { timeout: 60000 });

                        dataObj['goodId'] = id;
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
                                '.p-trade-price__current span.sum',
                                text => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            dataObj['goodPrice'] = 0;
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj['goodPrice'] = await newPage.$eval(
                                '.p-trade-price__current span.sum',
                                text => text.textContent.replace(/(\D)/gm, '')
                            );
                        }
                        // Finding Price selector End

                        try {
                            let goodStatus = await newPage.$eval(
                                '.p-trade__stock-label',
                                text => text.textContent.replace(/\s/g, '')
                            );

                            goodStatus === '✓Товарвналичии' &&
                                (dataObj['goodStatus'] = 'В наличии ');
                            goodStatus === 'Нетвналичии' &&
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
                                '.shipping-brand__link > .shipping-brand__logo',
                                img => img.alt
                            );
                            isFirstSellerSelector = true;
                        } catch (error) {
                            dataObj['goodSeller'] = 'Алло';
                            isFirstSellerSelector = false;
                        }

                        if (isFirstSellerSelector) {
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.shipping-brand__link > .shipping-brand__logo',
                                img => img.alt.replace(/Продавец /g, '')
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
                                '.main-gallery__image',
                                img => img.src
                            );
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj['goodImgUrl'] = await newPage.$eval(
                                '.main-gallery__image',
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
                                '.breadcrumbs .breadcrumbs__item > a',
                                a => a.textContent
                            );
                            isFirstBrandSelector = true;
                        } catch (error) {
                            isFirstBrandSelector = false;
                        }

                        if (isFirstBrandSelector) {
                            let navElements = await newPage.$$eval('.breadcrumbs__link', el => el.map(el => {
                                return el.textContent;
                            }));

                            dataObj['goodBrand'] = navElements[navElements.length - 2].replace(`${categoryName} `, '');
                        }
                        //Finding Brand selector End

                        /**
                         * Finding Description selector Begin
                         */
                        let isFirstDescriptionSelector = false;
                        let firstDescriptionSelector = '';

                        try {
                            firstDescriptionSelector = await newPage.$eval(
                                '.p-description__content__inner',
                                text => text.textContent
                            );
                            isFirstDescriptionSelector = true;
                        } catch (error) {
                            isFirstDescriptionSelector = false;
                        }

                        if (isFirstDescriptionSelector) {
                            dataObj['goodDescription'] = await newPage.$eval(
                                '.p-description__content__inner',
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
                                '.p-tabs__sku-value',
                                text => text.textContent
                            );
                            isFirstCodeSelector = true;
                        } catch (error) {
                            isFirstCodeSelector = false;
                        }

                        if (isFirstCodeSelector) {
                            dataObj['goodCode'] = await newPage.$eval('.p-tabs__sku-value', text =>
                                text.textContent.replace(/\D/g, '')
                            );
                        }
                        //Finding good's Code selector End

                        await newPage.close();
                        resolve(dataObj);
                    });

                for (let link in urls) {
                    id += 1;
                    let currentPageData = await pagePromise(urls[link], id);
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
                    'a.pagination__next__link',
                    a => a.href
                    );
                    isNextButton = true;
            } catch (error) {
                isNextButton = false;
            }

            if (isNextButton) {
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
