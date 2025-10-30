var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home page" });
});

router.get("/proba1", function (req, res, next) {
  res.render("index", { title: "Proba u indexu" });
});

module.exports = router;
