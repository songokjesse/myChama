const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const generateToken = require('../middlewares/generateToken')
const hashSalt = 10

const prisma = new PrismaClient()

const Register = async (req,res,next)=>{
    const {email, name, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        if (user){
            return res.status(403).send({"Status": "Error", "Message": "User Already Exists"})
        }
        const hashedPassword = bcrypt.hashSync(password, hashSalt)
        const UserCreated = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        })
        //generate token for new user
        const token = generateToken(UserCreated)
        res.status(200).send({ "user":  UserCreated, "token": token})

    }catch(error){
        res.status(403).send(error)
    }finally{
        async() => {
        await prisma.$disconnect()
        }
    } 
}
const Login = async (req,res,next)=>{
	console.log(req.body)
    const {email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email : email
            }
        })
        if (!user){
            return res.status(401).send({"Status": "Error", "Message": "User not Authorized"})
        }
        const correctPassword = bcrypt.compareSync(password, user.password)
        if(!correctPassword){
            return res.status(401).send({"Status": "Error", "Message": "User not Authorized"})
        }

        //generate token for new user
        const token = generateToken(user.email)
        res.status(200).send({ "Status": "Success" ,"user":  user.email, "token": token})
    }catch(error){
            return res.status(403).send({"Status": "Error", "Message": error})
    }finally{
         async() => {
        await prisma.$disconnect()
        }
    }

}


module.exports = {
    Register,
    Login
}
