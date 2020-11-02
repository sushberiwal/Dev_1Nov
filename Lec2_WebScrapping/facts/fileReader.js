// file system is imported from nodejs to fileReader.js
let fs = require("fs");
let cheerio = require("cheerio");
// fs module is a module in nodeJS

// low level => binary data
let f1KaData = fs.readFileSync("./f1.txt");
// console.log(f1KaData+"");
let f2KaData = fs.readFileSync("./f2.txt");
// console.log(f2KaData+"");

// html file
let htmlKaData = fs.readFileSync("./index.html");

// html file is loaded in cheerio
let ch = cheerio.load(htmlKaData);

let h1KaText = ch("h1").text();
// console.log(h1KaText);

let pKaText = ch("ul .outer").text();
// [ <p> askjdnajksf </p> , <p> aslkjfnajksnfjka</p> ]
// console.log(pKaText);

// elements on the basis of class => .
// elements on the basis of id => #

let outerPKaText = ch(".outer").text();
// console.log(outerPKaText);
let h1KaData = ch("#uniqueHeading").text();
console.log(h1KaData);

