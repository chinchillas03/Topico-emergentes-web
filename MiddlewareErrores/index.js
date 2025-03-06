const express = require('express')
const app = express()
const {globalErrorHandler, AppError} = require('./utils/appError')
const userRouter = require('./routes/userRoutes')
const morgan = require('morgan')
require('dotenv').config({path: './config.env'})

//Middleware para analizar datos en formato JSON en los cuerpos de la solicitud
app.use(express.json())

//Configurar el middleware de morgan para el registro de solicitudes
app.use(morgan('combined'))

//Middleware para exponer mis rutas y puedan ser accedidas
app.use('/api/users', userRouter)

app.all('*', (req, res, next) => {
    const error = new AppError(`No se encontró la ruta ${req.originalUrl} en este servidor`, 404)
    next(error)
})

//Middleware para manejar errores
app.use(globalErrorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})