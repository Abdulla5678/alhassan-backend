require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
const httpStatusText = require('./utils/httpStatusText');
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(url).then(() => {
    console.log("Database Connected");
});

app.use(cors());
app.use(express.json());

app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: httpStatusText.ERROR,
        msg: `Error message: resource not found`,
        code: 404,
    });
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        msg: error.message,
        code: error.statusCode || 500,
        data: null
    });
});


module.exports = app;
