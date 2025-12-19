const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");

// EJS stranica
router.get("/", courseController.renderList);

// API za AJAX
router.get("/api", courseController.getAll);
router.get("/api/:id", courseController.getOne);
router.post("/api", courseController.create);
router.put("/api/:id", courseController.update);
router.delete("/api/:id", courseController.remove);

module.exports = router;
