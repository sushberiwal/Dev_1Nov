let fs = require("fs");

console.log("Start");

fs.readFile("./f1.txt" , function(error , data){
    console.log("Content = "+ data);
    fs.readFile("./f2.txt" , function(error , data){
        console.log("Content = "+ data);
        fs.readFile("./f3.txt" , function(error , data){
            console.log("Content = "+ data);
        });
    });
});


console.log("End");


