let stickyAdd = document.querySelector("#sticky");

// let stickyNotes = document.querySelector(".sticky-notes");

stickyAdd.addEventListener("click" , function(){

    let sticky = document.createElement("div");
    sticky.classList.add("sticky");
    // <div class="sticky"></div>
    
    let stickyHeader = document.createElement("div");
    stickyHeader.classList.add("sticky-header");
    // <div class="sticky-header"></div>


    let minimize = document.createElement("div");
    minimize.classList.add("minimize");
    // <div class="minimize"></div>

    let close = document.createElement("div");
    close.classList.add("close");
    // <div class="close"></div>


    let stickyContent = document.createElement("div");
    stickyContent.classList.add("sticky-content");
    // <div class="sticky-content"></div>

    let textBox = document.createElement("textarea");
    textBox.setAttribute("class" , "stickybox");
    textBox.setAttribute("rows" , "10");
    textBox.setAttribute("cols" , "30");
    // <textarea id="stickybox" rows="10" cols="30"> </textarea>

    stickyContent.appendChild(textBox);
    // <div class="sticky-content">
    // <textarea id="stickybox" rows="10" cols="30"> </textarea>
    // </div>
    
    
    stickyHeader.appendChild(minimize);
    stickyHeader.appendChild(close);
    // <div class="sticky-header">
    // <div class="minimize"></div>
    // <div class="close"></div>
    // </div>

    sticky.appendChild(stickyHeader);
    sticky.appendChild(stickyContent);
    // <div class="sticky">
    // <div class="sticky-header">
    // <div class="minimize"></div>
    // <div class="close"></div>
    // </div>
    // <div class="sticky-content">
    // <textarea id="stickybox" rows="10" cols="30"> </textarea>
    // </div>
    // </div>


    // let stickyHtml = `<div class="sticky">
    // <div class="sticky-header">
    // <div class="minimize"></div>
    // <div class="close"></div>
    // </div>
    // <div class="sticky-content">
    // <textarea class="stickybox" rows="10" cols="30"> </textarea>
    // </div>
    // </div>`;
    // stickyNotes.innerHTML += stickyHtml;
    document.body.appendChild(sticky);




    let initialX;
    let initialY;
    let isStickyHold = false;
    stickyHeader.addEventListener("mousedown" , function(e){
        isStickyHold = true;
        initialX = e.clientX;
        initialY = e.clientY;
    })
    
    stickyHeader.addEventListener("mousemove" , function(e){
        if(isStickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dy = finalY - initialY;
            let dx = finalX - initialX;
            // console.log(dx , dy);

            let {top , left} = sticky.getBoundingClientRect();

            sticky.style.top = top + dy + "px";
            sticky.style.left = left + dx + "px";

            initialX = finalX;
            initialY = finalY;
        }
    })

    stickyHeader.addEventListener("mouseup" , function(e){
        isStickyHold = false;
    })


    minimize.addEventListener("click" , function(){
        textBox.style.display = textBox.style.display == "none" ? "block" : "none";
    })

    close.addEventListener("click" , function(){
        sticky.remove();
    })
})