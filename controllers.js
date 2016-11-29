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
    var {username, password, role} = req.body
    if (role === 'supervisor') {
        model.loginSupervisor(username, password, (err) => {
            if(err)
                res.send('Login failed')
            else
                res.send('Successfully logged in!')
        })
    } else if (role === 'student') {
        model.loginStudent(username, password, (err) => {
            if(err)
                res.send('Login failed')
            else
                res.send('Successfully logged in!')
        })
    }
}

module.exports.createNewApplication = (req, res) => {
    console.log(req.session)
    res.send("New Application")
}

module.exports.makeRecommendation = (req, res) => {
    res.send("Make Recommendation")
}