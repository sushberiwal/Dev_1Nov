const express = require("express");
// const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } = require("../controller/userController");
const {getAllPosts , createPost , getPostById , deletePostById , updatePostById} = require("../controller/postController.js");
const postRouter = express.Router();





// localhost:3000/api/users/
postRouter.route("/").get(getAllPosts).post(createPost);
// localhost:3000/api/users/:uid
postRouter.route("/:pid").get(getPostById).delete(deletePostById).patch(updatePostById);


module.exports = postRouter;

