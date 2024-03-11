const Listing = require("../models/listing.js");

module.exports.index = async(req,res)=>{
    let listings = await Listing.find();
    res.render("listings/index.ejs",{listings});
}

module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);
    // if(!req.isAuthenticated()){
    //     req.flash("error", "you must be logged in to create a new listing");
    //     res.redirect("/login");
    // }
    res.render("listings/new.ejs");
}

module.exports.showListing = async(req,res)=>{
    let listing = await Listing.findById(req.params.id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if(!listing){ 
        req.flash("error","Listing which you are trying to access doesn't exist");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.renderEditForm = async(req,res)=>{ 
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing which you are trying to access doesn't exist");
        res.redirect("/listings");
    }
 
    res.render("listings/edit.ejs", {listing});
}

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,req.body.listing,{new:true});
    // if(typeof req.file != "undefined"){
    if( req.file ){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image= {url,filename};
    }
    await listing.save();
    // console.log(result);
    req.flash("success"," Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{ //no need to check isLoggedIn as if not loggedIn then isOwner gives error
    let delListing =   await Listing.findByIdAndDelete(req.params.id,{new:true});
   //  console.log(delListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};

module.exports.createNewListing = async(req,res,next)=>{
    const newListing = new Listing(req.body.listing);
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
    }
    
    newListing.owner = req.user._id;
    console.log(newListing);
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.renderTrendingListing = async(req,res)=>{
    let listings = await Listing.find({category:"Trending"});
    // console.log(listings);
    res.render("listings/filters/trending.ejs",{listings});
}
module.exports.renderRoomsListing = async(req,res)=>{
    let listings = await Listing.find({category:"Rooms"});
    // console.log(listings);
    res.render("listings/filters/rooms.ejs",{listings});
}
module.exports.renderMountainsListing = async(req,res)=>{
    let listings = await Listing.find({category:"Mountains"});
    // console.log(listings);
    res.render("listings/filters/mountains.ejs",{listings});
}
module.exports.renderPoolsListing = async(req,res)=>{
    let listings = await Listing.find({category:"Pools"});
    // console.log(listings);
    res.render("listings/filters/pools.ejs",{listings});
}
module.exports.renderArcticListing = async(req,res)=>{
    let listings = await Listing.find({category:"Arctic"});
    // console.log(listings);
    res.render("listings/filters/arctic.ejs",{listings});
}
module.exports.renderFarmListing = async(req,res)=>{
    let listings = await Listing.find({category:"Farm"});
    // console.log(listings);
    res.render("listings/filters/farm.ejs",{listings});
}
module.exports.renderBeachListing = async(req,res)=>{
    let listings = await Listing.find({category:"Beach"});
    // console.log(listings);
    res.render("listings/filters/beach.ejs",{listings});
}
module.exports.renderLakesListing = async(req,res)=>{
    let listings = await Listing.find({category:"Lakes"});
    // console.log(listings);
    res.render("listings/filters/lakes.ejs",{listings});
}
module.exports.renderHikingListing = async(req,res)=>{
    let listings = await Listing.find({category:"Hiking"});
    // console.log(listings);
    res.render("listings/filters/hiking.ejs",{listings});
}