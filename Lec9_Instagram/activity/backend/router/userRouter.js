const express = require("express");
const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } = require("../controller/userController");
const userRouter = express.Router();


const multer = require("multer");


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/images/user')
  },
  filename: function (req, file, cb) {
      console.log(file);
    cb(null, file.fieldname + '-' + Date.now())
  }
})

function fileFilter (req, file, cb) {
    console.log(file);
    // cb(null, false)
    
    // cb(null, true)
    
  }


const upload = multer({
  storage:storage,
  fileFilter:fileFilter
});





// localhost:3000/api/users/
userRouter.route("/").get(getAllUsers).post( upload.single('user') , createUser);
// localhost:3000/api/users/:uid
userRouter.route("/:uid").get(getUserById).delete(deleteUserById).patch(updateUserById);


module.exports = userRouter;

