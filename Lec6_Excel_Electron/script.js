// document

// jquery 
// dom manipulation
const $ = require("jquery");


$("document").ready(function(){

    let db;
    let lsc;

    // a click event is attached on element with cell class 
    $(".cell").on("click" , function(){
        console.log(this);
        let rowId = Number($(this).attr("rid"));
        let colId = Number($(this).attr("cid"));
        let cellAddress = String.fromCharCode(65+colId) + (rowId+1);
        // console.log("rowId " , rowId);
        // console.log("colId " , colId);
        // console.log(cellAddress);
        $("#address").val(cellAddress);
        let cellObject = db[rowId][colId];
        $("#formula").val(cellObject.formula);
    })


    $("#formula").on("blur" , function(){
        let formula = $(this).val();
        let address = $("#address").val();
        let {rowId , colId} = getRowIdAndColId(address);
        let cellObject = db[rowId][colId];
        // cell ko update krna chahte ho
        // cell ka object nikaldo db se
        // check if cellObject formula must not be equal to the new formula
        if(cellObject.formula != formula){
            // console.log(formula);
            let value = solveFormula(formula);
            // db update
            cellObject.value = value+"";
            cellObject.formula = formula;
            // ui update
            $(lsc).text(value);
        }

    })
    

    function solveFormula(formula){
        // formula = "( A1 + A2 )";
        let fComponents = formula.split(" ");
        console.log(fComponents);
        // [ "(" , "A1" , "+" , "A2" , ")" ];
        for(let i=0 ; i<fComponents.length ; i++){
            let fComp = fComponents[i];
            // fComp = "A1"
            let cellName = fComp[0];
            if( cellName >= "A" && cellName <= "Z"){
                // fComp = "A1"
                // A1 => colId rowId
                let {rowId , colId} = getRowIdAndColId(fComp); 
                let cellObject = db[rowId][colId];
                // {
                //     name:"A1",
                //     value:"10",
                //     formula:""
                // }
                let value = cellObject.value; // value=10;
                formula = formula.replace(fComp , value);
                // "( 10 + A2 )"
            }
        }
        // formula = "( 10 + 20 )";
        // stack infix evaluation
        // eval function
        let value = eval(formula);
        return value;
    }


    $(".cell").on("blur" , function(){
        lsc = this;
        console.log("blur event fired !!");
        let value = $(this).text();
        let rowId = Number($(this).attr("rid"));
        let colId = Number($(this).attr("cid"));
        let cellObject = db[rowId][colId];
        if(cellObject.value != value){
            cellObject.value = value;
            console.log(cellObject);
            console.log(db);
        }
    })



    // utility functions

    function getRowIdAndColId(address){
        // address = "A1"// "B2" // "Z100"
        let colId = address.charCodeAt(0)-65; 
        let rowId = Number(address.substring(1)) - 1; //"2"
        return {rowId : rowId,
                colId : colId}
    }
    

    function init(){
        // db = 26 * 100
        db = [];  // initialize database with empty array
        for(let i=0 ; i<100 ; i++){
            let row = []; // this represents a single row
            for(let j=0 ; j<26 ; j++){
                // i ? , j ?
                let cellAddress = String.fromCharCode(65+j) + (i+1);
                let cellObject = {
                    name : cellAddress,
                    value : "",
                    formula : ""
                }
                // cellObject is pushed 26 time
                row.push(cellObject);
            }
            // finally row is pushed in db
            db.push(row);
        }
        console.log(db);
    }
    init();

})