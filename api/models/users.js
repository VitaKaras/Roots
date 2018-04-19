let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    hash: String,
    salt: String
});


mongoose.model('User', userSchema);