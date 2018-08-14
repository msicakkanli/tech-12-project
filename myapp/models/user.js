const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'The user name is already exist'],
        required: [true, 'The user name is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true,'The name is required']
    },
    lastName: {
        type: String,
        required: [true,'The lastname is required']
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    }
})

UserSchema.pre('save',function (next) {
    var user = this;
    bcrypt.hash(user.password, 5, function (err,hash) {
        if (err) {
            return next (err);
        }
        user.password = hash;
        next();
    }) 
 });

 var User = mongoose.model(User, userSchema);
 module.exports = User;