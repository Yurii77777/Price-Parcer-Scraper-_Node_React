const { text } = require('express');

const getGoodsData = async (browser, categoryName, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];
        let id = 0;

        const scrapeCurrentPage = async page => {
            await page.waitForSelector('.container');

            let isGoodsExist = false;
            let goods = '';

            try {
                goods = await page.$eval('.h4 > a', a => a.href);
                isGoodsExist = true;
            } catch (error) {
                isGoodsExist = false;
            }

            if (isGoodsExist) {

                let urls = await page.$$eval(
                    '.product-layout .product-thumb .product-block-inner .info .caption',
                    links => {
                        links = links.map(link => link.querySelector('p.h4 > a').href);
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
                            width: 1024,
                            height: 780,
                            deviceScaleFactor: 1
                        });
                        await newPage.goto(link, { timeout: 90000 });

                        /**
                         * Finding Modal window selector Begin
                         */
                        isModalWindow = false;
                        modalWindow = null;

                        try {
                            modalWindow = await newPage.$eval(
                                '.callbackkiller.cbk-window.cbk-background.cbk-window-onexit > a',
                                a => a.href
                            );
                            isModalWindow = true;
                        } catch (error) {
                            isModalWindow = false;
                        }

                        if (isModalWindow) {
                            await newPage.click(
                                '.callbackkiller.cbk-window.cbk-background.cbk-window-onexit > a'
                            );
                        }
                        // Finding Modal window selector End

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
                                '.price',
                                text => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj['goodPrice'] = await newPage.$eval('.price', text =>
                                text.textContent.replace(/(\D)/gm, '')
                            );
                        }
                        // Finding Price selector End

                        dataObj['goodSeller'] = 'Chemical Guys';

                        /**
                         * Finding Image selector Begin
                         */
                        let isFirstImgSelector = false;
                        let firstImgSelector = '';

                        try {
                            firstImgSelector = await newPage.$eval('.image > a', a => a.href);
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj['goodImgUrl'] = await newPage.$eval('.image > a', a => a.href);
                        }

                        let isSecondImgSelector = false;
                        let secondImgSelector = '';

                        try {
                            secondImgSelector = await newPage.$eval(
                                '.slider-item .product-block > a',
                                a => a.href
                            );
                            isSecondImgSelector = true;
                        } catch (error) {
                            isSecondImgSelector = false;
                        }

                        if (isSecondImgSelector) {
                            dataObj['goodImgUrl2'] = await newPage.$eval(
                                '.slider-item .product-block > a',
                                a => a.href
                            );
                        }
                        //Finding Image selector End

                        /**
                         * Finding Brand and Code selector Begin
                         */
                        let isFirstBrandSelector = false;
                        let firstBrandSelector = '';

                        try {
                            firstBrandSelector = await newPage.$eval(
                                '.description .product-description .description-right > a',
                                a => a.href
                            );
                            isFirstBrandSelector = true;
                        } catch (error) {
                            isFirstBrandSelector = false;
                        }

                        if (isFirstBrandSelector) {
                            let topTableElements = await newPage.$$eval(
                                '.description > .product-description tbody td',
                                el =>
                                    el.map(el => {
                                        return el.textContent;
                                    })
                            );

                            // console.log('[topTableElements.length]', topTableElements.length);
                            topTableElements.length === 6 &&
                                (dataObj['goodBrand'] =
                                    topTableElements[topTableElements.length - 5]);
                            topTableElements.length === 6 &&
                                (dataObj['goodCode'] =
                                    topTableElements[topTableElements.length - 3]);

                            let goodStatus = topTableElements[topTableElements.length - 1].trim();
                            // console.log('[goodStatus]', goodStatus);
                            goodStatus === 'В наличии менее 5' ||
                                (goodStatus === 'В наличии более 5' &&
                                    (dataObj['goodStatus'] = 'В наличии '));

                            goodStatus === 'Нет в наличии' &&
                                (dataObj['goodStatus'] = 'Нет в наличии');

                            topTableElements.length === 6 &&
                                (dataObj['goodCode'] =
                                    topTableElements[topTableElements.length - 3]);
                        }
                        //Finding Brand and Code selector End

                        /**
                         * Finding Code and Status selector Begin
                         */
                        let isSecondCodeSelector = false;
                        let secondCodeSelector = '';

                        try {
                            secondCodeSelector = await newPage.$eval(
                                '.description .product-description .description-right',
                                text => text.textContent
                            );
                            // console.log('[secondCodeSelector]', secondCodeSelector);
                            isSecondCodeSelector = true;
                        } catch (error) {
                            isSecondCodeSelector = false;
                        }

                        if (isSecondCodeSelector) {
                            let topTableElements = await newPage.$$eval(
                                '.description > .product-description tbody td',
                                el =>
                                    el.map(el => {
                                        return el.textContent;
                                    })
                            );

                            dataObj['goodCode'] = topTableElements[topTableElements.length - 3];

                            let goodStatus = topTableElements[topTableElements.length - 1].trim();
                            // console.log('[goodStatus]', goodStatus);
                            !dataObj['goodStatus'] &&
                                goodStatus === 'В наличии менее 5' &&
                                (dataObj['goodStatus'] = 'В наличии ');
                            !dataObj['goodStatus'] &&
                                goodStatus === 'В наличии более 5' &&
                                (dataObj['goodStatus'] = 'В наличии ');
                            !dataObj['goodStatus'] &&
                                goodStatus === 'Нет в наличии' &&
                                (dataObj['goodStatus'] = 'Нет в наличии');
                        }
                        //Finding Code and Status selector End

                        /**
                         * Finding Description selector Begin
                         */
                        let isFirstDescriptionSelector = false;
                        let firstDescriptionSelector = '';

                        try {
                            firstDescriptionSelector = await newPage.$eval(
                                '.tab-pane.active',
                                text => text.textContent
                            );
                            isFirstDescriptionSelector = true;
                        } catch (error) {
                            isFirstDescriptionSelector = false;
                        }

                        if (isFirstDescriptionSelector) {
                            dataObj['goodDescription'] = await newPage.$eval(
                                '.tab-pane.active',
                                text => text && text.textContent.replace(/\s+/g, ' ')
                            );
                        }
                        //Finding Description selector End

                        /**
                         * Finding Video selector Begin
                         */
                        let isVideoSelector = false;
                        let videoSelector = '';

                        try {
                            videoSelector = await newPage.$eval(
                                '.tab-pane.active table iframe',
                                iframe => iframe.src
                            );
                            isVideoSelector = true;
                        } catch (error) {
                            isVideoSelector = false;
                        }

                        if (isVideoSelector) {
                            dataObj['goodVideoUrl'] = await newPage.$eval(
                                '.tab-pane.active table iframe',
                                iframe => iframe.src
                            );
                        }
                        //Finding Video selector End

                        /**
                         * Finding Specifications selector Begin
                         */
                        let isSpecificationSelector = false;
                        let specificationSelector = '';

                        try {
                            specificationSelector = await newPage.$eval(
                                '#tab-specification table tbody tr td',
                                text => text.textContent
                            );
                            isSpecificationSelector = true;
                        } catch (error) {
                            isSpecificationSelector = false;
                        }

                        if (isSpecificationSelector) {
                            let tableElements = await newPage.$$eval(
                                '#tab-specification table tbody tr td',
                                el =>
                                    el.map(el => {
                                        return el.textContent;
                                    })
                            );
                            // console.log('[tableElements]', tableElements);
                            tableElements.forEach((el, i) => {
                                el === 'Вес' && (dataObj['goodWeight'] = tableElements[i + 1]);
                                el === 'Тип' && (dataObj['goodType'] = tableElements[i + 1]);
                                el === 'Объем' && (dataObj['goodCapacity'] = tableElements[i + 1]);
                                el === 'Аромат' && (dataObj['goodAroma'] = tableElements[i + 1]);
                                el === 'Использование' &&
                                    (dataObj['goodUse'] = tableElements[i + 1]);
                                el === 'Консистенция' &&
                                    (dataObj['goodConsistency'] = tableElements[i + 1]);
                                el === 'Гарантия' &&
                                    (dataObj['goodGuarantee'] = tableElements[i + 1]);
                            });
                        }
                        //Finding Specifications selector End

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

            let isNextPages = false;
            let nextPageUrl = '';

            try {
                nextPageUrl = await page.$eval('.pagination .active + li > a', a => a.href);
                isNextPages = true;
            } catch (error) {
                isNextPages = false;
            }

            if (isNextPages) {
                await page.close();
                let newPage = await browser.newPage();
                await newPage.goto(nextPageUrl);
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
