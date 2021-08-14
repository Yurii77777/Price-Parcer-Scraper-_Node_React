const { Router } = require('express');
const router = Router();
const puppeteer = require('puppeteer');

const categoriesController = require('../modules/epicentrkUa/getCategories');

// /api/categories/get
router.post('/get', async (req, res) => {
    let browser;

    try {
        const { checkedSite } = req.body;
        const baseUrl = checkedSite;

        console.log('Opening the browser......');
        browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-setuid-sandbox'],
            ignoreHTTPSErrors: true
        });
        
        if (baseUrl === 'https://epicentrk.ua/') {
            const categories = await categoriesController.getCategories(browser, baseUrl);
            // console.log('[categories]', categories);

            res.json(categories);
            await browser.close();
        }
    } catch (error) {
        res.status(500).json({ message: "Server don't answer, please try again" });
    }
});

module.exports = router;
