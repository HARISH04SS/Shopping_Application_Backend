const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: 
    { type: String, 
        required: true, 
        unique: true
     },
    isAvailable: { 
        type: Boolean,
         default: true 
        },
    price: {
         type: Number, 
         required: true 
        },
    description:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
