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
    login: async (req,res)=>{
        try{
            const {employeecode, password} = req.body;
            const admin = await Admin.findOne({employeecode});
            if(!admin){
                return res.status(400).json({message:"Admin not registered"});
            }
            const validPassword = await bcrypt.compare(password,admin.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            const token = jwt.sign({id: admin._id},jwtSecret)
            res.json({ message: 'Login successful' ,token});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
    logout: async(req,res)=>{
        res.clearCookie('token').json({message:"logout succesful"})
    }
}

module.exports = adminController;