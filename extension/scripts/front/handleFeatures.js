function handleFeature(res) {
  if (res.featureName === "hello") {
    newChat({
      chatter: "bot",
      text: "Hello!",
    });
  } else if (res.featureName === "codeforces") {
    codeforces(res);
  } else if (res.featureName === "contestSchedular") {
    contestSchedular(res);
  }
}
