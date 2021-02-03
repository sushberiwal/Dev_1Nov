const express = require("express");
const { getAllUsers, createUser, getUserById, deleteUserById, updateUserById } = require("../controller/userController");
const userRouter = express.Router();
const path = require("path");
const multer = require("multer");

// create => json data , image 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images/user');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

// only accept mimetype == image 
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


// localhost:3000/api/users/
userRouter.route("/").get(getAllUsers).post(upload.single('user') , createUser);
// localhost:3000/api/users/:uid
userRouter.route("/:uid").get(getUserById).delete(deleteUserById).patch(upload.single('user') , updateUserById);


module.exports = userRouter;

