"use strict";

// Connect & settings for Express module
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`App has been started at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();
