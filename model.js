const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')

module.exports.registerSupervisor = (username, password, callback) => {
    console.log('supervisor')
    db.insert('supervisors', {username, password}).run(callback)
}

module.exports.registerStudent = (username, password, supervisor, callback) => {
    console.log('student')
    db.insert('students', {username, password, supervisor}).run(callback)
}
