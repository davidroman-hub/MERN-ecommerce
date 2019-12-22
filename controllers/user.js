const User = require('../models/user');
const jwt = require('jsonwebtoken'); // To generate sigin token 
const expressJwt = require('express-jwt');// for authorization check
const {errorHandler} = require('../helpers/dbErrorHandle');


exports.signup = (req, res) => {
    //console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err){
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        })
    } )
};

exports.signin = (req, res) =>{
    // find the user based email

    const { email, password} = req.body
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:' User with that email doesnt exist. Please sign up!'
            });
        }
        //if user is found make sure email and password match
        // create authenticate in user model
        
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Email and password dont match '
            })
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET) 
        //PERSIST THE TOKEN AS 'T' IN cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999})
        // return response with user and token to front end client
        const{_id, name, role} = user
        return res.json({token, user:{_id, email, name, role}})
    });

} ;













