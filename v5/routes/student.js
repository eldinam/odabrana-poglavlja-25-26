var express = require("express");
var router = express.Router();
const pool = require("../db/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("studentHomePage", { title: "Students" });
});

router.get("/all", async function (req, res, next) {
  const query = "SELECT * FROM students";

  try {
    const result = await pool.query(query);

    res.render("studentList", {
      title: "Student list",
      studentList: result.rows,
    });
  } catch (error) {
    res.render("index", { title: "Students" });
  }
});

router.get("/new", function (req, res, next) {
  try {
    res.render("studentForm", {
      title: "New student",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Došlo je do greške ${error}` });
  }
});

router.post("/add-new-student", async function (req, res, next) {
  try {
    console.log("TEST");
    console.log(req.body);
    studentName = req.body.name;
    studentAge = req.body.age;
    studentIndex = req.body.index_number;

    let query =
      "INSERT INTO students (name, age, index_number) VALUES ($1, $2, $3) RETURNING *";

    let result = await pool.query(query, [
      studentName,
      studentAge,
      studentIndex,
    ]);
    console.log("Inserted:", result.rows[0]);

    query = "SELECT * FROM students";
    result = await pool.query(query);

    res.render("studentList", {
      title: "Student list",
      studentList: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Došlo je do greške ${error}` });
  }
});

router.get("/delete/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const query = "DELETE FROM students WHERE ID = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    // res.status(200).json({
    //   message: "Student uspješno obrisan",
    //   deletedStudent: result.rows[0],
    // });

    return res.redirect("/students/all");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Došlo je do greške ${error}` });
  }
});

router.get("/update/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM students WHERE id = $1";

    const result = await pool.query(query, [id]);

    console.log(result);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student nije pronađen" });
    }

    res.render("studentView", {
      title: "Edit student",
      student: result.rows[0],
    });
  } catch (error) {
    console.error("Greška pri editu studenta", error.stack);
    res
      .status(500)
      .json({ error: `Došlo je do greške pri editu studenta ${error}` });
  }
});

router.post("/update-student", async function (req, res, next) {
  try {
    console.log("TEST");
    console.log(req.body);

    studentId = req.body.id;
    studentName = req.body.name;
    studentAge = req.body.age;
    studentIndex = req.body.index_number;

    let query =
      "UPDATE students SET name=$1, age=$2, index_number=$3 where id=$4 RETURNING *";

    let result = await pool.query(query, [
      studentName,
      studentAge,
      studentIndex,
      studentId,
    ]);
    console.log("Inserted:", result.rows[0]);

    res.redirect("/students/all");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Došlo je do greške ${error}` });
  }
});

module.exports = router;
