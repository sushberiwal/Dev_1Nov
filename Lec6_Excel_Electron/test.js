// let exp = "( 10 + 20 )";

// let ans = eval(exp);
// console.log(ans);

 // address = "A1"// "B2" // "Z100"
//  let address  = "B2";

//  let colId = address.charCodeAt(0) - 65;
//  let colId = address.charCodeAt(0)-65; 
//  let rowId = Number(address.substring(1)) - 1; //"2"
//  console.log(rowId);
//  console.log(colId);


let names = ["A1" , "A2" , "B1" , "C1" , "D1"];


let newNames = names.filter( function(name){
return name != "A1";
}  )

console.log(newNames);
