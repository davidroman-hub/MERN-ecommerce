const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs')
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandle')

exports.productById = (req,res, next, id) =>{
    
    Product.findById(id).exec((err,product)=>{

        if(err || !product){
            return res.status(400).json({
                error:'Product not found'
            })
        }

        req.product = product;
        next();
    });
};

exports.read = (req, res)=>{
    req.product.photo = undefined
    return res.json(req.product);
}

exports.create = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err,fields,files) => {

            if(err){
                return res.status(400).json({
                    error:'image could not be uploaded'
                });
            }

                //check for all the fields are required

                const {name, description, price, category,shipping, quantity} = fields

                if(!name || !description || !price || !category || !shipping || !quantity){
                    return res.status(400).json({
                        error:'All fields are required'
                    })
                }


                let product = new Product(fields)

                //1kb == 1000
                //1mb = 1 000 000

                if(files.photo){
                    //console.log('FILES PHOTO:', files.photo); // to see the size of the photo
                    if(files.photo.size >1000000){ //this is for auth the photo is less than 1 mb
                        return res.status(400).json({
                            error:"the image should be less than 1 mb size"
                        })
                    }
                    product.photo.data = fs.readFileSync(files.photo.path)
                    product.photo.contentType = files.photo.type
                }

                product.save((err,result)=>{
                    if(err){
                        return res.status(400).json({
                            error:errorHandler(error)
                        })
                    }

                    res.json(result)

                });
          });

        };

    exports.remove = (req, res) => {
        
    let product = req.product
        product.remove((err, deletedProduct)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json({
            //    deletedProduct,
             "message":"Product deleted succesfully"
            })
        })
    }
    
    exports.update = (req, res) => {

        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err,fields,files) => {
    
                if(err){
                    return res.status(400).json({
                        error:'image could not be uploaded'
                    });
                }
    
                    //check for all the fields are required
    
                    const {name, description, price, category,shipping, quantity} = fields
    
                    if(!name || !description || !price || !category || !shipping || !quantity){
                        return res.status(400).json({
                            error:'All fields are required'
                        })
                    }
    
    
                    let product = req.product;
                    product = _.extend(product, fields);
    
                    //1kb == 1000
                    //1mb = 1 000 000
    
                    if(files.photo){
                        //console.log('FILES PHOTO:', files.photo); // to see the size of the photo
                        if(files.photo.size >1000000){ //this is for auth the photo is less than 1 mb
                            return res.status(400).json({
                                error:"the image should be less than 1 mb size"
                            })
                        }
                        product.photo.data = fs.readFileSync(files.photo.path)
                        product.photo.contentType = files.photo.type
                    }
    
                    product.save((err,result)=>{
                        if(err){
                            return res.status(400).json({
                                error:errorHandler(error)
                            })
                        }
    
                        res.json(result)
    
                    });
              });
    
            };


    // Sell / Arrival //
    
// we want to return the product  by sell = /products? sortyBy=sold&order=desc&limit=4

//by arrival = /products?sortyBy=createAt&order=desc&limit=4
//if no params are sent  , then all products are returned 


exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.By ? req.query.By : 'asc'
    let limit = req.query.limit ? req.query.limit : 6


    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.statu(400).json({
                error: 'Product not foud'
            })
        }
        res.send(products)
    });

}

    