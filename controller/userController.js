const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils/config');
const userController = {
    register: async (req,res) => {
        try{
            const {username,phonenumber,password}  = req.body;
            const user = await User.findOne({phonenumber});
            if(user){
                return res.status(400).json({message:"User already exists"})
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = new User({username,phonenumber,password:hashedPassword});
            await newUser.save();
            console.log('User saved successfully');
            res.status(201).json({message:"User created Succesfully"});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
    login: async (req,res)=>{
        try{
            const {phonenumber, password} = req.body;
            const user = await User.findOne({phonenumber});
            if(!user){
                return res.status(400).json({message:"User not registered"});
            }
            const validPassword = await bcrypt.compare(password,user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            const token = jwt.sign({id: user._id},jwtSecret)
            res.json({ message: 'Login successful' ,token});
        }catch(error){
            res.status(500).json({message:error.message});
        }
    },
    logout: async(req,res)=>{
        res.clearCookie('token').json({message:"logout succesful"})
    }
}

module.exports = userController;