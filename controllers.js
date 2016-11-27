
module.exports.register = ({body: {username, password}}, res) => {
    console.log(username)
    console.log(password)
    res.send("Register")
}

module.exports.login = ({body: {username, password}}, res) => {
    console.log(username)
    console.log(password)
    res.send("Login")
}

module.exports.createNewApplication = (req, res) => {
    console.log(req.body)
    res.send("New Application")
}

module.exports.makeRecommendation = (req, res) => {
    console.log(req.body)
    res.send("Make Recommendation")
}