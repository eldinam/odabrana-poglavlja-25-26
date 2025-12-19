// routes/users.js
var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

// Render pages
router.get("/register", userController.renderRegister);
router.get("/login", userController.renderLogin);

// AJAX API
router.post("/register-user", userController.registerUser);
router.post("/login-user", userController.loginUser);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
