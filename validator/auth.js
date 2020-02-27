const {check} = require('express-validator')


exports.forgotPasswordValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email')
]

exports.resetPasswordValidator = [

    check('newPassword')
    .isLength({min:6})
    .withMessage('new password must have 6 characters mi perro'),

    check('resetPasswordLink')
    .not()
    .isEmpty()
    .withMessage('token is required')

]