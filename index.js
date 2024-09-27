const mongoose = require('mongoose');
const {mongoDBURL} = require('./utils/config')
const app = require('./app');

mongoose.connect(mongoDBURL)
.then(()=> {
    console.log("connected to DB");
    app.listen(3001,()=>{
        console.log("server is running on port 3001 at http://localhost:3001")
    });
})
.catch(err=> console.error("couldn't connet to DB",err));