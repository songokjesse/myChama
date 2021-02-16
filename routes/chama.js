const express = require('express')
const router = express.Router()
const ChamaController = require('../controllers/myChamaController')

router.get('/', ChamaController.ListmyChama)
router.get('/:id', ChamaController.getChama)
router.post('/', ChamaController.AddChama)
router.put('/:id', ChamaController.EditChama)



module.exports = router