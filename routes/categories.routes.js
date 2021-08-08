const { Router } = require('express');
const router = Router();

const browserObject = require('../modules/browser');
const categoriesController = require('../modules/epicentrkUa/categoriesController');

// /api/categories/get
router.post('/get', async (req, res) => {
    try {
        const { checkedSite } = req.body;
        const baseUrl = checkedSite;
        console.log('[baseUrl]', baseUrl);

        if (baseUrl) {
            const browserInstance = browserObject.startBrowser(baseUrl);
            categoriesController(browserInstance);
        }
    } catch (error) {
        res.status(500).json({ message: "Server don't answer, please try again" });
    }
});

module.exports = router;
