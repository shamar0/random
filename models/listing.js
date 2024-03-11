const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema =  Schema({
    title:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    image:{
       url:String,
       filename:String
    },
    price:{
        type:Number,
        // required:true
    },
    location:{
        type:String,
        // required:true
    },
    country:{
        type:String,
        // required:true
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        enum:["Trending","Rooms", "Mountains", "Pools", "Arctic", "Farm", "Beach","Lakes","Hiking"]
    },
}
)
listingSchema.post("findOneAndDelete", async(listing)=>{ //mongoose middleware
     if(listing.reviews.length){
        let del = await Review.deleteMany({_id:{$in:listing.reviews}});
        // console.log(del);
     }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;