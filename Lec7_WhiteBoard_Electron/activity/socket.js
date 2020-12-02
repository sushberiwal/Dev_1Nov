socket.on("md", function (point) {
  //mousedown point
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
});

socket.on("mm", function (point) {
  // mousemove point
  ctx.lineTo(point.x, point.y);
  ctx.stroke();
});


