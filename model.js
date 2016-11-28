const db = require('pg-bricks').configure('postgres://koosoku:keyboardcat@localhost:5432/CTGS')

module.exports.register = (username, password, permission, callback) => {
    console.log(username, password, permission)
    db.insert('users', {username, password, permission}).run(callback)
}
