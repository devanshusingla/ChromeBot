const express = require("express");
const router = express.Router();

router.use(
  "/codeforces",
  (req, res, next) => {
    console.log("codeforces requested");
    next();
  },
  require("./codeforces")
);

module.exports = router;
