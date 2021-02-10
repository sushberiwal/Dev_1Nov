const express = require("express");
const app = require("express")();
let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let { CLIENT_ID, CLIENT_PW } = require("./config/secrets");

// static files
app.use(express.static("public"));

// setup passport before use
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_PW,
      callbackURL: "http://localhost:4000/auth/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
        // console.log("Request" , request);
        console.log("ACCESSTOKE" , accessToken);
        // console.log("refresh token" , refreshToken);
        console.log("profile" , profile);
        // console.log("done" , done);
    }
  )
);



app.get("/auth/google",  passport.authenticate('google' , {scope:['email' , 'profile']})  ,  function (req, res) {
  res.send("<h1>GOOGLE CONSENT FORM !!</h1>")
});


app.get("/auth/callback" ,  passport.authenticate('google')  , function(req , res){
    res.send("USER AUTHENTICATED");
})



app.listen(4000, function () {
  console.log("App is listening at port 4000 !!");
});
