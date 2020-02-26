const { Order, CartItem } = require('../models/order')
const { errorHandler } = require('../helpers/dbErrorHandle')

// create order method

exports.create =(req, res) => {
     console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data)=>{
        if(error){
            return res.status(400).json({ 
                error: errorHandler(error)
            })
        }
        res.json(data)
    })

}

//List orders to the front-end

exports.listOrders = (req, res) => {
    Order.find()
    .populate('user','_id name address')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(error)
            });
        }
        res.json(orders)
    })
}

