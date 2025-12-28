const express = require('express');
const cors = require('cors');

const authRouter = require('./routers/authRouter');
const employeesRouter = require('./routers/employeesRouter')
const departmentsRouter = require('./routers/departmentsRouter')
const shiftsRouter = require('./routers/shiftsRouter')
const usersRouter = require('./routers/usersRouter')
const connectToDB = require('./configs/dbConnector');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/employees', employeesRouter)
app.use('/departments', departmentsRouter)
app.use('/shifts', shiftsRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
    connectToDB();
})