const authRouter = require("express").Router();
let passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
let { CLIENT_ID, CLIENT_PW } = require("../config/secrets");
let connection = require("../model/db");
let {checkAuth, googleAuth, callbackAuth} = require("../controller/authController");


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

passport.use(
    new GoogleStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_PW,
        callbackURL: "http://localhost:3000/auth/callback",
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

authRouter.route("/checkAuth").get(checkAuth);
authRouter.route("/google").get(passport.authenticate('google' , {scope:['email' , 'profile']}) , googleAuth );
authRouter.route("/callback").get(passport.authenticate('google') , callbackAuth );


module.exports = authRouter;