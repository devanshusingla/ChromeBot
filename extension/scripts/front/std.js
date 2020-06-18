/****************************************************************
 *
 *               Basic Utility Functions
 *
 ****************************************************************/

let url = "http://localhost:3000/";
let chatURL = url + "chat/";
let featureURL = url + "feature/";

function setAttributes(element, list) {
  for (var key in list) {
    element.setAttribute(key, list[key]);
  }
}

// use `await sleep(ms)` to stop process for ms milliseconds.
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function debugEvent(xhr, type) {
  function handleEvent(e) {
    console.log(`${type}:    ${e.type}: ${e.loaded} bytes transferred\n`);
  }

  xhr.addEventListener("loadstart", handleEvent);
  xhr.addEventListener("load", handleEvent);
  xhr.addEventListener("loadend", handleEvent);
  xhr.addEventListener("progress", handleEvent);
  xhr.addEventListener("error", handleEvent);
  xhr.addEventListener("abort", handleEvent);
}

function MsgPassing(featureName, type = "feature", target = "background") {
  class MsgPassingClass {
    constructor(type, target, featureName) {
      this.type = type;
      this.featureName = featureName;
      this.target = target;
      this.listeners = {};
    }

    sendMessage(msg, params, response) {
      chrome.runtime.sendMessage(
        {
          type: this.type,
          featureName: this.featureName,
          target: this.target,
          msg: msg,
          params: params,
        },
        response
      );
    }

    addListener(msg, action) {
      this.listeners[msg] = action;
    }

    listen() {
      chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
        if (
          req.type === this.type &&
          req.featureName === this.featureName &&
          req.target === "front"
        ) {
          if (this.listeners[req.msg])
            this.listeners[req.msg](req.params, sender, sendRes);
          else console.error(`unknown message "${req.msg}"`);
        }
      });
    }
  }

  return new MsgPassingClass(type, target, featureName);
}

const debug = MsgPassing("debug");

debug.sendMessage("hello");

debug.addListener("hi", (req) => {
  console.log(req);
});

debug.addListener("hello", (req) => {
  console.log("Oh god same reply!");
});

debug.listen();
