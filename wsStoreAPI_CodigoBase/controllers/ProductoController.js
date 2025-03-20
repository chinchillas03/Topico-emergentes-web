const ProductoDAO = require('../dataAccess/ProductoDAO')
const {AppError} = require('../utils/AppError')

class ProductoController {
    static async crearProducto (req, res, next) {
        try {
            const {nombre, precio, cantidad} = req.body
            if(!nombre || !precio || !cantidad) {
                return next(new AppError('Por favor, ingrese todos los campos', 400))
            }
            const productoData = {nombre, precio, cantidad}
            const producto = await ProductoDAO.crearProducto(productoData)
            res.status(201).json(producto)
        } catch (error) {
            next(new AppError('Error al crear el producto', 500))
        }
    }
    static async obtenerProductoId (req, res, next){
        try {
            const id = req.params
            const producto = await ProductoDAO.obtenerProductoId(id)
            if(!producto) {
                return next(new AppError('Producto no encontrado', 404))
            }
            res.status(200).json(producto)
        } catch (error) {
            next(new AppError('Error al obtener el producto', 500))
        }
    }
    static async obtenerProductos (req, res, next){
        try {
            const productos = await ProductoDAO.obtenerProductos()
            if(!productos) {
                return next(new AppError('Productos no encontrados', 404))
            }
            res.status(200).json(productos)
        } catch (error) {
            next(new AppError('Error al obtener el listado de producto', 500))
        }
    }
    static async actualizarProducto (req, res, next){
        try {
            const id = req.params
            const productoExist = await ProductoDAO.obtenerProductoId(id)
            if(!productoExist) {
                return next(new AppError('Producto no encontrado', 404))
            }
            const {nombre, precio, cantidad} = req.body
            if(!nombre || !precio || !cantidad) {
                return next(new AppError('Por favor, ingrese todos los campos', 400))
            }
            const productoData = {nombre, precio, cantidad}
            const producto = await ProductoDAO.actualizarProducto(id, productoData)
            res.status(200).json(producto)
        } catch (error) {
            next(new AppError('Error al actualizar el producto', 500))
        }
    }
    static async eliminarProducto (req, res, next){
        try {
            const id = req.params
            const productoExist = await ProductoDAO.obtenerProductoId(id)
            if(!productoExist) {
                return next(new AppError('Producto no encontrado', 404))
            }
            const producto = await ProductoDAO.eliminarProducto(id)
            const msjReturn = {message: 'Producto eliminado correctamente'}
            res.status(200).json(msjReturn)
        } catch (error) {
            next(new AppError('Error al eliminar el producto', 500))
        }
    }
}