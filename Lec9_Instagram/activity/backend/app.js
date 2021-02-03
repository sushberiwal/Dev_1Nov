const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const requestRouter = require("./router/requestRouter");
const app = express();


app.use(express.json());
app.use(express.static("public"));

//Users =>
//get all users , get a user , create a user ,  update a user , delete a user 
app.use("/api/user" , userRouter);


//POSTS ->
//get all posts , get a post , create a post , update a post , delete a post 
app.use("/api/post" , postRouter);


// REQUESTS ->
app.use("/api/request" , requestRouter);
 
app.listen(3000 , function(){
    console.log("app is listeningg at 3000 port !!");
})