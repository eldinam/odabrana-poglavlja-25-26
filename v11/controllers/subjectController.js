// controllers/subjectController.js
const subjectService = require("../services/subjectService");

module.exports = {
  // GET /subjects/all  → render EJS
  async renderList(req, res) {
    try {
      const subjects = await subjectService.listSubjects();
      res.render("subjectList", {
        title: "Subject list",
        subjectList: subjects,
      });
    } catch (err) {
      console.error("Error fetching subjects:", err);
      res.status(500).send("Internal server error");
    }
  },

  // POST /subjects/add-new-subject-below (AJAX)
  async createBelow(req, res) {
    try {
      const { name, code, year } = req.body;

      if (!name || !code || !year) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const created = await subjectService.createSubject({ name, code, year });

      return res.json({
        success: true,
        subject: created,
      });
    } catch (error) {
      console.error("Insert error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // DELETE /subjects/delete/:id (AJAX)
  async deleteSubject(req, res) {
    try {
      const id = req.params.id;
      await subjectService.deleteSubject(id);
      return res.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // PUT /subjects/update/:id (AJAX)
  async updateSubject(req, res) {
    try {
      const id = req.params.id;
      const { name, code, year } = req.body;

      const updated = await subjectService.updateSubject(id, {
        name,
        code,
        year,
      });

      if (!updated) {
        return res.status(404).json({ error: "Subject not found" });
      }

      return res.json({
        success: true,
        updated,
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
