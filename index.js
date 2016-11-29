const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
var app = express()
const controller = require('./controllers.js')

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'session',
    keys: ['coolestkey', 'secondcoolestkey'],
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
}))

app.get('/', function(req,res){
    res.send('Is working!')
})

app.post('/users', controller.register)
app.post('/login', controller.login)
app.post('/applications', controller.createNewApplication)
app.put('/application', controller.makeRecommendation)
app.listen(8080)