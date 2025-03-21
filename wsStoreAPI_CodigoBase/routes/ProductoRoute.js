const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/ProductoController');
const {AppError} = require('../utils/AppError');

router.get('/', ProductoController.obtenerProductos);
router.get('/:id', ProductoController.obtenerProductoId);
router.post('/', ProductoController.crearProducto);
router.put('/:id', ProductoController.actualizarProducto);
router.delete('/:id', ProductoController.eliminarProducto);

module.exports = router;