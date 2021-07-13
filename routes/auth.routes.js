"use strict";

const { Router } = require('expres');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Email is incorrect!").isEmail(),
        check("password", "Min password length is 6 characters!").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data to registration new user",
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({
                    message: "This email has been registered, try another one",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: "User has been created" });
        } catch (error) {
            res.status(500).json({
                message: "Somthing wrong, try again, please",
            });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter the password').exists()
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Incorrect data to authorization",
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User is not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "User password is incorrect, try again" });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ token, userId: user.id });

    } catch (error) {
        res.status(500).json({
            message: "Somthing wrong, try again, please",
        });
    }
});

module.exports = router;
