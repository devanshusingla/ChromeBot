/***************************************
*     AUTHOR : Yatharth Goswami        *
*  Email : yatharthgoswami15@gmail.com *
*    Github Username : yatharth0610    *
****************************************/

const express = require("express");
const router = express.Router();

router.use(
  "/codeforces",
  (req, res, next) => {
    console.log("codeforces requested");
    next();
  },
  require("./codeforces"),
  (req, res) => res.send("Successfully Saved!")
);

module.exports = router;
