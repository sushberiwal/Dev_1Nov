
let chatContent = document.querySelector(".chat-content");
let chat = document.querySelector("#chat-input");
let send = document.querySelector("#send");
let chatBox = document.querySelector(".chat-box");

let userName = document.querySelector("#chat-user");
let joinChat = document.querySelector(".join-chat");
let chatInputDiv = document.querySelector(".chat-input-name")

let user;

joinChat.addEventListener("click" , function(){
    user = userName.value;
    if(user){
        socket.emit("join-chat" , user);
        chatContent.classList.remove("hide");
        chatInputDiv.classList.add("hide");
    }
})



// event attach click
send.addEventListener("click" , function(){
    let chatMessage = chat.value;
    if(chatMessage){
        socket.emit("chat-send" , { user , chatMessage} )
        addChat("right" , { user , chatMessage});
        chatBox.scrollTop = chatBox.scrollHeight;
        chat.value = "";
    }
})