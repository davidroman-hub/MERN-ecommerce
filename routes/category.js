const express = require('express')
const router = express.Router()

const {
    
    create
        
    
    } = require('../controllers/category');


router.post('/category/create',  create );

// router.get('/hello', requireSignin, (req,res) => {
//         res.send('hello there'); // <==== for only test
// })

module.exports = router;