const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor,validateReview } = require("../middleware.js");
const {addNewReview, destroyReview } = require("../controllers/reviews.js");



router.post("/",isLoggedIn, validateReview, wrapAsync(addNewReview));


//Review Delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(destroyReview));

module.exports = router;
