const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
    try {
        const userData = {
            _id : "321654987sssasd"
        }; // NEED logic to find a user

        if (userData && userData._id) {
            res.send(jwt.sign({ id: userData._id }, "some_secret_key", { expiresIn: '1h' }));
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router