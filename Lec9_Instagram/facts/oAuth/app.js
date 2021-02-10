const app = require("express")();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const cookie = require("cookie-session");
// app.use(cookie({
//     maxAge:13*12*2,
//     keys:["kahska"]
// }))

app.use(require('cookie-parser'));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log("Inside serialize user !");
    console.log(user);
    done(null, user);
  });
  
  
  passport.deserializeUser((user, done) => {
    //get user
    console.log("Inside deserialize user !");
    console.log(user);
    done(null , user);
  });


passport.use(
  new GoogleStrategy(
    {
      clientID:
        "875118407406-h8ist02vnq1l5em3ibmcrndj60t9k5kq.apps.googleusercontent.com",
      clientSecret: "F_2DA2lcwkSTCdduPpLSEU_N",
      callbackURL: "http://localhost:4000/auth/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //   console.log("hello");
      // //   console.log("Request" , request);
      //   console.log("accessToken" , accessToken);
      // //   console.log("Refresh Token" , refreshToken);
      //   console.log("profile" , profile);
      //   console.log("done" , done);
      // here we can create user or get user and call done();
      let { email, id, name } = profile;
      let user = { id, email, name };
      done(null, user); //=> serialize
    }
  )
);



app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/auth/callback", passport.authenticate("google"), function (req, res) {
  console.log("inside auth/callback");
  console.log(req.user);
//   res.send({
//       status:"success",
//       user : req.user
//   });
res.redirect("/profile");
});

function authChecker(req ,res ,next){
    if(req.user){
        console.log(req.user);
        next();
    }
    else{
        res.send({
            status:"Log in first !"
        })
    }
}

app.get("/profile" , authChecker , function(req ,res){
res.send("Profile page !");
})

app.listen(4000, function () {
  console.log("app started at port 4000 !");
});
