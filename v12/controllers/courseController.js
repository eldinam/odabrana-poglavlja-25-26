const courseService = require("../services/courseService");

module.exports = {
  // render EJS stranice sa listom
  async renderList(req, res) {
    const courseList = await courseService.listCourses();
    res.render("courses", { title: "Courses", courseList });
  },

  async getAll(req, res) {
    const courses = await courseService.listCourses();
    res.json(courses);
  },

  async getOne(req, res) {
    const id = req.params.id;
    const course = await courseService.getCourse(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  },

  async create(req, res) {
    try {
      const { name, espb, semester } = req.body;

      if (!name || !espb || !semester) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const course = await courseService.createCourse({ name, espb, semester });
      res.json({ message: "Course created", course });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating course" });
    }
  },

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, espb, semester } = req.body;

      const updated = await courseService.updateCourse(id, {
        name,
        espb,
        semester,
      });
      res.json({ message: "Course updated", course: updated });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating course" });
    }
  },

  async remove(req, res) {
    try {
      const id = req.params.id;
      await courseService.deleteCourse(id);
      res.json({ message: "Course deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting course" });
    }
  },
};
