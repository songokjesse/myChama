const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ListUsers = async (req,res,next)=> {
    try {
        const allUsers = await prisma.user.findMany({
            include: {
                profile: true
            }
        })
        res.json({"Users": allUsers})
                
    } catch (e){
        res.status(500).send(e)
    } finally { async() => {
        await prisma.$disconnect()
        }
    }
}

const getUser = async (req,res,next)=> {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id)}
        }) 
        res.json({"User": user})
                
    } catch (e){
        res.status(500).send(e)
    } finally { async() => {
        await prisma.$disconnect()
        }
    }
}


const AddUser = async (req,res,next) => {

    try {
     
     const userData =  await prisma.user.create({ data: {...req.body} })
            res.status(201).send({ 'Success' : 'User Added', userData})
        }catch (e){
        res.status(500).send(e)
         } finally { async() => {
        await prisma.$disconnect()
        }
        }
}
const EditUser = async (req,res,next) => {
    const { id } = req.params
    try {
        const UpdataUser = await prisma.user.update({
            where: {id: id },
            data: {...req.body}
        })
    } catch (error) {
        
    }
}
module.exports = {
    ListUsers,
    getUser,
    AddUser,
    EditUser
}
    