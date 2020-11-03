let fs = require("fs");

// fs.readFileSync
// fs.readFile(  , cb);
// fs.promises.readFile();

// 3 file // promises // serial

// promise hell

let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function (data) {
  console.log("Content = " + data);
  let f2KaPromise = fs.promises.readFile("./f2.txt");
  f2KaPromise.then(function (data) {
    console.log("Content = " + data);
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    f3KaPromise.then(function (data) {
      console.log("Content = " + data);
    });
    f3KaPromise.catch(function (error) {
      console.log(error);
    });
  });
  f2KaPromise.catch(function (error) {
    console.log(error);
  });
});
f1KaPromise.catch(function (error) {
  console.log(error);
});
