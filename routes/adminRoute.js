const express = require('express');
const adminController = require('../controller/adminController');
const adminRoute = express.Router();
adminRoute.post('/register',adminController.register);
adminRoute.post('/login',adminController.login);
adminRoute.post('/logout',adminController.logout);
adminRoute.post('/createproduct',adminController.createproduct);
module.exports = adminRoute;

