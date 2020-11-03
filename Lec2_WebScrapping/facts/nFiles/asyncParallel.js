let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// loop => async => parallel
for(let i=0 ; i<files.length ; i++){
    fs.readFile(files[i] , function(error , data){
        console.log("Content = " + data);
    })
}


// recursive code
function asyncFileReader(idx){
    if(idx == files.length){
        return;
    }
    asyncFileReader(idx+1);

    fs.readFile(files[idx] , function(error ,data){
        console.log("COntent = "+data);
    })
}



asyncFileReader(0);


