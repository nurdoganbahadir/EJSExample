"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* ROUTERS:

// const router = express.Router()
const router = require("express").Router();

// Call todo.controller:
const todo = require("../controllers/todo.controller.api");

// // LIST TODOS:
// router.get('/', todo.list)
// //? CRUD ->
// // CREATE TODO:
// router.post('/', todo.create)
// // READ TODO:
// router.get('/:id(\\d+)', todo.read)
// // UPDATE TODO:
// router.put('/:id', todo.update)
// // DELETE TODO:
// router.delete('/:id', todo.delete)

router.route("/").get(todo.list).post(todo.create);

router
  .route("/:id")
  .get(todo.read)
  .put(todo.update) // Tam data güncellemesi
  .patch(todo.update) // Kısmi data güncellemesi
  .delete(todo.delete);

// Export:
module.exports = router;
/* ------------------------------------------------------- */
