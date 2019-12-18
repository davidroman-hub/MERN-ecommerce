const express = require('express');
const mongoose =require('mongoose')
require('dotenv').config();


//app
const app = express()
//db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true
        
    })
    .then(() => console.log('DB Connected'));
   

    //routes
app.get('/', (req,res)=>{
    res.send('hello from node mutha fucka updates with nodemon');
});

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})