const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
var app = express()
const controller = require('./controllers/controller.js')
const path = require('path')

app.use(bodyParser.json())

app.use(cookieSession({
    name: 'session',
    keys: ['coolestkey', 'secondcoolestkey'],
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
}))

app.use('/', express.static(path.join(__dirname, './client/dist')))
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, './client/dist', 'index.html'));
})

app.post('/users', controller.register)
app.post('/admins', controller.registerAdmin)
app.post('/login', controller.login)
app.post('/applications', controller.createNewApplication)
app.put('/application', controller.makeRecommendation)
app.get('/students', controller.getStudents)
app.get('/student/applications/:username', controller.getStudentsApplications)
app.get('/supervisor/applications/:username', controller.getSupervisorApplications)
app.get('/applications', controller.getApplications)
app.get('/application/:id', controller.getApplicationByID)

app.listen(8080)
