let fs = require("fs");

// chaining


let f1KaPromise = fs.promises.readFile("./f1.txt");

// then bhi ek pending promise deta hai
f1KaPromise.then(function (data) {
  console.log("Content = " + data);
  let f2KaPromise = fs.promises.readFile("./f2.txt");
  return f2KaPromise;
})
.then(function (data) {
    console.log("Content = " + data);
})