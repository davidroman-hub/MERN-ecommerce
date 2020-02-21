const express = require('express');
const router = express.Router();

// need to be auth and signin thats why we used the middleware here
const {requireSignin, isAuth} = require('../controllers/auth')
//also we gonna use user controllers as well
const { userById } = require('../controllers/user')
const { generateToken, processPayment } = require('../controllers/braintree')


router.get('/braintree/getToken/:userId',
            requireSignin,
            isAuth,
            generateToken )

router.get('/braintree/payment/:userId',
            requireSignin,
            isAuth,
            processPayment )

router.param('userId', userById)

module.exports = router