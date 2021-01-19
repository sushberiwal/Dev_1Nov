const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const app = express();


app.use(express.json());


//Users =>
//get all users , get a user , create a user ,  update a user , delete a user 
app.use("/api/user" , userRouter);



//POSTS ->
//get all posts , get a post , create a post , update a post , delete a post 
app.use("/api/post" , postRouter);



// on the basis of id

// getUserById

// send request
app.post("/api/request" , function(req , res){

})


// accept a pending request
app.patch("/api/accept" , function(req , res){

})

// see pending request
app.get("/api/request/:uid" , function(req , res){

})
// cancel pending request
app.delete("/api/request" , function(req , res){

})

// get all followers 

// get all following
   
// unfollow





 
app.listen(3000 , function(){
    console.log("app is listeningg at 3000 port !!");
})