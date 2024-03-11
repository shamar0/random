const express = require("express");
const router = express.Router();

const User= require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignupForm,postSignup, renderLoginForm, postLogin, logout } = require("../controllers/users.js");

router.route("/signup")
 .get(renderSignupForm)
 .post(postSignup);

 router.route("/login")
 .get( renderLoginForm)
 .post(saveRedirectUrl,  passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}),postLogin);


router.get("/logout", logout );

module.exports = router;