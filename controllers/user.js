const User = require('../models/user')

//////////////////// find user by Id ///////////////////

exports.userById = (req, res, next, id ) => {
    User.findById(id).exec((err, user )=>{
            if(err || !user){
                return res.status(400).json({
                    error: ' User not Found'
                });
            }
        req.profile = user;
        next();
    });
};



/////////////// read profile //////////////////

exports.read = (req, res) => { 
    req.profile.hashed_password = undefined; //because we dont want to send this when we want to read
    req.profile.salt = undefined ;// the same we dont want to send this 
    return res.json(req.profile);
}


/////////// Update //////////////////

exports.update = (req, res) => { 
    User.findOneAndUpdate(
        { _id: req.profile._id }, 
        { $set:req.body },
        { new:true },
        (err, user) => {
            if (err) { 
                return res.status(400).json({
                    error: "Youre not authorized to perfomthis action"
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user); 
        } )
} 