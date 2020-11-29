let imageUpload = document.querySelector("#photo-upload");

imageUpload.addEventListener("change" , function(){
    // console.log(imageUpload.file);
    let fileObject = imageUpload.files[0];

    // gives you a image url
    let filePath = URL.createObjectURL(fileObject);
    
    // img element create
    let img = document.createElement("img");
    // <img />
    // set attribute of img element
    img.setAttribute("src" , filePath)
    //<img src ="" />
    console.log(img);

    // append image to document -> body
    document.body.appendChild(img);
})

