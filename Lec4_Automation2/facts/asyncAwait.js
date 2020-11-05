// async => function ke samne async keyword await
let fs = require("fs");


// sync

// await => allowed in async function only

// IIFE => immediately invoked function expressions 

console.log("start");

let result = (async function(){
    try{
        // API
        let file1Data = fs.promises.readFile("./f1.txt"); 
        let file2Data = fs.promises.readFile("./f2.txt");
        let bothFileData = await Promise.all( [ file1Data , file2Data ]); 
        console.log(bothFileData);
    }
    catch(error){
        console.log(error);
    }
})();

console.log(result);

console.log("end");
