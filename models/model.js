const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports.registerSupervisor = (username, plainTextPassword, name, email, callback) => {
    bcrypt.hash(plainTextPassword, saltRounds, function(err, password) {
        db.insert('supervisors', {username, password, name, email}).run(callback)
    })
}

module.exports.registerStudent = (username, plainTextPassword, name, email, callback) => {
    bcrypt.hash(plainTextPassword, saltRounds, function(err, password) {
        db.insert('students', {username, password, name, email}).run(callback)
    })
}

module.exports.loginSupervisor = (username, password, callback) => {
    db.select('password').from('supervisors').where('username', username).row((err, row) => {
        if (row) {
            bcrypt.compare(password, row.password, function (err, passwordMatches) {
                if (passwordMatches)
                    callback(null)
                else
                    callback(true)
            })
        } else
            callback(true)
    })
}

module.exports.loginStudent = (username, password, callback) => {
    db.select('password').from('students').where('username', username).row((err, row) => {
        if (row) {
            bcrypt.compare(password, row.password, function (err, passwordMatches) {
                if (passwordMatches)
                    callback(null)
                else
                    callback(true)
            })
        } else
            callback(true)
    })
}

module.exports.createNewApplication = (registration, transportation, accomidation, meals, owner, supervisor, conference_detail, presentation_type, presentation_title, callback) => {
    db.insert('applications', {registration, transportation, accomidation, meals, owner, supervisor, conference_detail, presentation_type, presentation_title}).run(callback)
}

module.exports.checkAuthorization = (username, applicationId, callback) => {
    db.select('supervisor').from('applications').where('id', applicationId).row((err,row) => {
        if(username === row.supervisor)
            callback(null)
        else
            callback(true)
    })
}

module.exports.makeRecommendation = (recommendation, applicationId, callback) => {
    db.update('applications', {recommendation}).where('id', applicationId).run(callback)
}

module.exports.getStudents = (callback) => {
    db.select('name').from('students').rows(callback)
}

module.exports.getStudentsApplications = (username, callback) => {
    db.select('*').from('applications').where('owner', username).rows(callback)
}

module.exports.getSupervisorApplications = (username, callback) => {
    db.select('*').from('applications').where('supervisor', username).rows(callback)
}

module.exports.getApplications = (callback) => {
    db.select('*').from('applications').rows(callback)
}

module.exports.getApplicationByID = (id, callback) => {
    db.select('*').from('applications').where('id',id).rows(callback)
}
