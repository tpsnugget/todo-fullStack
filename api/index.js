var express = require("express"),
app = express()

app.get("/", function(req, res){
   res.send("Express is up Man!")
})

app.listen(9000, process.env.IP, () => console.log("api server is up Man!"))