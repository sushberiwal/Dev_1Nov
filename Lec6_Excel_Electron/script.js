// document

// jquery 
// dom manipulation
const $ = require("jquery");


$("document").ready(function(){

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
})