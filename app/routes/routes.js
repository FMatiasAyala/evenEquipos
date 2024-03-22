const express = require('express')

const datosRouter = require('./datos.router')
const serviciosRouter = require('./servicios.router')
const eventosRouter = require('./eventos.router')


function routerApi (app){
    const router = express.Router();

    app.use('/', router)

    router.use('/datos', datosRouter)
    router.use('/serv', serviciosRouter)
    router.use('/evn', eventosRouter)
}

module.exports = routerApi;