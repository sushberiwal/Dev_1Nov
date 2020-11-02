// main function X
// classes X
// public static void main X

// System.out.println("");
// cout << <<;

// top to down
// left to right

// console.log("hello world !!");

// data types => Number , String , Boolean , undefined , null , Object

// variables => int , char , String , float

// ES6 => Ecma Script 6 => Specifications of how to define , write javascript

// let / const

// let => block scoped
let a;
a = 15;
let b = "hello world";
let c = 15.78;
let d = true;

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);

// re assignment of value is possible
b = true;
// console.log(b);
let val = 100;

if (true) {
  let val = 20;
  // console.log(val);
}

let value; // undefined
// console.log(value);

// const => constant => block scoped
// reassignment is not possible
const pi = 3.14;
// pi = 12; not possible

// objects => keys => unique ,  values => duplicate ho sakti hain
let obj = {
  name: "sushant",
  place: "delhi",
  "FULL NAME": "STEVE ROGERS",
  Movie: "WINTER SOLDIER",
  nameOfKey: "akjshdabsjfbhajs",
};

// dot notation
let objValue = obj.name;
// console.log(objValue);

// bracket notation
let fullName = obj["FULL NAME"];
// console.log(fullName);

let nameOfKey = "Movie";
console.log(obj[nameOfKey]);

// 1d array , 2d Array

let values = [
  1,
  2,
  "say hi",
  { name: "steve" },
  true,
  [1, 2, 3, 4, [1, 2, 3, [true, false]]],
]; // 1d array

// push , pop , shift , unshift , slice , splice , 
console.log(values);
