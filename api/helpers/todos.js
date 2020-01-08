var db = require("../models")

exports.getTodos = function(req, res){
   db.Todo.find()
   .then(function(todos){
      res.json(todos)
   })
   .catch(function(err){
      res.send(err)
   })
}

exports.createTodos = function(req, res){
   db.Todo.create(req.body)
   .then(function(newTodo){
      res.json(newTodo)
   })
   .catch(function(err){
      res.send(err)
   })
}

exports.getTodo = function(req, res){
   db.Todo.findById(req.params.todoId)
   .then(function(foundTodo){
      res.json(foundTodo)
   })
   .catch(function(err){
      res.send(err)
   })
}

exports.updateTodo = function(req, res){
   // {new: true} means the db will return the updated data instead of the
   // default which would return the original version prior to the update
   db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(function(updatedTodo){
      res.json(updatedTodo)
   })
   .catch(function(err){
      res.send(err)
   })
}

exports.deleteTodo = function(req, res){
   // {new: true} means the db will return the updated data instead of the
   // default which would return the original version prior to the update
   db.Todo.remove({_id: req.params.todoId}, req.body, {new: true})
   .then(function(){
      res.json({message: "Todo Deleted"})
   })
   .catch(function(err){
      res.send(err)
   })
}

module.exports = exports