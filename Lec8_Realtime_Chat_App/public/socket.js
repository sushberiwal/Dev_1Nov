socket.on("user-joined", function (name) {
  //<div class="chat join">Steve joined the chat !</div>
  let joinDiv = document.createElement("div");
  joinDiv.classList.add("chat");
  joinDiv.classList.add("join");
  joinDiv.innerHTML = `${name} joined the chat !`;
  chatBox.append(joinDiv);
});

socket.on("receive-chat", function (userObj) {
  addChat("left", userObj);
});

socket.on("leave", function (name) {
  let leaveDiv = document.createElement("div");
  leaveDiv.classList.add("chat");
  leaveDiv.classList.add("leave");
  leaveDiv.innerHTML = `${name} left the chat !`;
  chatBox.append(leaveDiv);
});

function addChat(sender, userObj) {
  let chatDiv = document.createElement("div");
  chatDiv.classList.add("chat");
  chatDiv.classList.add(sender);
  // <div class="chat right"></div>

  let chatName = document.createElement("div");
  chatName.classList.add("chat-name");
  chatName.innerHTML = userObj.user;
  // <div class="chat-name">Steve</div>

  let chatText = document.createElement("div");
  chatText.classList.add("chat-text");
  chatText.innerHTML = userObj.chatMessage;
  // <div class="chat-text">message</div>

  chatDiv.append(chatName);
  chatDiv.append(chatText);

  chatBox.append(chatDiv);
}
