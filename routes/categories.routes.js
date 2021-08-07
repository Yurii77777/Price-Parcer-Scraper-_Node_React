const { Router } = require('express');
const router = Router();

// /api/categories/get
router.post('/get', async (req, res) => {
    try {

        const { checkedSite } = req.body;
        const url = checkedSite;
        console.log('[url]', url);

    } catch (error) {
        res.status(500).json({ message: 'Server don\'t answer, please try again' });
    }
});

module.exports = router;
