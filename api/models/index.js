var mongoose = require("mongoose")
mongoose.set("debug", true)
mongoose.connect("mongodb://localhost:27017/todo-fullStack",
   {useMongoClient: true})

mongoose.Promise = Promise

module.exports.Todo = require("./Todo")

