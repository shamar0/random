const mongoose = require("mongoose");
const {Schema} = mongoose;
const User = require("./user.js");

const reviewSchema = Schema({
    rating:Number,
    comment:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
})
const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;