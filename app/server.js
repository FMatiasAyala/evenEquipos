const express = require('express')
const app = express()
const routerApi = require('./routes/routes')
const path = require('path')
const cors = require('cors')
const {config} = require('./config/config')



app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public', { 'extensions': ['html', 'htm', 'js', 'css', 'png', 'jpg', 'jpeg'] }));
routerApi(app)

app.get('/', (req, res) => {
  res.send ('Corriendo server')
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});



app.listen(config.PORT, ()=>{
    console.log (`Servidor en el puerto: ${config.PORT}`)
})