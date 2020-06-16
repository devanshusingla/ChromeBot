/************************************************************************************
 *
 *                  MAIN CODE
 *
 ************************************************************************************/

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.todo === "launchBot") {
    let temp = document.getElementsByClassName("bot-outer-box");
    if (temp.length === 0) {
      chrome.storage.local.get(["xOffset", "yOffset"], function (result) {
        var div = document.createElement("div");
        setAttributes(div, { class: "bot-outer-box", id: "outer-box-bot" });
        var xOffset = result["xOffset"];
        var yOffset = result["yOffset"];

        setTranslate(xOffset, yOffset, div);

        var conversation = textBox();

        var inputBox = document.createElement("div");
        setAttributes(inputBox, {
          class: "bot-input-box",
          id: "bot-input-box",
        });

        var input = document.createElement("INPUT");
        setAttributes(input, {
          class: "bot-input",
          id: "message-bot",
          type: "text",
          placeholder: "How can I help you",
          autocomplete: "off",
        });

        input.addEventListener("DOMContentLoaded", () => {
          this.focus();
          this.select();
        });

        input.addEventListener("keyup", function (e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            var x = input.value;
            input.value = "";
            newChat({
              chatter: "user",
              text: x,
            });
          }
        });

        conversation.appendChild(input);

        var botImage = document.createElement("img");
        setAttributes(botImage, {
          src: chrome.runtime.getURL("/media/images/bot-image.png"),
          class: "bot-image",
        });

        make_draggable(div, botImage);

        inputBox.appendChild(input);
        conversation.appendChild(inputBox);
        div.appendChild(conversation);
        div.appendChild(botImage);
        document.body.appendChild(div);
        getChats();
      });
    }
  }
  if (req.todo === "destroyBot") {
    var mydiv = document.getElementById("outer-box-bot");
    if (mydiv) {
      mydiv.remove();
    }
  }
});
