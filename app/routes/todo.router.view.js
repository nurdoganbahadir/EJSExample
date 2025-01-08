"use strict";

const router = require("express").Router();
const todo = require("../controllers/todo.controller.view");

router.route("/").get(todo.list).post(todo.create);

// router
//   .route("/:id")
//   .get(todo.read)
//   .put(todo.update) // Tam data güncellemesi
//   .patch(todo.update) // Kısmi data güncellemesi
//   .delete(todo.delete);

router.get("/", todo.list);

router.all("/create", todo.create);

router.get("/:id", todo.read);

router.get("/:id/delete", todo.delete);

router.all("/:id/update", todo.update);

// Export:
module.exports = router;
/* ------------------------------------------------------- */
