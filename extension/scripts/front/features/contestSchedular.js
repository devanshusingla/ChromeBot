const Schedular = MsgPassing("contestSchedular");

function contestSchedular() {
  Schedular.sendMessage("create");
}

Schedular.sendMessage("created");

Schedular.addListener("scrape", (req, sender, sendRes) => {
  window.addEventListener("DOMContentLoaded", () => {
    let contests = Array.from(document.getElementById("contests").children);
    contests.forEach((contest) => {
      if (contest.getAttribute("class").includes("row contest coming")) {
        contest.addEventListener("click", () =>
          Schedular.sendMessage(
            "set-alarm",
            contest
              .getElementsByClassName("data-ace")[0]
              .getAttribute("data-ace")
          )
        );
      }
    });
    newChat({
      chatter: "bot",
      text: "I will remind you of contest",
    });
    setTimeout(
      () =>
        newChat({
          chatter: "bot",
          text: "Just click the contest you want to set reminder of",
        }),
      1000
    );
  });
});

Schedular.addListener("alarm-present", (req, sender, sendRes) => {
  if (!req.present)
    newChat({
      chatter: "bot",
      text: `Alarm set for "${req.title}"`,
    });
  else {
    if (
      confirm(
        `alarm is already set for "${req.title}". Do you want to remove the alarm?`
      )
    )
      Schedular.sendMessage("remove-alarm", {
        alarmMsg: req.alarmMsg,
        title: req.title,
      });
  }
});

Schedular.addListener("alarm-clear-status", (req, sender, sendRes) => {
  if (req.wasCleared) {
    newChat({
      chatter: "bot",
      text: `alarm for "${req.title}" was removed`,
    });
  } else {
    newChat({
      chatter: "bot",
      text: `sorry! but alarm for ${req.title} was not removed`,
    });
  }
});

Schedular.addListener("buzz", (req, sender, sendRes) => {
  if (
    confirm(
      `The contest ${req.title} is going to start would you like to go to the site (${req.url})?`
    )
  ) {
    sendRes(req.url);
  } else {
    sendRes();
  }
});

Schedular.listen();
