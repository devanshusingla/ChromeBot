const express = require("express");
const router = express.Router();

router.get("/name", (req, res) => {
  console.log("name requested");
  res.json({ name: "Devanshu Singla" });
});

module.exports = router;
