const mongoose =  require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:true,
        maxlength:32
    }
})