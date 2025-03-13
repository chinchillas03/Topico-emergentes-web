
const mongoose = require('mongoose');

const config = {
    url: process.env.URL_MONGO,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
};

// Función para conectar a la base de datos
function conectar() {
    return mongoose.connect(config.url, config.options);
}

// Función para desconectar de la base de datos
function desconectar() {
    return mongoose.disconnect();
}

module.exports = { conectar, desconectar };