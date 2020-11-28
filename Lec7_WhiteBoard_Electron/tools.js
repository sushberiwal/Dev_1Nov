let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");



ctx.lineWidth = 40;

let activeTool = "pencil";




pencil.addEventListener("click" , function(){
    if( !pencil.classList.contains("active-tool")){
        eraser.classList.remove("active-tool");
        eraserOptions.classList.add("hide");
        pencil.classList.add("active-tool");
        ctx.strokeStyle = "black";
    }
    else{
        // already active hai tool
        if(pencilOptions.classList.contains("hide")){
            pencilOptions.classList.remove("hide");
        }
        else{
            pencilOptions.classList.add("hide");
        }
    }
})


eraser.addEventListener("click" , function(){
    if(  !eraser.classList.contains("active-tool") ){
        pencil.classList.remove("active-tool");
        pencilOptions.classList.add("hide");
        eraser.classList.add("active-tool");
        ctx.strokeStyle = "white";
    }
    else{
        // already active hai tool
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
        }
        else{
            eraserOptions.classList.add("hide");
        }
    }
})









undo.addEventListener("click", function () {
  // you will get the latest line
  if(pointsDb.length){
      let latestLine = pointsDb.pop();
      redoPoints.push(latestLine);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPoints();
  }
});

redo.addEventListener("click" , function(){
    
    if(redoPoints.length){
        let line = redoPoints.pop();
        pointsDb.push(line);
    
        for(let i=0 ; i<line.length ; i++){
            if(line[i].id == "md"){
                ctx.beginPath();
                ctx.moveTo(line[i].x , line[i].y);
            }
            else{
                ctx.lineTo(line[i].x , line[i].y);
                ctx.stroke();
            }
        }
    }

})


function drawPoints() {
  for (let i = 0; i < pointsDb.length; i++) {
    let line = pointsDb[i];
    for(let j=0 ; j<line.length ; j++){
        if(line[j].id == "md"){
            ctx.beginPath();
            ctx.moveTo(line[j].x , line[j].y);
        }
        else{
            ctx.lineTo(line[j].x , line[j].y);
            ctx.stroke();
        }
    }
  }
}


