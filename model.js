const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')

module.exports.registerSupervisor = (username, password, callback) => {
    db.insert('supervisors', {username, password}).run(callback)
}

module.exports.registerStudent = (username, password, supervisor, callback) => {
    db.insert('students', {username, password, supervisor}).run(callback)
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