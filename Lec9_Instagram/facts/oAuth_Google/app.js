const express = require("express");
const app = require("express")();
let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let { CLIENT_ID, CLIENT_PW } = require("./config/secrets");
let connection = require("../../activity/backend/model/db");
let cookie = require("cookie-session");
// static files
app.use(express.static("public"));

app.use(cookie({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["askjdbajsbvfwfbha"],
}))



app.use(passport.initialize());
app.use(passport.session());




passport.serializeUser( function(user , done){
    console.log("inside serailize user !!");
    console.log(user);
    // console.log(done);
    done(null , user);
});

// already cookie was present
passport.deserializeUser( function(data , done){
    console.log("Inside deserialize");
    console.log(data);
    // console.log(done);
    done(null , data);
});


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
        console.log("ACCESSTOKEN" , accessToken);
        console.log("profile" , profile);
        let { email , id , displayName , given_name } = profile;
        let sql = `SELECT * FROM user_table WHERE email = '${email}'`;
        // profile => first time user // already signed up
        connection.query(sql , function(error , data){
            if(error){
                done(error);
            }
            if(data.length){
                // user pehle se signed up hain
                console.log(data);
                console.log("user already signed up !!");
                // done
                done( null , data[0] );
            }
            else{
                // createUser
                let sql = `INSERT INTO user_table(uid , name , email , username ) VALUES('${id}' , '${displayName}' , '${email}' , '${given_name}')`;
                connection.query(sql , function(err , data){
                    if(err){
                        done(err);
                    }else{
                        console.log("User created !!!");
                        // console.log(data);
                        //
                        let sql = `SELECT * FROM user_table WHERE email = '${email}'`;
                        connection.query(sql , function(error , data){
                            if(error){
                                done(error);
                            }
                            else{
                                done(null , data[0]);
                            }
                        })
                    }
                })
            }
        })
        
        
    }
  )
);





app.get("/auth/google",  passport.authenticate('google' , {scope:['email' , 'profile']})  ,  function (req, res) {
  res.send("<h1>GOOGLE CONSENT FORM !!</h1>")
});


app.get("/auth/callback" ,  passport.authenticate('google')  , function(req , res){
    res.send("USER AUTHENTICATED");
    console.log(req.user);
})


function checkAuth(req , res , next){
    if(req.user){
        // user is logged in
        next();
    }else{
        // user not logged in
        res.send("YOU ARE NOT LOGGED IN !!!");
    }   

}

app.get("/profile" , checkAuth , function(req , res){
    res.send(`WELCOME TO PROFILE PAGE ${req.user.name}`);
})


app.listen(4000, function () {
  console.log("App is listening at port 4000 !!");
});
