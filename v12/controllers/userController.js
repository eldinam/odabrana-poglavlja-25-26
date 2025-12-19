// controllers/userController.js
const userService = require("../services/userService");

module.exports = {
  renderRegister(req, res) {
    res.render("registerForm", { title: "Register" });
  },

  renderLogin(req, res) {
    res.render("loginForm", { title: "Login" });
  },

  // POST /users/register-user  (AJAX)
  async registerUser(req, res) {
    try {
      const { first_name, last_name, email, password, age } = req.body;

      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }

      const user = await userService.registerUser({
        first_name,
        last_name,
        email,
        password,
        age,
      });

      res.json({ message: "User registered successfully", user_id: user.id });
    } catch (err) {
      console.error(err);
      if (err.message === "Email already in use.") {
        return res.status(400).send(err.message);
      }
      res.status(500).send("Error during registration.");
    }
  },

  // POST /users/login-user (AJAX)
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }

      const user = await userService.loginUser(email, password);

      // COOKIE – isto kao što smo radili prije, ali sada preko ORM-a
      res.cookie(
        "user",
        { id: user.id, email: user.email },
        {
          httpOnly: true,
          signed: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 dan
        }
      );

      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      if (err.message === "Invalid email or password.") {
        return res.status(401).send(err.message);
      }
      res.status(500).send("Server error during login.");
    }
  },

  logout(req, res) {
    res.clearCookie("user");
    res.redirect("/users/login");
  },
};
