
const asyncWrapper = require('../middleware/asyncWrapper')
const User = require('../models/user.model')
const httpStatusText = require('../utils/httpStatusText')
const appError = require('../utils/appError')
const bcrypt = require('bcryptjs')
const generateJwt = require('../utils/generateJwt')

const getAllUsers = asyncWrapper( async( req, res)=>{
    const limit = req.query.limit || 3
    const page = req.query.page || 1
    const skip = (page - 1) * limit
    const users = await User.find({},{"__v":false,"password":false})
    // const users = await User.find({},{"__v":false,"password":false}).limit(limit).skip(skip)
    res.json({status: httpStatusText.SUCCESS , data : {users}});
})
//
const register = asyncWrapper( async(req, res, next)=>{
    const { firstName, lastName, email, password, role} = req.body;
    const oldUser = await User.findOne({email:email})
    if(oldUser){
        const error = appError.create('user alread exists',400,httpStatusText.FAIL)
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role,
        avatar: req.file.filename
    })
    
    const token = await generateJwt({email: newUser.email, id: newUser._id, role: newUser.role})
    newUser.token = token;
    await newUser.save();
    
    res.status(201).json({status: httpStatusText.SUCCESS , data : {user:newUser}});
})
//
const login = asyncWrapper( async(req, res, next) => {
    const {email, password} = req.body;
    if(!email&& !password){
        const error = appError.create('email and password are required', 404, httpStatusText.FAIL)
        return next(error); 
    }
    const user = await User.findOne({email: email});
    if(!user){
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error); 
    }
    const matchedPassword = await bcrypt.compare(password, user.password)

    if(matchedPassword && user){
        const token = await generateJwt({email: user.email, id: user._id, role: user.role})
        res.status(200).json({status: httpStatusText.SUCCESS, data:{token}})
    }else {
        const error = appError.create('somthing wrong', 500, httpStatusText.ERROR)
        return next(error); 
    }
})

module.exports = {
    getAllUsers,
    register,
    login
}

