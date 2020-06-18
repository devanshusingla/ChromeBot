let contestSchedularObj = { created: false };

const Schedular = MsgPassing("contestSchedular");

Schedular.addListener("create", (req, sender, sendResponse) => {
  chrome.tabs.create({ url: "https://clist.by/", active: true }, (tab) => {
    contestSchedularObj.created = true;
  });
});

Schedular.addListener("created", (req, sender, sendResponse) => {
  if (contestSchedularObj.created) {
    Schedular.sendMessage(sender.tab.id, "scrape");
    contestSchedularObj.created = false;
  }
});

Schedular.addListener("set-alarm", (req, sender, sendResponse) => {
  let contest = JSON.parse(req);
  let alarmMsg = JSON.stringify({
    featureName: "contestSchedular",
    params: req,
  });
  chrome.alarms.get(
    JSON.stringify({ featureName: "contestSchedular", params: req }),
    (alarm) => {
      if (alarm) {
        Schedular.sendMessage(sender.tab.id, "alarm-present", {
          present: true,
          title: contest.title,
          alarmMsg: alarmMsg,
        });
      } else {
        chrome.alarms.create(alarmMsg, {
          when: new Date(contest.time.start).setMinutes(
            new Date(contest.time.start).getMinutes() - 15
          ),
        });
        Schedular.sendMessage(sender.tab.id, "alarm-present", {
          present: false,
          title: contest.title,
          alarmMsg: alarmMsg,
        });
      }
    }
  );
});

Schedular.addListener("remove-alarm", (req, sender, sendResponse) => {
  chrome.alarms.clear(req.alarmMsg, (wasCleared) => {
    Schedular.sendMessage(sender.tab.id, "alarm-clear-status", {
      wasCleared: wasCleared,
      title: req.title,
    });
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  let alarmObj = JSON.parse(alarm.name);
  if (alarmObj.featureName === "contestSchedular") {
    var contest = JSON.parse(alarmObj.params);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        Schedular.sendMessage(
          tabs[0].id,
          "buzz",
          { title: contest.title, url: contest.desc.substring(4) },
          (res) => {
            if (res) chrome.tabs.create({ url: res, active: true });
          }
        );
      }
    });
  }
});

Schedular.listen();
