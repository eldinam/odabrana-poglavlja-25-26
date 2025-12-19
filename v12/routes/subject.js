// routes/subject.js
var express = require("express");
var router = express.Router();
const subjectController = require("../controllers/subjectController");

// LIST ALL SUBJECTS (render EJS)
router.get("/all", subjectController.renderList);

// AJAX endpoints (koristi ih public/javascripts/subjects.js)
router.post("/add-new-subject-below", subjectController.createBelow);
router.delete("/delete/:id", subjectController.deleteSubject);
router.put("/update/:id", subjectController.updateSubject);

module.exports = router;
