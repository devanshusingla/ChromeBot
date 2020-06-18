function detectCommand(req, res, next) {
  let userInput = req.body.text;

  if (userInput === "clr") {
    res.locals.chatObj.clear();
    next();
  } else if (userInput === "hello") {
    res.set("Content-Type", "application/json");
    res.json({ type: "feature", featureType: "noArg", featureName: "hello" });
  } else if (userInput === "cf") {
    res.set("Content-Type", "application/json");
    res.json({
      type: "feature",
      featureType: "interactive",
      featureName: "codeforces",
    });
  } else if (userInput === "contests") {
    res.set("Content-Type", "application/json");
    res.json({
      type: "feature",
      featureType: "noArg",
      featureName: "contestSchedular",
    });
  } else next();
}

module.exports = detectCommand;
