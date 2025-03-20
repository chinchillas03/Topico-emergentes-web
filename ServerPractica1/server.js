const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Agrega esta línea

const app = express();
const port = 8888;
app.use(cors());

app.get('/marcas', (req, res) => {
    // Servir el archivo de marcas
    fs.readFile(__dirname + '/marcas.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        } else {
            res.set('Content-Type', 'text/plain');
            res.send(data);
        }
    });
});

app.get('/modelos/:marca', (req, res) => {
    const marcaParam = req.params.marca; // Obtener la marca desde la URL

    fs.readFile(__dirname + '/modelos.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        } else {
            const modelos = data.split('\n');
            const modelosFiltrados = modelos.filter(modelo => modelo.startsWith(marcaParam));
            
            if (modelosFiltrados.length === 0) {
                res.status(404).send('No se encontraron modelos para la marca especificada');
            } else {
                res.set('Content-Type', 'text/plain');
                res.send(modelosFiltrados.join('\n'));
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor Express ejecutándose en el puerto ${port}`);
});