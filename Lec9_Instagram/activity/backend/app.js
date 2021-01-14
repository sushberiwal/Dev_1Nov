const express = require("express");
const mysql = require("mysql");
const { HOST, USER, PASSWORD, DB_NAME } = require("./config/secrets");

const app = express();

//database connection
const connection = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASSWORD,
  database : DB_NAME
});
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// const sql = `INSERT INTO user_table`

connection.query("DESC user_table" , function(error , data){
    console.log(data);
})
 


app.listen(3000 , function(){
    console.log("app is listeningg at 3000 port !!");
})