const express = require('express');
const userController = require('../controllers/users.controller');
const varifyToken = require('../middleware/varifyToken')
const multer = require('multer');
const appError = require('../utils/appError');
const diskStorage = multer.diskStorage({
    destination:function(req, file, callBack){
        console.log('file',file);
        callBack(null, 'uploads');
    },
    filename:function(req, file, callBack){
        const extension = file.mimetype.split("/")[1]
        const fileName = `user-${Date.now()}.${extension}`;
        callBack(null, fileName);
    }
})
const fileFilter = (req, file, callBack)=>{
    const imgType = file.mimetype.split("/")[0]
    imgType==='image'? callBack(null,true):callBack(appError.create('the file must be an image',400),false)
}
const upload = multer({
    storage:diskStorage,
    fileFilter:fileFilter
})

const router = express.Router()

router.route('/')
    .get(varifyToken,userController.getAllUsers)

router.route('/register')
    .post(upload.single('avatar'), userController.register)

router.route('/login')
    .post(userController.login)



module.exports = router;
