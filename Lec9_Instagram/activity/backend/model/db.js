const mysql = require("mysql");
const { HOST, USER, PASSWORD, DB_NAME } = require("../config/secrets");

//database connection
let connection; 

function handleDisconnect() {
  connection = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME,
  });
  
  // connection.connect();
    
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); 
    } else {
      throw err;
    }
  });
}
handleDisconnect();


module.exports = connection;