// Connect & settings for Express module and WebSocket
const express = require('express');
const config = require('config');
const WebSocket = require('ws');
const puppeteer = require('puppeteer');

const goodsGetter = require('./modules/epicentrkUa/getGoodsData');

const app = express();

const PORT = config.get('port') || 5000;
const server = new WebSocket.Server({ port: 5050 });

async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`App has been started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();

server.on('connection', ws => {
    ws.on('message', message => {
        const request = JSON.parse(message);
        const { event, categoryUrl } = request;

        if (event === 'getGoodsRequest') {
            let browser;

            const startBrowser = async () => {
                let browserInstance;

                try {
                    console.log('Opening the browser......');
                    browserInstance = await puppeteer.launch({
                        headless: true,
                        args: ['--disable-setuid-sandbox'],
                        ignoreHTTPSErrors: true
                    });
                } catch (error) {
                    console.log(`Here is some error: ${error}`);
                }

                return browserInstance;
            };

            const getGoods = async (browser, categoryUrl) => {
                browser = await startBrowser();
                const data = await goodsGetter.getGoodsData(browser, categoryUrl);
                // console.log('[data]', data);

                server.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(data));
                    }
                });

                await browser.close();
            }

            getGoods(browser, categoryUrl);
        }
    });
});
