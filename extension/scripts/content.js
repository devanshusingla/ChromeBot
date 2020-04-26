//alert("Hello");
//chrome.runtime.sendMessage({todo: "showPageAction"});

/**** GLOBAL VARIABLES ****/
var dragItem, dragHandle;

/**** HELPER FUNCTIONS AND VARIABLES ****/

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;

function dragStart(e) {
  e.preventDefault();
  //console.log("in drag start");
  chrome.storage.local.get(["xOffset", "yOffset"], function (result) {
    var xOffset = result["xOffset"];
    var yOffset = result["yOffset"];
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
    //console.log("InitialX: " + initialX + " InitialY: " + initialY);
    //console.log("xOffset: " + xOffset + " yOffset: " + yOffset);
  });

  if (e.target === dragHandle) {
    active = true;
  }
}

function dragEnd(e) {
  //console.log("in drag end");

  active = false;
}

function drag(e) {
  if (active) {
    //console.log("in drag");
    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    chrome.storage.local.set({
      xOffset: currentX,
      yOffset: currentY,
    });
    //console.log("xOffset: " + currentX + " yOffset: " + currentY);

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

/**** MAIN FUNCTIONS ****/

function textBox(chats) {
  var box = document.createElement("div");
  setAttributes(box, { class: "bot-chat-box", id: "bot-chat-box" });
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

function setAttributes(element, list) {
  for (var key in list) {
    element.setAttribute(key, list[key]);
  }
}

function make_draggable(dragitem, draghandle) {
  //alert("drag!!");
  dragItem = dragitem;
  dragHandle = draghandle;
  var body = document.getElementsByTagName("body")[0];

  dragHandle.addEventListener("touchstart", dragStart, false);
  body.addEventListener("touchend", dragEnd, false);
  body.addEventListener("touchmove", drag, false);

  dragHandle.addEventListener("mousedown", dragStart, false);
  body.addEventListener("mouseup", dragEnd, false);
  body.addEventListener("mousemove", drag, false);
}

/**** MAIN CODE ****/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo === "launchBot") {
    var div = document.createElement("div");
    var temp = document.getElementsByClassName("bot-outer-box");
    //alert("div created");
    if (temp.length === 0) {
      setAttributes(div, { class: "bot-outer-box", id: "outer-box-bot" });
      chrome.storage.local.get(["xOffset", "yOffset"], function (result) {
        var xOffset = result["xOffset"];
        var yOffset = result["yOffset"];
        //console.log(xOffset + " " + yOffset);
        setTranslate(xOffset, yOffset, div);
      });

      var conversation = textBox([
        {
          text: "Hi! there",
          chatter: "bot",
        },
        {
          text: "I'm Chromebot 1.0.0",
          chatter: "bot",
        },
      ]);

      var inputBox = document.createElement("div");
      setAttributes(inputBox, { class: "bot-input-box" });

      var input = document.createElement("INPUT");
      setAttributes(input, {
        class: "bot-input",
        id: "message-bot",
        type: "text",
        placeholder: "How can I help you",
      });

      input.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          var x = input.value;
          input.value = "";
          bot(x);
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
    }
  }
  if (request.todo === "destroyBot") {
    var mydiv = document.getElementById("outer-box-bot");
    if (mydiv) {
      mydiv.remove();
    }
  }
});
