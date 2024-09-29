const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../utils/config');
const adminController = {
    register: async(req,res)=>{
        try{
            const {username,employeecode,password}  = req.body;
            const admin = await Admin.findOne({employeecode});
            if(admin){
                return res.status(400).json({message:"Admin already exists"})
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newAdmin = new Admin({username,employeecode,password:hashedPassword});
            await newAdmin.save();
            console.log('Admin saved successfully');
            res.status(201).json({message:"Admin created Succesfully"});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
}

module.exports = adminController;