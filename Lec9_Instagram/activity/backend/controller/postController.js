const connection = require("../model/db");
const {v4 : uuidv4} = require("uuid");


function getAllPosts(req , res){
        const sql = `SELECT * FROM post_table`;
        connection.query(sql , function(error , data){
            if(error){
                res.json({
                    message:"Failed To get all posts",
                    error
                })
            }
            else{
                res.status(200).json({
                    message:"got all posts !!",
                    data
                })
            }
        })        
}
function getPostById(req , res){
    const uid = req.params.uid;
    const sql = `SELECT * FROM post_table WHERE uid = '${uid}' `;
    console.log(sql);
    connection.query(sql , function(error , data){
        if(error){
            res.json({
                message:"failed to get post !",
                error
            })
        }
        else{
            if(data.length){
                res.status(200).json({
                    message:"Got post by id",
                    data
                })
            }
            else{
                res.status(200).json({
                    message:"No post FOUND !!!"
                })
            }
        }
    })


}
function updatePostById(req , res){
    const {caption , pid} = req.body;
    let sql = `UPDATE post_table SET caption = '${caption}' WHERE pid = '${pid}'`;
    // UPDATE post_table SET caption = "" WHERE pid=""
    connection.query(sql , function(error , data){
        if(error){
            res.json({
                message:"Failed to update",
                error
            })
        }
        else{
            res.status(201).json({
                message:"updated post !!",
                data
            })
        }
    })

}
function deletePostById(req , res){
    const pid = req.params.pid;
    const sql = `DELETE FROM post_table WHERE pid='${pid}' `;
    connection.query(sql , function(error , data){
        if(error){
            res.json({
                error
            })
        }
        else{
            if(data.affectedRows){
                res.status(201).json({
                    message:"Deleted post !!",
                    data
                })
            }
            else{
                res.json({
                    message:"No post Found !"
                })
            }
        }
    })

}
function createPostPromisified(postObject){
    return new Promise( function(resolve , reject){
        console.log("inside creaetePost Promisified");
        const {pid , uid , postImage , caption} = postObject;
        let createdOn = new Date();
        createdOn = createdOn.toString();
        createdOn = createdOn.substring(4 ,24);
        let sql = `INSERT INTO post_table(pid , uid , postImage , caption , createdOn ) VALUES ( '${pid}' , '${uid}' , '${postImage}' , '${caption}' , '${createdOn}')`;
        console.log(sql);
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
async function createPost(req , res){
    try{
        const pid = uuidv4();
        let postImage = req.file.destination + "/" + req.file.filename;
        postImage = postImage.substring(7);
        const {uid , caption } = req.body;
        //createdOn?
        let postObject = {
            pid , 
            uid ,  
            caption ,
            postImage 
        }
        let data = await createPostPromisified(postObject);
        res.status(200).json({
            message:"post Created Succssfully !!!",
            data
        })

    }
    catch(error){
        res.json({
            message:"Failed to create a post !",
            error
        })
    }
}


module.exports.getAllPosts = getAllPosts;
module.exports.getPostById = getPostById;
module.exports.updatePostById = updatePostById;
module.exports.deletePostById  =deletePostById;
module.exports.createPost = createPost;