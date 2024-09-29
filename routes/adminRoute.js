const express = require('express');
const adminController = require('../controller/adminController');
const adminRoute = express.Router();
adminRoute.post('/register',adminController.register);
module.exports = adminRoute;
