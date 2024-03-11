const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.addNewReview = async(req,res)=>{
    // let {id} = req.params;
    let listing = await Listing.findById(req.params.id);
    // console.log(listing);
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    // console.log(newReview);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    // console.log(req.body.review);
    req.flash("success","New review added");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
     await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
    
};