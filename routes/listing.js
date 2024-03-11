const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const {validateListing,isLoggedIn, isOwner} = require("../middleware.js");
const {index, renderNewForm,showListing,createNewListing, renderEditForm,updateListing, destroyListing, renderTrendingListing,
  renderRoomsListing,renderMountainsListing,renderPoolsListing,renderArcticListing,renderFarmListing,renderBeachListing,renderLakesListing,renderHikingListing} = require("../controllers/listings.js");
//Middleware which checks is user loggedin
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
 .get(wrapAsync(index))
 .post(isLoggedIn, upload.single('listing[image]'),validateListing,wrapAsync(createNewListing))

router.get("/search",async(req,res)=>{
  let {country} = req.query;
  // console.log(req.query);
  let listings = await Listing.find({country:country});
  // console.log(listings);
  res.render("listings/search.ejs",{listings});
})

 //NEW ROUTE
 router.get("/new", isLoggedIn, renderNewForm);

//FILTERS
 router.get("/trending",renderTrendingListing);
 router.get("/rooms",renderRoomsListing);
 router.get("/mountains",renderMountainsListing);
 router.get("/pools",renderPoolsListing);
 router.get("/arctic",renderArcticListing);
 router.get("/farm",renderFarmListing);
 router.get("/beach",renderBeachListing);
 router.get("/lakes",renderLakesListing);
 router.get("/hiking",renderHikingListing);

 router.route("/:id")
  .get(wrapAsync(showListing))
  .patch(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing,wrapAsync(updateListing))
  .delete(isOwner, wrapAsync(destroyListing));

//EDIT ROUTE
router.get("/edit/:id", isOwner, wrapAsync(renderEditForm));//no need to check isLoggedIn



module.exports = router;
