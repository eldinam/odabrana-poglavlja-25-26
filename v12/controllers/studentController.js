// controllers/studentController.js
const studentService = require("../services/studentService");

module.exports = {
  // GET /students/
  renderHome(req, res) {
    res.render("studentHomePage", { title: "Students" });
  },

  // GET /students/all
  async listAll(req, res) {
    const students = await studentService.listStudents();
    res.render("studentList", {
      title: "Students list",
      studentList: students,
    });
  },

  // GET /students/new
  renderNewForm(req, res) {
    res.render("studentForm", { title: "New student" });
  },

  // POST /students/add-new-student
  async createStudent(req, res) {
    try {
      const { name, age, index_number } = req.body;
      await studentService.createStudent({ name, age, index_number });
      res.redirect("/students/all");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating student");
    }
  },

  // GET /students/update/:id
  async renderUpdateForm(req, res) {
    const id = req.params.id;
    const student = await studentService.getStudent(id);

    if (!student) {
      return res.status(404).send("Student not found");
    }

    res.render("studentView", { title: "Update student", student });
  },

  // POST /students/update-student
  async updateStudent(req, res) {
    try {
      const { id, name, age, index_number } = req.body;
      await studentService.updateStudent(id, { name, age, index_number });
      res.redirect("/students/all");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating student");
    }
  },

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      await studentService.deleteStudent(id);
      res.json({ message: "Student deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting student" });
    }
  },
};
