const connection = require("../model/db");
const { v4: uuidv4 } = require("uuid");



function getAllUsers(req, res) {
  const sql = `SELECT * FROM user_table`;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed To get all users",
        error,
      });
    } else {
      res.status(200).json({
        message: "got all users !!",
        data,
      });
    }
  });
}

function getUserByIdPromisified(uid) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM user_table WHERE uid = '${uid}' `;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function getUserById(req, res) {
  try {
    const uid = req.params.uid;
    let data = await getUserByIdPromisified(uid);
    if (data.length) {
      res.status(200).json({
        message: "Got user by id",
        data,
      });
    } else {
      res.status(200).json({
        message: "No User FOUND !!!",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to get User !",
      error,
    });
  }
}
function updateUserById(req, res) {
  const uid = req.params.uid;
  const updateObject = req.body;
  let sql = `UPDATE user_table SET `;
  for (key in updateObject) {
    sql += `${key} = '${updateObject[key]}' ,`;
  }
  if(req.file){
    let pimage = req.file.destination + "/" + req.file.filename;
    // public/images/user/akjsbfasbhf.jpeg
    pimage = pimage.substring(7);
    sql += ` pimage = '${pimage}' ` 
  }
  // sql = sql.substring(0, sql.length - 1);
  sql += `WHERE uid = '${uid}'`;
  // UPDATE user_table
  // SET "name"="IRON MAN" "bio":"I am billionaire"
  // WHERE uid = '1313131'
  // const sql ???
  console.log(sql);
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed to update",
        error,
      });
    } else {
      res.status(201).json({
        message: "updated user !!",
        data,
      });
    }
  });
}
function deleteUserById(req, res) {
  const uid = req.params.uid;
  const sql = `DELETE FROM user_table WHERE uid='${uid}' `;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        error,
      });
    } else {
      if (data.affectedRows) {
        res.status(201).json({
          message: "Deleted user !!",
          data,
        });
      } else {
        res.json({
          message: "No user Found !",
        });
      }
    }
  });
}
function createUserPromisified(userObject) {
  return new Promise(function (resolve, reject) {
    const { uid, name, email, pw, username, bio, isPublic , pimage} = userObject;
    let sql;
    if (isPublic != undefined) {
      sql = `INSERT INTO user_table(uid , name , email , pw , pimage , username , bio , isPublic) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${pimage ? pimage : "default.png"}' , '${username}' , '${bio}' , ${isPublic})`;
    } else {
      sql = `INSERT INTO user_table(uid , name , email , pw , username , bio ) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${pimage ? pimage : "default.png"}' , '${username}' , '${bio}')`;
    }
    console.log(sql);
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
async function createUser(req, res) {
  try {
    const uid = uuidv4();
    console.log(req.file);
    let pimage = req.file.destination + "/" + req.file.filename;
    // public/images/user/akjsbfasbhf.jpeg
    pimage = pimage.substring(7);

    const { name, email, pw, username, bio, isPublic } = req.body;
    let userObject = {
      uid,
      name,
      email,
      pw,
      username,
      bio,
      isPublic,
      pimage
    };
    console.log(userObject);

    let data = await createUserPromisified(userObject);
    res.status(200).json({
      message: "User Created Succssfully !!!",
      data,
    });
  } catch (error) {
    res.json({
      message: "Failed to create a user !",
      error,
    });
  }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.createUser = createUser;

module.exports.getUserByIdPromisified = getUserByIdPromisified;
