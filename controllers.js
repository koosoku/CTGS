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
    var {username, password, role} = req.body
    console.log(username, password, role)
    if (role === 'supervisor') {
        model.loginSupervisor(username, password, (err) => {
            if (err){
                res.send('Login failed')
            } else {
                req.session.username = username
                req.session.role = role
                res.send('Successfully logged in!')
            }

        })
    } else if (role === 'student') {
        model.loginStudent(username, password, (err) => {
            if (err){
                res.send('Login failed')
            } else {
                req.session.username = username
                req.session.role = role
                res.send('Successfully logged in!')
            }

        })
    } else {
        res.send('Wrong Role')
    }
}

module.exports.createNewApplication = (req, res) => {
    var {registration, transportation, accomidation, meals, owner} = req.body

    if (req.session.role === 'supervisor'){
        res.send("Supervisors cannot create applications")
    }
    else if (req.session.role === 'student'){
        model.createNewApplication(registration, transportation, accomidation, meals, owner, (err) => {
            if(err){
                res.send('Application Failed to Create')
            } else {
                res.send('Successfully created an application!')
            }
        })
    }
}

