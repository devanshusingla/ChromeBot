const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const CreateChatObject = require("./scripts/createChatObject");
const detectCommand = require("./scripts/detectCommand");
const feature = require("./scripts/features/index");

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.use(
  "/feature",
  (req, res, next) => {
    console.log("feature requested");
    next();
  },
  feature
);

var chatObj = new CreateChatObject(5);

app.get("/chat", (req, res) => {
  console.log("get-request");
  res.json(chatObj.chats);
});

app.post(
  "/chat",
  (req, res, next) => {
    console.log("post-request");
    console.log(req.body);

    chatObj.add_chat(req.body);
    res.locals.chatObj = chatObj;

    next();
  },
  detectCommand,
  (req, res) => res.send("Successfully processed")
);

app.listen(port, () => console.log(`listening on port ${port}`));
