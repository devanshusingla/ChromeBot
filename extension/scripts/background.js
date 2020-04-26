chrome.browserAction.onClicked.addListener(toggleButton);
chrome.tabs.onUpdated.addListener(sendMessage);
chrome.tabs.onDetached.addListener(sendMessage);
chrome.tabs.onAttached.addListener(sendMessage);
chrome.tabs.onHighlighted.addListener(sendMessage);
chrome.windows.onFocusChanged.addListener(sendMessage);

chrome.storage.local.set({
  buttonState: false,
  activeTabId: null,
  xOffset: 0,
  yOffset: 0,
  feauture: null,
});

function toggleButton() {
  chrome.storage.local.get("buttonState", function (result) {
    chrome.storage.local.set({ buttonState: !result["buttonState"] });
    sendMessage();
  });
}

function sendMessage() {
  chrome.storage.local.get("activeTabId", function (result) {
    var id = result["activeTabId"];
    if (id) {
      chrome.tabs.get(id, function (tab) {
        if (chrome.runtime.lastError)
          console.log(chrome.runtime.lastError.message);
        if (tab) {
          chrome.tabs.sendMessage(tab.id, {
            todo: "destroyBot",
          });
        }
      });
    }
  });
  chrome.storage.local.get("buttonState", function (result) {
    var startBot = result["buttonState"];
    var todo = startBot ? "launchBot" : "destroyBot";
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.set({ activeTabId: tabs[0].id });
      chrome.tabs.sendMessage(tabs[0].id, {
        todo: todo,
      });
    });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.featureName) {
    var featureName = request.featureName;
    var featureParams = request.featureParams;

    /*
    if(featureName === "intro"){
      var reply = document.createElement("div");
      reply.setAttribute("class", "bot-chat-user");
      document.getElementById("bot-chat-box").appendChild(reply) ;
    }
*/
  }
});
