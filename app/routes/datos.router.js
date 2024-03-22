const express = require('express')
const DatosService = require('../service/datos.service')
const  router = express.Router()
const path = require('path')
const service = new DatosService()


router.get("/", async (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname, '../public/html/tabla.html'));
    } catch(error) {
        next (error)
    }
})

router.post('/', async (req,res,next) =>{
    try{
        res.json(await service.consulta(req.body))
    } catch(error) {
        next(error)
    }
})

router.get("/contratos", async (req, res, next)=>{
    try{
        res.sendFile(path.join(__dirname, '../public/html/contrato.html'));
    } catch(error) {
        next (error)
    }
})
router.post('/contratos', async (req, res, next) => {
    try{
        res.json(await service.contratos(req.body))
    } catch(error) {
        next(error)
    }
})
module.exports = router;