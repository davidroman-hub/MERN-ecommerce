const express = require('express')
const router = express.Router()

const {
    
        signup,
        signin,
        signout,
        requireSignin,
        forgotPassword,
        resetPassword 
    
    } = require('../controllers/auth')


 const {userSignupValidator} = require ('../validator/index')
//const{forgotPasswordValidator, resetPasswordValidator} = require ('../validator/auth')
//const {runValidation}= require('../validator/index')

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

//forgot password..

// router.put('/forgot-password',forgotPasswordValidator,runValidation,forgotPassword)
// router.put('/reset-password',resetPasswordValidator,runValidation,resetPassword)

// router.get('/hello', requireSignin, (req,res) => {
//         res.send('hello there'); // <==== for only test
// })

module.exports = router;