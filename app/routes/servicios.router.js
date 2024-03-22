const express = require('express')
const bodyParser = require('body-parser')
const ServiciosService = require('../service/servicios.service')
const router = express.Router();

const service = new ServiciosService();

/* router.get('/servicios', async (req,res, next) => {
    try{
        const rta = await service.servicios()
        console.log(rta)
        res.json(rta)
    } catch (error){
        next(error)
    }
})
 */

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.post('/servicios', async (req, res) => {
    const parametro = req.body.consulta;
    const rta = await service.servicios(parametro)
    // Procesa la consulta como desees

    console.log('Parametro recibido:', parametro);
    console.log(rta)
    // Realiza la lógica necesaria y devuelve una respuesta al frontend
    res.json(rta);
});

module.exports = router; 