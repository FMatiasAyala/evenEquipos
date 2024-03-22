const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const EventosService = require('../service/eventos.service')
const service = new EventosService()
const router = express.Router()



/* router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true })); */
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.get('/eventos',async(req,res,next)=>{
    try{
        res.sendFile(path.join(__dirname,'../public/html/eventos.html'))
    } catch(error){
        next(error)
    }
})

router.post('/eventos', async (req, res, next) => {
    try{
        const equipoId = req.body.id_equipo;
        const marca = req.body.marca;
        const modelo = req.body.modelo;
        console.log ('Id del equipo: ', equipoId);
        // Parsea el valor del parámetro a un número
        res.json(await service.eventos(equipoId, marca, modelo));
    } catch(error){
        next (error)
    }
});
router.post('/equipoNuevo', async (req, res, next) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const { operador, descripcion,estado, fecha, equipoId, marca, modelo, numReporte} = req.body;

        // Llama al método del servicio para agregar el equipo
        const nuevoEquipo = await service.agregarEquipo(operador, descripcion,estado, fecha, equipoId, marca, modelo, numReporte);

        // Devuelve la respuesta al cliente
        res.json({ mensaje: 'Equipo agregado exitosamente', nuevoEquipo });
    } catch (error) {
        // Maneja errores y pasa al siguiente middleware
        next(error);
    }
});


module.exports = router; 