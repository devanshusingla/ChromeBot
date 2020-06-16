/*****************************************************
 *
 *           Implements chat system for bot
 *
 *****************************************************/

function textBox(chats) {
  let box = document.createElement("div");
  setAttributes(box, { class: "bot-chat-box", id: "bot-chat-box" });
  if (!chats) return box;
  for (var chat of chats) {
    var chatElement = document.createElement("div");
    if (chat.chatter === "bot") {
      setAttributes(chatElement, { class: "bot-chat-bot" });
    } else if (chat.chatter === "user") {
      setAttributes(chatElement, { class: "bot-chat-user" });
    }
    chatElement.innerHTML = chat.text;
    box.appendChild(chatElement);
  }

  return box;
}

function displayChats(chats) {
  var oldChatBody = document.getElementById("bot-chat-box");
  var newChatBody = textBox(chats);
  if (oldChatBody) {
    newChatBody.appendChild(oldChatBody.lastChild);
    oldChatBody.parentNode.replaceChild(newChatBody, oldChatBody);
  }
}

function getChats() {
  let getreq = new XMLHttpRequest();

  getreq.onload = () => displayChats(JSON.parse(getreq.response));

  getreq.open("GET", chatURL, true);
  getreq.setRequestHeader("Content-Type", "application/json");
  getreq.send();
}

function newChat(chat) {
  let postreq = new XMLHttpRequest();

  postreq.onload = () => {
    getChats();
    if (
      postreq.getResponseHeader("Content-Type") ===
      "application/json; charset=utf-8"
    ) {
      let jsonRes = JSON.parse(postreq.response);
      if (jsonRes.type === "feature") {
        handleFeature(jsonRes);
      }
    }
  };
  postreq.open("POST", chatURL, true);
  postreq.setRequestHeader("Content-Type", "application/json");
  postreq.send(JSON.stringify(chat));
}
