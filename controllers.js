const model = require('./model.js')

module.exports.register = ({body: {username, password, role, supervisor}}, res) => {
    if (role === 'supervisor') {
        model.registerSupervisor(username, password, () => {
            res.send('Registered Supervisor' )
        })
    } else if (role === 'student') {
        model.registerStudent(username, password, supervisor, () => {
            res.send('Registered Student' )
        })
    }
}

module.exports.login = (req, res) => {
    req.session.username = req.body.username
    res.send("Login")
}

module.exports.createNewApplication = (req, res) => {
    console.log(req.session)
    res.send("New Application")
}

module.exports.makeRecommendation = (req, res) => {
    res.send("Make Recommendation")
}