function MsgPassing(featureName, type = "feature", target = "front") {
  class MsgPassingClass {
    constructor(type, target, featureName) {
      this.type = type;
      this.featureName = featureName;
      this.target = target;
      this.listeners = {};
    }

    sendMessage(tabID, msg, params, response) {
      chrome.tabs.sendMessage(
        tabID,
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
          req.target === "background"
        ) {
          if (this.listeners[req.msg])
            this.listeners[req.msg](req.params, sender, sendRes);
          else {
            console.error(`unknown message "${req.msg}"`);
          }
        }
      });
    }
  }

  return new MsgPassingClass(type, target, featureName);
}
