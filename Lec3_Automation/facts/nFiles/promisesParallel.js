let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// promises // loop // parallel

for(let i=0 ; i<files.length ; i++){
    let fileKaPromise = fs.promises.readFile(files[i]);
    fileKaPromise.then(function(data){
        console.log("Content " + data);
    })
    fileKaPromise.catch(function(error){
        console.log(error);
    })
}
