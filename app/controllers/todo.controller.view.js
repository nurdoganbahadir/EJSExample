"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* CONTROLLERS:

const Todo = require("../models/todo.model");

const PRIORITIES = {
  "-1": "low",
  0: "Normal",
  1: "High",
};

module.exports = {
  list: async (req, res) => {
    const data = await Todo.findAndCountAll();

    res.render("index", {
      todos: data.rows,
      count: data.count,
      priorities: PRIORITIES,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    if (req.method === "POST") {
      const data = await Todo.create(req.body);

      if (data) res.redirect("/views");
    } else {
      res.render("todoCreate", { priorities: PRIORITIES });
    }
  },

  read: async (req, res) => {
    const data = await Todo.findByPk(req.params.id);

    res.render("todoRead", { todo: data, priorities: PRIORITIES });
  },

  update: async (req, res) => {
    if (req.method === "POST") {
      const data = await Todo.update(req.body, {
        where: { id: req.params.id },
      });

      if (data) res.redirect("/views");
    } else {
      const data = await Todo.findByPk(req.params.id);

      res.render("todoUpdate", { todo: data, priorities: PRIORITIES });
    }
  },

  delete: async (req, res) => {
    //todo -> cancel yapildiginda datayi silmesini nasil engelleriz ?

    const data = await Todo.destroy({ where: { id: req.params.id } });

    if (data > 0) {
      // kayıt silindiyse...

      res.redirect("/views");
    } else {
      // silinemediyse...

      // send to ErrorHandler:
      res.errorStatusCode = 404;
      throw new Error("Can not Deleted. (Maybe Already deleted)");
    }
  },
};

/* ------------------------------------------------------- */
