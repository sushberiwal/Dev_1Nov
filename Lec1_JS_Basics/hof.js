// high order functions => functions which takes functions as a paramter
// Callback functions => functions which are passed as paramter in a function

function getFirstName(fullName) {
  // "STEVE ROGERS";
  fullName = fullName.split(" ");
  // [ "STEVE" , "ROGERS"];
  return fullName[0];
}

function getLastName(fullName) {
  // STEVE ROGERS
  fullName = fullName.split(" ");
  return fullName[1];
}

function fun(cb, fullName) {
  let val = cb(fullName);
  console.log(val);
}

// fun is hof // gfn and gln => callback functions
fun(getFirstName, "Steve Rogers");
fun(getLastName, "TOny stark");

// callback