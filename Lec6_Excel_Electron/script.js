// document

// jquery
// dom manipulation
const $ = require("jquery");

$("document").ready(function () {
  let db;
  let lsc;

  // a click event is attached on element with cell class
  $(".cell").on("click", function () {
    console.log(this);
    let rowId = Number($(this).attr("rid"));
    let colId = Number($(this).attr("cid"));
    let cellAddress = String.fromCharCode(65 + colId) + (rowId + 1);
    // console.log("rowId " , rowId);
    // console.log("colId " , colId);
    // console.log(cellAddress);
    $("#address").val(cellAddress);
    let cellObject = db[rowId][colId];
    $("#formula").val(cellObject.formula);
  });

  $("#formula").on("blur", function () {
    let formula = $(this).val();
    let address = $("#address").val();
    let { rowId, colId } = getRowIdAndColId(address);
    let cellObject = db[rowId][colId];
    // cell ko update krna chahte ho
    // cell ka object nikaldo db se
    // check if cellObject formula must not be equal to the new formula
    if (cellObject.formula != formula) {
      // console.log(formula);
      removeFormula(cellObject);

      let value = solveFormula(formula, cellObject);
      // db update
      cellObject.value = value + "";
      cellObject.formula = formula;
      updateChildrens(cellObject);
      // ui update
      $(lsc).text(value);
    }
  });

  function solveFormula(formula, cellObject) {
    // formula = "( A1 + A2 )";
    let fComponents = formula.split(" ");
    console.log(fComponents);
    // [ "(" , "A1" , "+" , "A2" , ")" ];
    for (let i = 0; i < fComponents.length; i++) {
      let fComp = fComponents[i];
      // fComp = "A1"
      let cellName = fComp[0];
      if (cellName >= "A" && cellName <= "Z") {
        // fComp = "A1"
        // A1 => colId rowId
        let { rowId, colId } = getRowIdAndColId(fComp);
        let parentCellObject = db[rowId][colId];
        // falsy values => "" , null , undefined , 0 , false
        if (cellObject) {
          // add self to childrens of parentCellObject
          addSelfToParentsChildrens(cellObject, parentCellObject);
          // update parents of self cellObject
          updateParentsOfSelfCellObject(cellObject, fComp);
        }
        // {
        //     name:"A1",
        //     value:"10",
        //     formula:""
        // }
        let value = parentCellObject.value; // value=10;
        formula = formula.replace(fComp, value);
        // "( 10 + A2 )"
      }
    }
    // formula = "( 10 + 20 )";
    // stack infix evaluation
    // eval function
    let value = eval(formula);
    return value;
  }

  function addSelfToParentsChildrens(cellObject, parentCellObject) {
    // B1 will add himself to childrens of A1 and A2
    parentCellObject.childrens.push(cellObject.name);
  }

  function updateParentsOfSelfCellObject(cellObject, fComp) {
    // B1 will add A1 and A2 in its parents
    cellObject.parents.push(fComp);
  }

  $(".cell").on("blur", function () {
    lsc = this;
    console.log("blur event fired !!");
    let value = $(this).text();
    let rowId = Number($(this).attr("rid"));
    let colId = Number($(this).attr("cid"));
    let cellObject = db[rowId][colId];
    if (cellObject.value != value) {
      cellObject.value = value;
      if (cellObject.formula) {
        removeFormula(cellObject);
        $("#formula").val("");
      }
      updateChildrens(cellObject);
      console.log(cellObject);
      console.log(db);
    }
  });

  function removeFormula(cellObject) {
    //Name: "B1",
    // Value:"300",
    // Formula="( A1 + A2)"
    // Childrens=[]
    // Parents = ["A1" , "A2"]
    cellObject.formula = "";
    for(let i=0 ; i<cellObject.parents.length ; i++){
        let parentName = cellObject.parents[i];
        let {rowId , colId} = getRowIdAndColId(parentName);
        let parentCellObject = db[rowId][colId];
        // filter function
        // children:["B1", "C1" , "D1"]; 
        let filteredChildrens = parentCellObject.childrens.filter(  function(child){
            return child != cellObject.name;
        });
        //filteredChildrens = [C1 , D1];
        parentCellObject.childrens = filteredChildrens;
    }
    cellObject.parents = [];
  }

  function updateChildrens(cellObject) {
    // {
    //     name:"A1",
    //     value:"20",
    //     formula:"",
    //     childrens:["B1" ,"B2" , "C99"]
    // }
    // sbhi childrens update hojaeyen
    for (let i = 0; i < cellObject.childrens.length; i++) {
      let child = cellObject.childrens[i];
      // B1
      let { rowId, colId } = getRowIdAndColId(child);
      let childrenCellObject = db[rowId][colId];
      // {
      //     name:"B1",
      //     value:"30",
      //     formula : "( A1 + A2 )",
      //     childrens : ["C1" , "D1"],
      //     parents : ["A1"]
      // }
      let value = solveFormula(childrenCellObject.formula);
      // update db
      childrenCellObject.value = value + "";
      // update ui also
      $(`.cell[rid=${rowId}][cid=${colId}]`).text(value);
      // $(".cell[rid=" + rowId + "][cid=" + colId+"]").text(value);
      // .cell[rid="1"][cid = "2"]
      updateChildrens(childrenCellObject);
    }
  }

  // utility functions

  function getRowIdAndColId(address) {
    // address = "A1"// "B2" // "Z100"
    let colId = address.charCodeAt(0) - 65;
    let rowId = Number(address.substring(1)) - 1; //"2"
    return { rowId: rowId, colId: colId };
  }

  function init() {
    // db = 26 * 100
    db = []; // initialize database with empty array
    for (let i = 0; i < 100; i++) {
      let row = []; // this represents a single row
      for (let j = 0; j < 26; j++) {
        // i ? , j ?
        let cellAddress = String.fromCharCode(65 + j) + (i + 1);
        let cellObject = {
          name: cellAddress,
          value: "",
          formula: "",
          parents: [],
          childrens: [],
        };
        // cellObject is pushed 26 time
        row.push(cellObject);
      }
      // finally row is pushed in db
      db.push(row);
    }
    console.log(db);
  }
  init();
});
