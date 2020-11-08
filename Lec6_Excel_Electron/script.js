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
        let rowId = Number($(this).attr("rid"))+1;
        let colId = Number($(this).attr("cid"));
        let cellAddress = String.fromCharCode(65+colId) + rowId;
        console.log("rowId " , rowId);
        console.log("colId " , colId);
        console.log(cellAddress);
        $("#address").val(cellAddress);
    })


    $(".cell").on("blur" , function(){
        lsc = this;
        console.log("blur event fired !!");
        let value = $(this).text();
        let rowId = Number($(this).attr("rid"));
        let colId = Number($(this).attr("cid"));
        let cellObject = db[rowId][colId];
        cellObject.value = value;
        console.log(cellObject);
        console.log(db);
    })



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