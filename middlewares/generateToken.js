const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET
console.log(JWT_SECRET)
const generateToken = (user) =>
{
    // const tokenExpiry =  24  *  60  *  60
    const token = jwt.sign(user, JWT_SECRET)
    return token
}

module.exports = generateToken