function CreateChatObject(
  maxChats,
  chatHistoryFile = "data/conversation.txt",
  defMsg,
  cleanMsg
) {
  if (!defMsg)
    defMsg = [
      { chatter: "bot", text: "Hey buddy!" },
      { chatter: "bot", text: "Wanna do something" },
    ];

  if (!cleanMsg) cleanMsg = [{ chatter: "bot", text: "cleaned up!" }];

  const fs = require("fs");

  let data;
  data = fs.readFileSync(chatHistoryFile, "utf-8");
  data = "[" + data + "]";
  let jsonData = JSON.parse(data);
  jsonData.slice(Math.max(jsonData.length - maxChats, 0));

  this.maxChats = maxChats;
  this.chats = JSON.parse(JSON.stringify(jsonData));
  this.defMsg = JSON.parse(JSON.stringify(defMsg));
  this.cleanMsg = JSON.parse(JSON.stringify(cleanMsg));
  this.chatHistoryFile = chatHistoryFile;
  this.add_chat = (chat) => {
    let fs = require("fs");
    fs.appendFileSync(this.chatHistoryFile, "," + JSON.stringify(chat));
    if (this.chats.length === this.maxChats) {
      this.chats.shift();
    }
    this.chats.push(chat);
  };
  this.clear = () => {
    let str = JSON.stringify(this.cleanMsg);
    this.chats = JSON.parse(str);
    if (str[0] === "[") str = str.substring(1, str.length - 1);
    fs.truncateSync(this.chatHistoryFile, 0);
    fs.writeFileSync(this.chatHistoryFile, str);
  };
}

module.exports = CreateChatObject;
