let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");




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


