const express = require("express");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const { getUserById, getUserByIdPromisified } = require("./controller/userController");
const connection = require("./model/db");
const app = express();


app.use(express.json());


//Users =>
//get all users , get a user , create a user ,  update a user , delete a user 
app.use("/api/user" , userRouter);



//POSTS ->
//get all posts , get a post , create a post , update a post , delete a post 
app.use("/api/post" , postRouter);



// on the basis of id

function addInFollowingTable(uid , follow_id , isPublic){
    return new Promise(function(resolve , reject){
        let sql;
        if(isPublic){
            sql = `INSERT INTO following_table(uid , followId) VALUES('${uid}' , '${follow_id}')`;
        }
        else{
            sql = `INSERT INTO following_table(uid , followId , isAccepted ) VALUES('${uid}' , '${follow_id}' , false )`;
        }
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}


function addInFollowerTable( follower_id , uid  ){
    return new Promise(function(resolve , reject){
        let sql = `INSERT INTO follower_table(uid , followerId) VALUES('${uid}' , '${follower_id}')`;
        connection.query(sql , function(error , data){
            if(error){
                reject(error);
            }
            else{
                resolve(data);
            }
        })
    })
}

// send request
app.post("/api/request" , async function(req , res){
    try{
        let {uid , follow_id} = req.body;
        let user = await getUserByIdPromisified(follow_id);
        console.log(user);
        let isPublic = user[0].isPublic;
        if(isPublic){
            console.log("inside is Public true");
            //add in following table with isAccepted = true
            let followData = await addInFollowingTable(uid , follow_id , true);
            let followerData = await addInFollowerTable(uid , follow_id);
            res.json({
                message:"Request sent and accepted !!",
                followData,
                followerData
            })
        }
        else{
            console.log("inside isPublic false");
            //add in following table with isAccepted = false
            let data = await addInFollowingTable(uid , follow_id);
            console.log(data);
            res.json({
                message:"Request Sent and is Pending !!",
                data
            })
        }
    }
    catch(error){
        res.json({
            message:"failed to send request !!",
            error
        })
    }


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