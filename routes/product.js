const express = require('express');
const router = express.Router();

const { create,
        productById, 
        read, 
        remove, 
        update, 
        list, 
        listRelated, 
        listCategories

        
     } = require('../controllers/product');




const {requireSignin, isAuth, isAdmin} = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read)

router.post(
    
    '/product/create/:userId',
    requireSignin,
    isAdmin,
    isAuth,
    create 
    
    );
router.delete(
    
    '/product/:productId/:userId',
    requireSignin,
    isAdmin,
    isAuth,
    remove 
    );

router.put(
    
        '/product/:productId/:userId',
        requireSignin,
        isAdmin,
        isAuth,
        update 
        );


router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)



router.param("userId", userById);
router.param("productId",productById);


module.exports = router;