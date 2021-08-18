const jwt = require('jsonwebtoken')
const {secret} = require ('../controllers/keyConfig')
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization
        if(!token) {
            return res.status(403).json({message: "Not logged in!"})
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData.id
        next()
    } catch (error) {
        return next(error)
    }
}