const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')

module.exports.registerSupervisor = (username, password, name, callback) => {
    db.insert('supervisors', {username, password, name}).run(callback)
}

module.exports.registerStudent = (username, password, name, callback) => {
    db.insert('students', {username, password, name}).run(callback)
}

module.exports.loginSupervisor = (username, password, callback) => {
    db.select('password').from('supervisors').where('username', username).row((err, row) => {
        if(password === row.password)
            callback(null)
        else
            callback(true)
    })
}

module.exports.loginStudent = (username, password, callback) => {
    db.select('password').from('students').where('username', username).row((err, row) => {
        if(password === row.password)
            callback(null)
        else
            callback(true)
    })
}

module.exports.createNewApplication = (registration, transportation, accomidation, meals, owner, supervisor, callback) => {
    db.insert('applications', {registration, transportation, accomidation, meals, owner, supervisor}).run(callback)
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
    db.select('name').from('students').rows((err, rows) => {
        callback(err, rows)
    })
}