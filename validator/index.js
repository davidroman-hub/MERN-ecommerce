exports.userSignupValidator = (req, res, next) =>{
    req.check('name','Name is Required').notEmpty()
    req.check('email', 'Email most be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4, 
            max:32
        })
        req.check('password', 'Password is required').notEmpty()
        req.check('password')
        .isLength({min: 6})
        .withMessage('Password mus contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain Number')
            const errors = req.validationErrors()
            if (errors){
                const firstError = errors.map(error => error.msg)[0]
                return res.status(400).json({ error:firstError});
            }
            next();
}