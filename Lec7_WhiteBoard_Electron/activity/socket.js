socket.on("md", function (point) {
  //mousedown point
  let myStrokeStyle = ctx.strokeStyle;
  let myWidth = ctx.lineWidth;
  
  ctx.strokeStyle = point.strokeStyle;
  ctx.lineWidth = point.lineWidth;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);

  ctx.lineWidth = myWidth;
  ctx.strokeStyle = myStrokeStyle;
});

socket.on("mm", function (point) {
  // mousemove point
  let myStrokeStyle = ctx.strokeStyle;
  let myWidth = ctx.lineWidth;

  ctx.strokeStyle = point.strokeStyle;
  ctx.lineWidth = point.lineWidth;
  ctx.lineTo(point.x, point.y);
  ctx.stroke();

  ctx.lineWidth = myWidth;
  ctx.strokeStyle = myStrokeStyle;
});


