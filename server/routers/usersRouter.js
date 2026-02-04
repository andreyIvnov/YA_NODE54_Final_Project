const { Router } = require('express');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "some_secret_key";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' })
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Geting all users JWT verification result: ", data);
                    const queries = req.query;
                    const getAllResult = await userService.getAllUsers(queries);
                    res.send(getAllResult);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on geting all users: " + error.message, error: error ? error : {} });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' })
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Get user by ID JWT verification result: ", data);
                    const getByIdResult = await userService.getUserById(id);
                    if (getByIdResult && getByIdResult._id) res.send(fff);
                    res.status(400).send({ description: "No user found" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on get user by ID: " + error.message, error: error ? error : {} });
    }
})

router.post('/', async (req, res) => {
    try {
        const newUserData = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {

            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Creating new user JWT verification result: ", data);
                    const createUserResult = await userService.addUser(newUserData);
                    createUserResult && createUserResult._id ? res.status(201).send(createUserResult) : res.status(400).send({ description: "Something went wrong" })
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on creating new user: " + error.message, error: error ? error : {} });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userObj = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Update user JWT verification result: ", data);
                    const updateUserResult = await userService.updateUser(id, userObj);
                    updateUserResult && updateUserResult._id ? res.status(202).send(updateUserResult) : res.status(400).send({ description: "Something went wrong" })
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on Update user: " + error.message, error: error ? error : {} });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Delete an user JWT verification result: ", data);
                    const deleteResult = await userService.deleteUser(id);
                    res.send(deleteResult);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on delete an user: " + error.message, error: error ? error : {} });
    }
})

module.exports = router;