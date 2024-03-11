const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = Schema({
    email:{
        type:String
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;