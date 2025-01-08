"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept JSON data and convert to object (for API):
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-async-errors: catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

app.set("view engine", "ejs");
app.set("views", "./public");

/* ------------------------------------------------------- */
//* Routes:

app.all("/", (req, res) => {
  //   res.render("index");
  res.send(
    `<p><a href="/views">Todo Template</a></p>
    <p><a href="/views">Todo RestAPI</a></p>`
  );
});

app.use("/views", require("./app/routes/todo.router.view"));
app.use("/api", require("./app/routes/todo.router.api"));

/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;

  const data = {
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  };

  if (req.originalUrl.startsWith("/api")) {
    console.log("errorHandler worked.");
    res.status(errorStatusCode).send(data);
  } else {
    res.render("error", { data });
  }
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
