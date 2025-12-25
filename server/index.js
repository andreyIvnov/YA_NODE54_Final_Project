const express = require('express');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const employeesRouter = require('./routers/employeesRouter')
const departmentsRouter = require('./routers/departmentsRouter')
const connectToDB = require('./configs/dbConnector');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/employees', employeesRouter)
app.use('/departments', departmentsRouter)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    connectToDB();
})