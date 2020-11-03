let fs = require("fs");

// fs => file system

// java code ya c++ => sync

// javascript => synchronous   , async bna skte hain


console.log("start");

// stack block
let f1KaData = fs.readFileSync("./f1.txt"); // 100gb
console.log("Content = " + f1KaData);


console.log("end");