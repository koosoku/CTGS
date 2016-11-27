const express = require("express")
const bodyParser = require("body-parser")
var app = express()
const controller = require("./controllers.js")

app.use(bodyParser.json())

app.get('/', function(req,res){
    res.send("Is working!")
})

app.post('/users', controller.register)
app.post('/login', controller.login)
app.post('/applications', controller.createNewApplication)
app.put('/application', controller.makeRecommendation)
app.listen(8080)