const WebSocket = require('ws');
const puppeteer = require('puppeteer');

const goodsGetterFromRozetkaComUa = require('./modules/rozetkaComUa/getGoodsData');
const goodsGetterFromEpicentrkua = require('./modules/epicentrkUa/getGoodsData');
const goodsGetterFromAlloUa = require('./modules/alloUa/getGoodsData');
const goodsGetterFromChemicalguysUa = require('./modules/chemicalguysUa/getChemicalguysData');

const server = new WebSocket.Server({ port: 5050 });

server.on('connection', ws => {
    ws.on('message', message => {
        const request = JSON.parse(message);
        const { event, categoryName, categoryUrl, selectedSite } = request;

        if (event === 'getGoodsRequest') {
            let browser;

            const startBrowser = async () => {
                let browserInstance;

                try {
                    console.log('Opening the browser......');
                    browserInstance = await puppeteer.launch({
                        timeout: 60000,
                        headless: false,
                        args: ['--disable-setuid-sandbox'],
                        ignoreHTTPSErrors: true
                    });
                } catch (error) {
                    console.log(`Here is some error: ${error}`);
                }

                return browserInstance;
            };

            const getGoods = async (browser, categoryName, categoryUrl, selectedSite) => {
                browser = await startBrowser();
                let data = null;

                selectedSite === 'Epicentrk.ua' &&
                    (data = await goodsGetterFromEpicentrkua.getGoodsData(browser, categoryUrl));
                selectedSite === 'Rozetka.com.ua' &&
                    (data = await goodsGetterFromRozetkaComUa.getGoodsData(browser, categoryName, categoryUrl));
                selectedSite === 'Allo.ua' &&
                    (data = await goodsGetterFromAlloUa.getGoodsData(browser, categoryName, categoryUrl));
                selectedSite === 'Chemicalguys.ua' &&
                    (data = await goodsGetterFromChemicalguysUa.getGoodsData(browser, categoryName, categoryUrl));
                // console.log('[data]', data);

                server.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });

                await browser.close();
            };

            getGoods(browser, categoryName, categoryUrl, selectedSite);
        }
    });
});
