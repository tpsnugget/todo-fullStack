var express = require("express"),
app = express()

var todoRoutes = require("./routes/todos")

app.use(express.json())
app.use("/api/todos", todoRoutes)
app.use(express.urlencoded({ extended: true }))

app.get("/", function(req, res){
   res.json({message: "Express is up Man!"})
})

app.listen(9000, process.env.IP, () => console.log("api server is up Man!"))