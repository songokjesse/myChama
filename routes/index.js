const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    res.send({
        message: "Hello Prisma"
    })
})

module.exports = router 