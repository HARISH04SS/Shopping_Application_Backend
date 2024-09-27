const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
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
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = userController;