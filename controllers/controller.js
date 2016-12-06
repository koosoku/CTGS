const model = require('../models/model.js')

module.exports.registerAdmin = (req, res) => {
    var {username, password, name, email} = req.body
    model.registerAdmin(username, password, name, email, (err) => {
        if(err)
            res.status(500).send('Admin registration failed')
        else
            res.status(201).send('Registered Admin' )
    })
}

module.exports.register = (req, res) => {
    var {username, password, role, name, email, supervisor} = req.body
    if (req.session.role === 'admin') {
        if (role === 'supervisor') {
            model.registerSupervisor(username, password, name, email, (err) => {
                if(err)
                    res.status(500).send('Supervisor Registration Failed')
                else
                    res.status(201).send('Registered Supervisor' )
            })
        } else if (role === 'student') {
            model.registerStudent(username, password, name, email, supervisor, (err) => {
                if(err)
                    res.status(500).send('Student Registration Failed')
                else
                    res.status(201).send('Registered Student' )
            })
        } else {
            res.status(403).send('Role not specified or the specified role is wrong.')
        }
    } else {
        res.status(401).send('You do not have the right to create users')
    }

}

module.exports.login = (req, res) => {
    var {username, password, role} = req.body
    console.log(username, password, role)
    if (role === 'supervisor') {
        model.loginSupervisor(username, password, (err) => {
            if (err){
                res.status(401).send('Login failed')
            } else {
                req.session.username = username
                req.session.role = role
                res.status(200).send('Successfully logged in!')
            }

        })
    } else if (role === 'student') {
        model.loginStudent(username, password, (err) => {
            if (err){
                res.status(401).send('Login failed')
            } else {
                req.session.username = username
                req.session.role = role
                res.status(200).send('Successfully logged in!')
            }

        })
    } else if (role === 'admin') {
        model.loginAdmin(username, password, (err) => {
            if (err){
                res.status(401).send('Login failed')
            } else {
                req.session.username = username
                req.session.role = role
                res.status(200).send('Successfully logged in!')
            }

        })
    }
    else {
        res.status(400).send('Wrong Role')
    }
}

module.exports.createNewApplication = (req, res) => {
    var {registration, transportation, accommodation, meals, conferenceDetail, presentationType, presentationTitle} = req.body

    if (req.session.role === 'supervisor') {
        res.status(403).send("Supervisors cannot create applications")
    } else if (req.session.role === 'student') {
        model.createNewApplication(registration, transportation, accommodation, meals, req.session.username, conferenceDetail, presentationType, presentationTitle, (err) => {
            if(err) {
                res.status(500).send('Application Failed to Create')
                console.error(err);
            } else {
                res.status(201).send('Successfully created an application!')
            }
        })
    }
}

module.exports.makeRecommendation = (req, res) => {
    var {recommendation, applicationId} = req.body

    if (req.session.role === 'student') {
        res.status(403).send("Student cannot make recommendations")
    } else if (req.session.role === 'supervisor') {
        model.checkAuthorization(req.session.username, applicationId, (err) => {
            if(err)
                res.status(401).send('Supervisor does not have authorization')
            else
                model.makeRecommendation(recommendation, applicationId, (err) => {
                    if(err)
                        res.status(500).send('Recommendation failed')
                    else
                        res.status(201).send("Recommendation successful")
                })
        })

    }
}

module.exports.getStudents = (req, res) => {
    model.getStudents((err, students) => {
        if(err)
            res.status(500).send({
                err,
                data: null
            })
        else
            res.status(200).send({
                err: null,
                data: students
            })
    })
}

module.exports.getStudentsApplications = (req, res) => {
    model.getStudentsApplications(req.params.username, (err, applications) => {
        if(err)
            res.status(500).send({
                err,
                data: null
            })
        else
            res.status(200).send({
                err: null,
                data: applications
            })
    })
}

module.exports.getSupervisors = (req, res) => {
  model.getSupervisors((err, supervisors) => {
    if(err)
        res.status(500).send({
            err,
            data: null
        })
    else
        res.status(200).send({
            err: null,
            data: supervisors
        })
  })
}


module.exports.getSupervisorApplications = (req, res) => {
    model.getSupervisorApplications(req.params.username, (err, applications) => {
        if(err)
            res.status(500).send({
                err,
                data: null
            })
        else
            res.status(200).send({
                err: null,
                data: applications
            })
    })
}

module.exports.getApplications = (req, res) => {
    model.getApplications((err, applications) => {
        if(err)
            res.status(500).send({
                err,
                data: null
            })
        else
            res.status(200).send({
                err: null,
                data: applications
            })
    })
}

module.exports.getApplicationByID = (req, res) => {
    model.getApplicationByID(req.params.id, (err, applications) => {
        if(err)
            res.status(500).send({
                err,
                data: null
            })
        else
            res.status(200).send({
                err: null,
                data: applications
            })
    })
}
