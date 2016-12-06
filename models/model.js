const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')
const bcrypt = require('bcrypt')
const saltRounds = 10


module.exports.registerSupervisor = (username, plainTextPassword, name, email, callback) => {
    bcrypt.hash(plainTextPassword, saltRounds, function(err, password) {
        db.insert('supervisors', {username, password, name, email}).run(callback)
    })
}

module.exports.registerAdmin = (username, plainTextPassword, name, email, callback) => {
    bcrypt.hash(plainTextPassword, saltRounds, function(err, password) {
        db.insert('admins', {username, password, name, email}).run(callback)
    })
}

module.exports.registerStudent = (username, plainTextPassword, name, email, supervisor, callback) => {
    bcrypt.hash(plainTextPassword, saltRounds, function(err, password) {
        db.insert('students', {username, password, name, email, supervisor}).run(callback)
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

module.exports.loginAdmin = (username, password, callback) => {
    db.select('password').from('admins').where('username', username).row((err, row) => {
        if (row) {
            bcrypt.compare(password, row.password, function (err, passwordMatches) {
                if (passwordMatches)
                    callback(null)
                else
                    callback(true)
            })
        }
    })
}

module.exports.createNewApplication = (registration, transportation, accommodation, meals, owner, conference_detail, presentation_type, presentation_title, start_date, end_date, status, callback) => {
    db.raw('INSERT INTO applications (registration, transportation, accommodation, meals, owner, supervisor, recommendation, conference_detail, presentation_type, presentation_title, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5, (SELECT supervisor FROM students WHERE username = $6), NULL, $7, $8, $9, $10, $11, $12);', [registration, transportation, accommodation, meals, owner, owner, conference_detail, presentation_type, presentation_title, start_date, end_date, status]).run(callback)
}

module.exports.checkSupervisorHasAuthorization = (username, applicationId, callback) => {
    db.select('supervisor').from('applications').where('id', applicationId).row((err,row) => {
        if(row && username === row.supervisor)
            callback(null)
        else
            callback(true)
    })
}

module.exports.checkStudentHasAuthorization = (username, applicationId, callback) => {
    db.select('owner').from('applications').where('id', applicationId).row((err,row) => {
        if(row && username === row.owner)
            callback(null)
        else
            callback(true)
    })
}

module.exports.makeRecommendation = (recommendation, applicationId, callback) => {
    db.update('applications', {recommendation}).where('id', applicationId).run(callback)
}

module.exports.changeApplication = (changeArgs, applicationId, callback) => {
    console.log(changeArgs)
    db.update('applications', changeArgs).where('id', applicationId).run(callback)
}

module.exports.getStudents = (callback) => {
    db.select('name').from('students').rows(callback)
}

module.exports.getStudentsApplications = (username, callback) => {
    db.select('*').from('applications').where('owner', username).rows(callback)
}

module.exports.getSupervisors = (callback) => {
  db.select('username').from('supervisors').rows(callback)
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
