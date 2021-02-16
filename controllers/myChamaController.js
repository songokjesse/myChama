const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ListmyChama = async (req,res,next)=> {
    try {
        const allChama = await prisma.myChama.findMany() 
        res.json({"List of All MyChama's": allChama})
                
    } catch (e){
        res.status(500).send(e)
    } finally { async() => {
        await prisma.$disconnect()
        }
    }
}

const getChama = async (req,res,next)=> {
    const { id } = req.params
    try {
        const chama = await prisma.myChama.findUnique({
            where: { id: Number(id)}
        }) 
        res.json({"MyChama": chama})
                
    } catch (e){
        res.status(500).send(e)
    } finally { async() => {
        await prisma.$disconnect()
        }
    }
}

const AddChama = async (req,res,next) => {

    try {
     
     const chama =  await prisma.myChama.create({ data: {...req.body} })
            res.status(201).send({ 'Success' : 'Chama Added', chama})
        }catch (e){
        res.status(500).send(e)
         } finally { async() => {
        await prisma.$disconnect()
        }
        }
}
const EditChama = async (req,res,next) => {
    const { id } = req.params
    try {
        const chama = await prisma.myChama.update({
            where: {id: Number(id) },
            data: {
                "chamaName": req.body.chamaName,
                "chamaDescription": req.body.chamaDescription
            },
        })
                    res.status(201).send({ 'Success' : 'Chama Edited', chama})

    } catch (e) {
        res.status(500).send(e)
         } finally { async() => {
        await prisma.$disconnect()
        }
    }
}
module.exports = {
    ListmyChama,
    getChama,
    AddChama,
    EditChama
}
    