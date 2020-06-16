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

var tabsCallCount = 0;

function toggleButton() {
  chrome.storage.local.get("buttonState", function (result) {
    chrome.storage.local.set({ buttonState: !result["buttonState"] });
    sendMessage();
  });
}

function sendMessage() {
  tabsCallCount++;
  if (tabsCallCount <= 1) {
    chrome.storage.local.get(["activeTabId", "buttonState"], function (result) {
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
      var startBot = result["buttonState"];
      var todo = startBot ? "launchBot" : "destroyBot";
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
          chrome.storage.local.set({ activeTabId: tabs[0].id });
          tabsCallCount--;
          chrome.tabs.sendMessage(tabs[0].id, {
            todo: todo,
          });
        }
      });
    });
  } else {
    tabsCallCount--;
  }
}
