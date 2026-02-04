const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        if (userData && userData.username && userData.email) {
            const result = await userService.getRegisteredUser(userData.username, userData.email);
            if (result && result.data && result.data.length > 0 && result.data[0].id) {
                res.send({ token: jwt.sign({ id: userData._id }, "some_secret_key", { expiresIn: '1h' }), user: result.data[0] });
            } else {
                res.status(401).send({ message: "Unauthorized user" });
            }
        } else {
            res.status(400).send({ message: `One of required fields (username OR email) is null or empty: ${JSON.stringify(userData)}` });
        }
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : {}});
    }
})

module.exports = router