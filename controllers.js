const model = require('./model.js')

module.exports.register = ({body: {username, password, role, name}}, res) => {
    if (role === 'supervisor') {
        model.registerSupervisor(username, password, name, (err) => {
            if(err)
                res.send('supervisor registration failed')
            else
                res.send('Registered Supervisor' )
        })
    } else if (role === 'student') {
        model.registerStudent(username, password, name, (err) => {
            if(err)
                res.send('student registration failed')
            else
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
    var {registration, transportation, accomidation, meals, supervisor} = req.body

    if (req.session.role === 'supervisor') {
        res.send("Supervisors cannot create applications")
    } else if (req.session.role === 'student') {
        model.createNewApplication(registration, transportation, accomidation, meals, req.session.username, supervisor, (err) => {
            if(err) {
                res.send('Application Failed to Create')
            } else {
                res.send('Successfully created an application!')
            }
        })
    }
}

module.exports.makeRecommendation = (req, res) => {
    var {recommendation, applicationId} = req.body

    if (req.session.role === 'student') {
        res.send("student cannot make recommendations")
    } else if (req.session.role === 'supervisor') {
        model.checkAuthorization(req.session.username, applicationId, (err) => {
            if(err)
                res.send('Supevisor does not have authorization')
            else
                model.makeRecommendation(recommendation, applicationId, (err) => {
                    if(err)
                        res.send('Recoomendation Failed')
                    else
                        res.send("Recommendation made")
                })
        })

    }
}

module.exports.getStudents = (req, res) => {
    model.getStudents((err, students) => {
        if(err)
            res.send({
                err,
                data: null
            })
        else
            res.send({
                err: null,
                data: students
            })
    })
}

module.exports.getStudentsApplications = (req, res) => {
    model.getStudentsApplications(req.params.username, (err, applications) => {
        if(err)
            res.send({
                err,
                data: null
            })
        else
            res.send({
                err: null,
                data: applications
            })
    })
}

