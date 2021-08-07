// Connect & settings for Express module
const express = require('express');
const config = require('config');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/categories', require('./routes/categories.routes'));

const PORT = config.get('port') || 5000;

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
