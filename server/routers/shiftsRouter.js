const { Router } = require('express');
const shiftService = require('../services/shiftService');
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
                    console.log("Get all shifts JWT verification result: ", data);
                    const queries = req.query;
                    const departments = await shiftService.getAllShifts(queries);
                    res.send(departments);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on geting all shifts: " + error.message, error: error ? error : {} });
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
                    console.log("Get shift by ID JWT verification result: ", data);
                    const shift = await shiftService.getShiftById(id);
                    if (shift && shift._id) res.send(shift);
                    res.status(400).send({ description: "No shift found" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on get shift by ID: " + error.message, error: error ? error : {} });
    }
})

router.post('/', async (req, res) => {
    try {
        const newShift = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {

            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Creating new shift JWT verification result: ", data);
                    const shiftCreateResult = await shiftService.addShift(newShift);
                    shiftCreateResult && shiftCreateResult._id ? res.status(201).send(shiftCreateResult) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on creating new shift: " + error.message, error: error ? error : {} });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const shiftObj = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Update shift JWT verification result: ", data);
                    const updateShiftResult = await shiftService.updateShift(id, shiftObj);
                    updateShiftResult && updateShiftResult._id ? res.status(202).send(updateShiftResult) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on Update shift: " + error.message, error: error ? error : {} });
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
                    console.log("Delete an shift JWT verification result: ", data);
                    const deleteResult = await shiftService.deleteShift(id);
                    res.send(deleteResult);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on delete an shift: " + error.message, error: error ? error : {} });
    }
})

module.exports = router;