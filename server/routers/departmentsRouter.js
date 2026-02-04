const { Router } = require('express');
const departmentService = require('../services/departmentService');
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
                    console.log("Get all departments JWT verification result: ", data);
                    const queries = req.query;
                    const departments = await departmentService.getAllDepartments(queries);
                    res.send(departments);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on geting all departments: " + error.message, error: error ? error : {} });
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
                    console.log("Get department by ID JWT verification result: ", data);
                    const department = await departmentService.getDepartmentById(id);
                    if (department && department._id) res.send(department);
                    res.status(400).send({ description: "No department found" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on get department by ID: " + error.message, error: error ? error : {} });
    }
})

router.post('/', async (req, res) => {
    try {
        const depObj = req.body;
        const token = req.headers['x-access-token'];

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Creating new department JWT verification result: ", data);
                    const result = await departmentService.addDepartment(depObj);
                    result && result._id ? res.status(201).send(result) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on creating new department: " + error.message, error: error ? error : {} });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const depObj = req.body;

        if (!token)
            res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err)
                    res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Update department JWT verification result: ", data);
                    const result = await departmentService.updateDepartment(id, depObj);
                    result && result._id ? res.status(202).send(result) : res.status(400).send({ description: "Something went wrong" });
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on Update department: " + error.message, error: error ? error : {} });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers['x-access-token'];

        if (!token) res.status(401).send({ message: 'No token provided' });
        else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err) res.status(500).send({ message: 'Failed to authenticate token. ' + err })
                else {
                    console.log("Delete an departent JWT verification result: ", data);
                    const result = await departmentService.deleteDepartment(id);
                    res.send(result);
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: "Error on delete an departent: " + error.message, error: error ? error : {} });
    }
})

module.exports = router