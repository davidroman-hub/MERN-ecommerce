const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');

require('dotenv').config();

//import routes
const userRoutes = require('./routes/user')

//app
const app = express()

//db

//DATABASE=mongodb+srv://david_roman:sandra1@ecommerce-u97it.mongodb.net/test?retryWrites=true&w=majority
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true
        
    })
    .then(() => console.log('DB Connected'));
   

    //routes
// app.get('/', (req,res)=>{
//     res.send('hello from node mutha fucka updates with nodemon');
// });

//middlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Routes middleware

app.use('/api', userRoutes);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})