const express = require("express");
const employeesService = require('../services/employeeService')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // const token = req.headers['x-access-token'];

        // if (!token) {
        //     res.status(401).json("UNAuthorazed action")
        // }

        // const SECRET_KEY = "some_secret_key";

        // jwt.verify(token, SECRET_KEY, (err, data) => {
        //     if(err) res.status(500).json('Failed to authenticate token');

        //     console.log(data);

        //     //FILL the employees data
        //     const employees = [];

        //     res.send(employees);
        // })
        const queries = req.query;
        const employees = await employeesService.getAllEmployees(queries);
        res.send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeesService.getEmployeeById(id);
        res.send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    try {
        const employeeObj = req.body;
        const newEmployee = await employeesService.addEmployee(employeeObj);
        res.status(200).send(newEmployee);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employeeObj = req.body;
        const result = await employeesService.updateEmployee(id, employeeObj);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const result = await employeesService.deleteEmployee(id);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router