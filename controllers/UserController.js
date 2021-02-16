const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ListUsers = async (req,res)=> {
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

const AddUser = async (req,res) => {

}
module.exports = {
    ListUsers,
    AddUser
}
    