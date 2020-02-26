const express = require('express');
const router = express.Router();

// need to be auth and signin thats why we used the middleware here
const {requireSignin, isAuth,isAdmin} = require('../controllers/auth')
//also we gonna use user controllers as well
const { userById, addOrderToUserHistory } = require('../controllers/user')
const { create,listOrders } = require('../controllers/order')
const { decreaseQuantity } = require("../controllers/product")


router.post(
    "/order/create/:userId",
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create,
    )

// list all the orders in the front end !
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin,listOrders);





router.param('userId', userById)

module.exports = router