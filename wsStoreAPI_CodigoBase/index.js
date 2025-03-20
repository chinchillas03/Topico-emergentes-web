const express = require('express')
const app = express()
const morgan = require('morgan')
const {globalErrorHandler, AppError} = require('./utils/AppError')
require('dotenv').config({path: './variables.env'})
const db = require('./config/db')
const ProductoRoutes = require('./routes/ProductoRoute')

db.conectar()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/productos', ProductoRoutes)
app.all('*', (req, res, next) => {
    const error = new AppError(`Ruta ${req.originalUrl} no encontrada`, 404)
    next(error)
})

app.use(globalErrorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})