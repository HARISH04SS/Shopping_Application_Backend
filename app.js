const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute')
const adminRouter = require('./routes/adminRoute');
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);
module.exports = app;