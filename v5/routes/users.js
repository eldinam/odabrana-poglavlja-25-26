var express = require("express");
var router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const saltRound = 10;

// HASH PASSWORD
const getHashedPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, saltRound);
};

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

// Render registration page
router.get("/register", function (req, res) {
  res.render("registerForm", { title: "Register" });
});

// Render login page
router.get("/login", function (req, res) {
  res.render("loginForm", { title: "Login" });
});

// ✅ REGISTER USER
router.post("/register-user", async function (req, res) {
  try {
    const { first_name, last_name, email, password, age } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // 1️⃣ Provjeri da li email već postoji
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).send("Email already in use.");
    }

    // 2️⃣ Hashiraj password
    const hashedPassword = await getHashedPassword(password);

    // 3️⃣ Ubaci user-a u bazu
    const query = `
      INSERT INTO users (first_name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const result = await pool.query(query, [
      first_name,
      last_name,
      email,
      hashedPassword,
      age,
    ]);

    return res.json({
      message: "User registered successfully",
      user_id: result.rows[0].id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during registration.");
  }
});

router.post("/login-user", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).send("Invalid email or password.");
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password.");
    }

    // --------------- COOKIE LOGIN LOGIKA -----------------
    res.cookie(
      "user",
      { id: user.id, email: user.email },
      {
        httpOnly: true,
        signed: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 dan
      }
    );
    // ------------------------------------------------------

    return res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during login.");
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/users/login");
});

module.exports = router;
