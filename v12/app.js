var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const sequelize = require("./config/db");

// ROUTES
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const studentRouter = require("./routes/student");
const subjectRouter = require("./routes/subject");
const coursesRouter = require("./routes/courses");

var app = express();

/* ================================
   VIEW ENGINE
================================ */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

/* ================================
   MIDDLEWARE
================================ */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("gIE3huWaP6")); // Signed cookies
app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

/* ================================
   DATABASE
================================ */
sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to DB via Sequelize"))
  .catch((err) => console.error("❌ DB connection error:", err));

sequelize
  .sync()
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ Sync error:", err));

app.use((req, res, next) => {
  res.locals.user = null;
  next();
});

/* ================================
   AUTH MIDDLEWARE
================================ */
app.use((req, res, next) => {
  const publicPaths = [
    "/users/login",
    "/users/login-user",
    "/users/register",
    "/users/register-user",
  ];

  if (publicPaths.some((p) => req.path.startsWith(p))) {
    return next();
  }

  const user = req.signedCookies.user;

  if (!user) {
    if (req.method === "GET") {
      return res.redirect("/users/login");
    }
    return res.status(403).json({ error: "Not authorized" });
  }

  req.user = user;

  // 🔥 OVO JE KLJUČNO ZA SOCKET + EJS
  res.locals.user = user;

  next();
});
/* ================================
   ROUTES
================================ */
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentRouter);
app.use("/subjects", subjectRouter);
app.use("/courses", coursesRouter);

/* ================================
   ERROR HANDLERS
================================ */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
