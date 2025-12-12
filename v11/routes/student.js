// routes/student.js
var express = require("express");
var router = express.Router();
const studentController = require("../controllers/studentController");

// EJS pages
router.get("/", studentController.renderHome);
router.get("/all", studentController.listAll);
router.get("/new", studentController.renderNewForm);
router.get("/update/:id", studentController.renderUpdateForm);

// Form submits
router.post("/add-new-student", studentController.createStudent);
router.post("/update-student", studentController.updateStudent);

// Delete
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
