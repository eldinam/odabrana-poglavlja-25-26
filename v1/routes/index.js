var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Odabrana poglavlja KN/IT" });
});

router.get("/test/prvi/test", function (req, res, next) {
  res.render("index", { title: "TEST" });
});

module.exports = router;
