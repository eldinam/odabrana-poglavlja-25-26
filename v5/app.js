var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const envConfig = require("dotenv").config(); // **********
const expressLayouts = require("express-ejs-layouts"); // ****************

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const studentRouter = require("./routes/student"); // ***********************
const subjectRouter = require("./routes/subject");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")) // ***********************
);
app.use(
  "/jquery",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);

app.use(expressLayouts); // ***********************
app.set("layout", "layout"); // ***********************

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/students", studentRouter); // ***********************
app.use("/subjects", subjectRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" }); // *********
});

module.exports = app;
