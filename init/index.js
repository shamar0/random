const mongoose = require("mongoose");
const sampleListings = require("./data.js");
const Listing = require("../models/listing.js");
// const sampleListings = require("./data.js");


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then(res=>console.log("connected"));
main().catch(err=>console.log(err));

const addData = async()=>{
  await Listing.deleteMany({});
  let data = sampleListings.map((el)=>({
    ...el,
    owner:"65e76a81b1616e528dc73e42",
  }));
  let res = await Listing.insertMany(data);
  // console.log(res);
// let list1 = new Listing( {
//     title: "Cozy Beachfront Cottage",
//     description:
//       "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//       image:"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",      
//     price: 1500,
//     location: "Malibu",
//     country: "United States",
//   });
// let res = list1.save();
// console.log(res);
}
addData();

const random = async(req,res)=>{
  let listing = new Listing({
    title: "MY NEW BEACH",
    description:
      "nice",
      image:
      {
        url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        filename:"listingimage",
      },
    
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Rooms",
    // owner:"65e76a81b1616e528dc73e42"
  })
  let result = await listing.save();
  console.log(result);
}
// random();

const getData = async()=>{
  let listings = await Listing.find();
  for(listing of listings){
     if(listing.category=="Pools"){
      console.log(listing.description);
     }
  }
 
}
// getData();


