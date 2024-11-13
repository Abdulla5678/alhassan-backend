const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const jwt = require('jsonwebtoken')
const varifyToken = (req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']

    if(!authHeader){
        const error = appError.create('token is required',401,httpStatusText.ERROR)
        return next(error);
    }
    const token = authHeader.split(' ')[1]
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(currentUser);
        
        req.currentUser = currentUser;
        next()
    }catch (e) {
        const error = appError.create('invalid_token',401,httpStatusText.ERROR)
        return next(error);
    }
    
}

module.exports = varifyToken