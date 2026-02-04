const express = require("express");
const employeesService = require('../services/employeeService')
const jwt = require('jsonwebtoken');
const SECRET_KEY = "some_secret_key";


const router = express.Router();

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
                    console.log("Get all employees JWT verification result: ", data);
                    const queries = req.query;
                    const employees = await employeesService.getAllEmployees(queries);
                    res.send(employees);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on geting all employees: " + error.message, error: error ? error : {} });
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
                    console.log("Get employee by ID JWT verification result: ", data);
                    const employee = await employeesService.getEmployeeById(id);
                    res.send(employee);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on get employee by ID: " + error.message, error: error ? error : {} });
    }
})

router.post('/', async (req, res) => {
    try {
        const employeeObj = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {

            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Creating new employee JWT verification result: ", data);
                    const newEmployee = await employeesService.addEmployee(employeeObj);
                    res.status(200).send(newEmployee);
                    newEmployee && newEmployee._id ? res.status(201).send(newEmployee) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on creating new employee: " + error.message, error: error ? error : {} });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employeeObj = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Update employee JWT verification result: ", data);
                    const result = await employeesService.updateEmployee(id, employeeObj);
                    result && result._id ? res.status(202).send(result) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on Update employee: " + error.message, error: error ? error : {} });
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
                    console.log("Delete an employee JWT verification result: ", data);
                    const result = await employeesService.deleteEmployee(id);
                    res.send(result);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on delete an employee: " + error.message, error: error ? error : {} });
    }
})

module.exports = router