var express = require("express"),
   router = express.Router(),
   db = require("../models"),
   helpers = require("../helpers/todos")

router.route("/")
   .get(helpers.getTodos)
   .post(helpers.createTodos)

router.get("/:todoId")
   .get(helpers.getTodo)
   .put(helpers.updateTodo)
   .delete(helpers.deleteTodo)

module.exports = router