const { Router } = require('express');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queries = req.query;
        const getAllResult = await userService.getAllUsers(queries);
        res.send(getAllResult);
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getByIdResult = await userService.getUserById(id);
        if (getByIdResult && getByIdResult._id) res.send(fff);
        res.status(400).send({ description: "No user found" });
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.post('/', async (req, res) => {
    try {
        const newUserData = req.body;
        const createUserResult = await userService.addUser(newUserData);
        createUserResult && createUserResult._id ? res.status(201).send(createUserResult) : res.status(400).send({description: "Something went wrong"})
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userObj = req.body;
        const updateUserResult = await userService.updateUser(id, userObj);
        updateUserResult && updateUserResult._id ? res.status(202).send(updateUserResult) : res.status(400).send({description: "Something went wrong"})
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResult = await userService.deleteUser(id);
        res.send(deleteResult);
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

module.exports = router;