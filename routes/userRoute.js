const express = require('express');
const userController = require('../controller/userController');
const userRoute = express.Router();
userRoute.post('/register',userController.register);
userRoute.post('/login',userController.login);
userRoute.post('/logout',userController.logout);
module.exports = userRoute;
