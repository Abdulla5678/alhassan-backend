require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const coursesRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')
const httpStatusText = require('./utils/httpStatusText')
const mongoose = require('mongoose');
const url = process.env.MONGO_URL
const path = require('path')

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
mongoose.connect(url).then(()=>{
    console.log("database Connected");
})

app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => {
    res.send('API is working!');
});
app.use('/api/courses',coursesRouter)
app.use('/api/users', usersRouter)
app.all('*',(req,res,next)=>{
    return res.status(404).json({
            status: httpStatusText.ERROR,
            msg:`error message: resource not found`,
            code: 404,
        })
})
app.use(( error, req, res, next)=>{
    res.status( error.statusCode|| 500).json({
        status: error.statusText|| httpStatusText.ERROR,
        msg:error.message,
        code:error.statusCode|| 500,
        data:null
    })
})

// app.listen(process.env.PORT || 5000,()=>{
//     console.log('Server is running on port 5000... :)');
    
// })

module.exports = app;
