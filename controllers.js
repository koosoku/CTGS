const model = require('./model.js')

module.exports.register = ({body: {username, password, permission}}, res) => {
    model.register(username, password, permission, () => {
        res.send('Register' )
    })
}

module.exports.login = (req, res) => {
    req.session.username = req.body.username
    res.send("Login")
}

module.exports.createNewApplication = (req, res) => {
    console.log(req.session)
    res.send("New Application")
}

module.exports.makeRecommendation = (req, res) => {
    res.send("Make Recommendation")
}