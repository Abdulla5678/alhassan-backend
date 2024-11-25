const express = require('express');
const courseController = require('../controllers/courses.controller')
const {validationSchema} = require('../middleware/validationSchema')
const allowedTo = require('../middleware/allowedTo')
const varifyToken = require('../middleware/varifyToken')
const userRoles = require('../utils/userRoles')
const router = express.Router()

router.route('/')
    .get(courseController.getAllCourse)
    .post(courseController.addCourse)

router.route('/:courseId')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(varifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), courseController.deleteCourse)

module.exports = router;
