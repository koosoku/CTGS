
module.exports.register = ({body: {username, password}}, res) => {
    res.send("Register")
}

module.exports.login = (req, res) => {)
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