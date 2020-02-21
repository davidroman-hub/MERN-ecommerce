const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors')

require('dotenv').config();

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

//braintree
const braintreeRoutes = require('./routes/braintree');

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
app.use(cors());

//Routes middleware

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', braintreeRoutes);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})