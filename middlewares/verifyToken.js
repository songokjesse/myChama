require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET

const verifyToken = (req,res,next) =>{
    const authToken = req.headers['authorization']
    if (!authToken){
                return res.status(401).send({"Status": "Error", "Message": "1User not Authorized"})
    }
    const token = authToken && authToken.split(' ')[1]
    if (token == null){
        return res.status(401).send({"Status": "Error", "Message": "2User not Authorized"})
    }
    jwt.verify(token, JWT_SECRET, (error,user)=>{
        if (error){
            return res.status(403).send({"Status": "Error", "Message": error})
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken