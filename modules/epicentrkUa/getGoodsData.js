const getGoodsData = async (browser, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];

        const scrapeCurrentPage = async page => {
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
                // await page.close();
                // console.log(urls);

                let pagePromise = (link, index) =>
                    new Promise(async (resolve, reject) => {
                        let dataObj = {};
                        let newPage = await browser.newPage();
                        await newPage.goto(link);

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
                                '.p-price__main',
                                text => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj['goodPrice'] = await newPage.$eval('.p-price__main', text =>
                                text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                            );
                        }

                        let isSecondPriceSelector = false;
                        let secondPriceSelector = '';

                        try {
                            secondPriceSelector = await newPage.$eval(
                                '.price-wrapper',
                                text => text.textContent
                            );
                            isSecondPriceSelector = true;
                        } catch (error) {
                            isSecondPriceSelector = false;
                        }

                        if (isSecondPriceSelector) {
                            dataObj['goodPrice'] = await newPage.$eval('.price-wrapper', text =>
                                text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                            );
                        }
                        // Finding Price selector End

                        try {
                            dataObj['goodStatus'] = await newPage.$eval('.p-block__status', text =>
                                text.textContent.replace(/(\r\n\t|\n|\r|\t|])/gm, '')
                            );
                        } catch (error) {
                            dataObj['goodStatus'] = await newPage.$eval('.text-status', text =>
                                text.textContent.replace(/(\r\n\t|\n|\r|\t|])/gm, '')
                            );
                        }

                        /**
                         * Finding Seller selector Begin
                         */
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
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.p-block__row--seller .p-seller .p-block__title span',
                                text => text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
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
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.seller-section .seller-info .seller-name .seller-title span',
                                text => text.textContent.replace(/(\r\n\t|\n|\r|\t|[ \t])/gm, '')
                            );
                        }

                        let isThirdSellerSelector = false;
                        let thirdSellerSelector = '';

                        try {
                            thirdSellerSelector = await newPage.$eval(
                                '.seller-logo-container .seller-logo',
                                img => img.alt
                            );
                            isThirdSellerSelector = true;
                        } catch (error) {
                            isThirdSellerSelector = false;
                        }

                        if (isThirdSellerSelector) {
                            dataObj['goodSeller'] = await newPage.$eval(
                                '.seller-logo-container .seller-logo',
                                img => img.alt
                            );
                        }
                        // Finding Seller selector End

                        /**
                         * Finding Image selector Begin
                         */
                        let isFirstImgSelector = false;
                        let firstImgSelector = '';

                        try {
                            firstImgSelector = await newPage.$eval('.swiper-lazy', img => img.src);
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj['goodImgUrl'] = await newPage.$eval(
                                '.swiper-lazy',
                                img => img.src
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
                            dataObj['goodImgUrl'] = await newPage.$eval(
                                '.p-slider__slide picture .p-slider__photo',
                                img => img.src
                            );
                        }

                        let isThirdImgSelector = false;
                        let thirdImgSelector = '';

                        try {
                            thirdImgSelector = await newPage.$eval(
                                '.slider-sticky-container .product-single-image',
                                img => img.src
                            );
                            isThirdImgSelector = true;
                        } catch (error) {
                            isThirdImgSelector = false;
                        }

                        if (isThirdImgSelector) {
                            dataObj['goodImgUrl'] = await newPage.$eval(
                                '.slider-sticky-container .product-single-image',
                                img => img.src
                            );
                        }
                        //Finding Image selector End

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

                        await newPage.close();
                        resolve(dataObj);
                    });

                for (let link in urls) {
                    let index = link;
                    let currentPageData = await pagePromise(urls[link], index);
                    // console.log('[currentPageData]', currentPageData);
                    scrapedData.push(currentPageData);
                }

                await page.close();
            } else {
                return {
                    message_en:
                        'There are no available goods. Please, try select another category or subcategory.'
                };
            }

            let isNextButton = false;
            let nextButtonUrl = '';

            try {
                nextButtonUrl = await page.$eval(
                    '.pagination > .pagination__button--next',
                    a => a.href
                );
                isNextButton = true;
            } catch (error) {
                isNextButton = false;
            }

            if (isNextButton) {
                // await page.close();
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
