const express = require('express');
const { connect } = require('./configs/mongoDB.config');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const boardRouter = require('./routes/board.routes');
const columnRouter = require('./routes/column.routes');
const taskRouter = require('./routes/task.routes');
const tagRouter = require('./routes/tags.routes');

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/columns', columnRouter);
app.use('/tasks', taskRouter);
app.use('/tags', tagRouter);

app.listen(port, (error) => {
    if (error) {
        console.log('Error while starting the server');
    }

    console.log(`Server is running on port ${port}`);
    connect();
});

