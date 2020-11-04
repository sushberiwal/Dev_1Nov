let fs = require("fs");

function readFilePromise(filePath){
    // a new pending promise is returned
    return new Promise( function( resolve , reject){
        fs.readFile(filePath , function(error , data){
            if(error){
                // error aagya
                reject(error);
            }
            else{
                // data aa chuka hai
                resolve(data);
            }
        });
    });
}

// B   =>    A
let pendingPromise = readFilePromise("./f1.txt");
// console.log(pendingPromise);

pendingPromise.then( function (data) {
    console.log("inside then");
    console.log(pendingPromise);
  console.log("Content = " + data);
});
pendingPromise.catch( function (error) {
    console.log("inside catch");
    console.log(pendingPromise);
    console.log(error);
});
