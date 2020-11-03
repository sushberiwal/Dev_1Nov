let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

// async tasks => serially n files 
// for loop ya while loop
// iteratively not possible
// let idx=0;
// let count=0;
// while(idx < files.length){
//     //async => node api
//     console.log(count);
//     fs.readFile(files[idx] , function(error , data){
//         console.log("Content = " + data);
//         idx++;
//     })
//     count++;
// }


// recursive code

function asyncFileReader(idx){
    if(idx == files.length){
        return;
    }
    fs.readFile(files[idx] , function(error ,data){
        console.log("COntent = "+data);
        asyncFileReader(idx+1);
    })
}

asyncFileReader(0);

