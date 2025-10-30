var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Proba" });
});

router.get("/test/abc", function (req, res, next) {
  res.render("index", { title: "TEST 1" });
});

router.get("/test/:abc", function (req, res, next) {
  res.render("index", { title: "TEST 2" });
});

router.get("/daj-json-objekat", function (req, res, next) {
  res.send({
    poruka: "Json poruka",
    ruta: "/proba/daj-json-objekat",
    broj: 5,
    nesto: "test test test",
    objekat: {
      x: 45,
      y: 34,
      z: 12,
    },
  });
});

router.get("/daj-status-100", function (req, res, next) {
  res.sendStatus(100);
});

router.get("/daj-status-200", function (req, res, next) {
  res.sendStatus(200);
});

router.get("/daj-status-300", function (req, res, next) {
  res.sendStatus(300);
});

router.get("/daj-status-400", function (req, res, next) {
  res.sendStatus(400);
});

router.get("/daj-status-500", function (req, res, next) {
  res.sendStatus(500);
});

module.exports = router;
