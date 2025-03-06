const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(express.static('./public'))
app.get('/algo', (req, res) => {
    res.send('Hola mundo este es mi primer servidor con express desde get')
})
app.post('/algo', (req, res) => {
    res.send('Hola mundo este es mi primer servidor con express desde post')
})
app.delete('/algo', (req, res) => {
    res.send('Hola mundo este es mi primer servidor con express desde delete')
})
app.put('/algo', (req, res) => {
    res.send('Hola mundo este es mi primer servidor con express desde put')
})

app.put('*', (req, res, next) => {
    res.send('¨Recurso no encontrado')
})

app.listen(3200, () =>{
    console.log('Servidor escuchando en http://localhost:3200')
})