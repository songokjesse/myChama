const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const verifyToken = require('../middlewares/verifyToken')

router.get('/', (req,res)=>{
    res.send({
        message: "Hello Prisma"
    })
})
router.get('/protected', verifyToken, (req,res,next)=>{
    res.send("Protected Arear")
})
module.exports = router 