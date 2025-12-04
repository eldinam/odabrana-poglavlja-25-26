var express = require("express");
var router = express.Router();
const pool = require("../db/db");

// LIST ALL SUBJECTS
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subjects ORDER BY id ASC");

    res.render("subjectList", {
      title: "Subject list",
      subjectList: result.rows,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send("Internal server error");
  }
});

// CREATE SUBJECT (AJAX insert)
router.post("/add-new-subject-below", async (req, res) => {
  try {
    const { name, code, year } = req.body;

    const query = `
      INSERT INTO subjects (name, code, year)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const result = await pool.query(query, [name, code, year]);

    return res.status(200).json({
      success: true,
      subject: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding subject:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// DELETE SUBJECT
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM subjects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE SUBJECT (AJAX)
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, year } = req.body;

    const query = `
      UPDATE subjects
      SET name = $1, code = $2, year = $3
      WHERE id = $4
      RETURNING *
    `;

    const result = await pool.query(query, [name, code, year, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }

    return res.json({
      success: true,
      updated: result.rows[0],
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
