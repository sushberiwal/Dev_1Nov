let stickyAdd = document.querySelector("#sticky");

// let stickyNotes = document.querySelector(".sticky-notes");

stickyAdd.addEventListener("click" , function(){
    let stickyContent = createSticky();
    
    let textBox = document.createElement("textarea");
    textBox.setAttribute("class" , "stickybox");
    textBox.setAttribute("rows" , "10");
    textBox.setAttribute("cols" , "30");
    // <textarea class="stickybox" rows="10" cols="30"> </textarea>
    
    stickyContent.appendChild(textBox);
    // <div class="sticky-content">
    // <textarea id="stickybox" rows="10" cols="30"> </textarea>
    // </div>    
})