const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const listingSchema = require("./models/listing.js");
const reviewSchema = require("./models/review.js");

//  for login and storing originalUrl 

module.exports.validateListing = (req,res,next)=>{ //server-side validation so that noone can send invalid information from hopscotch, postman...
    let {error} = listingSchema.validate(req.body);
    if(error){
      throw new Error(error);
    }
    else{
      next();
    }
   }

 module.exports.validateReview = (req,res,next)=>{ //server-side validation so that noone can send invalid information from hopscotch, postman...
    let {error} = reviewSchema.validate(req.body);
    if(error){
      throw new Error(error);
    }
    else{
      next();
    }
   }

module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
    //    console.log(redirectUrl);
        req.flash("error", "you must be logged in to create a new listing");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
      res.locals.redirectUrl = req.session.redirectUrl;
      next();
}

module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing.owner);
    // console.log("bbbb");
    // console.log(req.user);
    if(req.user && listing.owner._id.equals(req.user._id)){
        return next();
    }
    req.flash("error","you aren't the owner of this listing");
     res.redirect(`/listings/${id}`);
}

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    // console.log(listing.owner);
    // console.log(review.author);
    if(req.user && review.author.equals(req.user._id)){
      return next();
    }
     req.flash("error","you aren't the author of this review");
     res.redirect(`/listings/${id}`);
}
