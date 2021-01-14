const express = require("express");
const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } = require("../controller/userController");
const userRouter = express.Router();





// localhost:3000/api/users/
userRouter.route("/").get(getAllUsers).post(createUser);
// localhost:3000/api/users/:uid
userRouter.route("/:uid").get(getUserById).delete(deleteUserById).patch(updateUserById);


module.exports = userRouter;

