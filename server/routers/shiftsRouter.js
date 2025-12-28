const { Router } = require('express');
const shiftService = require('../services/shiftService');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queries = req.query;
        const departments = await shiftService.getAllShifts(queries);
        res.send(departments);
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const shift = await shiftService.getShiftById(id);
        if(shift && shift._id) res.send(shift);
        res.status(400).send({ description: "No shift found" });
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.post('/', async (req, res) => {
    try {
        const newShift = req.body;
        const shiftCreateResult = await shiftService.addShift(newShift);
        shiftCreateResult && shiftCreateResult._id ? res.status(201).send(shiftCreateResult) : res.status(400).send({description: "Something went wrong"});
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const shiftObj = req.body;
        const updateShiftResult = await shiftService.updateShift(id, shiftObj);
        updateShiftResult && updateShiftResult._id ? res.status(202).send(updateShiftResult) : res.status(400).send({description: "Something went wrong"});
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteResult  = await shiftService.deleteShift(id);
        res.send(deleteResult);
    } catch (error) {
        res.status(500).send({ message: error.message, error: error ? error : ""});
    }
})

module.exports = router;