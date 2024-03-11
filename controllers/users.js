const User = require("../models/user.js");

module.exports.renderSignupForm = async(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.postSignup = async(req,res)=>{
    try{
        let {email,username,password,}=req.body;
        let user = new User({
            email:email,
            username:username,
        })
       let registeredUser= await User.register(user,password);
       req.login(registeredUser,(err)=>{
        if(err) return next(err);
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
       })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    // console.log(email);
    // res.send("done");
}

module.exports.renderLoginForm = async(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.postLogin = async(req,res)=>{
    req.flash("success","Welcome back");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(`${redirectUrl}`);
}

module.exports.logout = async(req,res,next)=>{
    req.logout((err)=>{
        if(err) return next(err);
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
}