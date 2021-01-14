const express = require("express");
const userRouter = require("./router/userRouter");
const app = express();


app.use(express.json());


// Users =>
// get all users , get a user , create a user ,  update a user , delete a user 

app.use("/api/user" , userRouter);





// POSTS ->
// get all posts , get a post , create a post , update a post , delete a post 
// app.use("/api/post" , postRouter);


// on the basis of id

// get all followers // get all following
// see pending request // send request // accept a pending request // cancel pending request // unfollow // 





 
app.listen(3000 , function(){
    console.log("app is listeningg at 3000 port !!");
})