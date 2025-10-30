var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Random" });
});

router.get("/list", function (req, res, next) {
  const arr = [];

  for (let i = 0; i < 20; i++) {
    let randomNumber = Math.ceil(Math.random() * 100);
    arr.push(randomNumber);
  }

  res.render("lista_slucajnih_brojeva", {
    title: "Random list",
    list_random_numbers: arr,
  });
});

module.exports = router;
