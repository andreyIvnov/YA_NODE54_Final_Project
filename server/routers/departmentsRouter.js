const { Router } = require('express');
const departmentService = require('../services/departmentService');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queries = req.query;
        const departments = await departmentService.getAllDepartments(queries);
        res.send(departments);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentService.getDepartmentById(id);
        if(department && department._id) res.send(department);
        res.status(400).send({ description: "No department found" });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) =>{
    try {
        const depObj = req.body;
        const result = await departmentService.addDepartment(depObj);
        (result && result._id ? res.status(201) : res.status(400)).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const depObj = req.body;
        const result = await departmentService.updateDepartment(id, depObj);
        (result && result._id ? res.status(202) : res.status(400)).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await departmentService.deleteDepartment(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router