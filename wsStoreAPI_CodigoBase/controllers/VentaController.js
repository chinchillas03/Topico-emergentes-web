const VentaDAO = require('../dataAccess/VentaDAO')
const Venta = require('../models/Venta')
const {AppError} = require('../utils/AppError')

class ProductoController {
    static async crearProducto (req, res, next) {
        try {
            const {descripcion, precioVenta, cantidad, subtotal} = req.body
            if(!descripcion || !precioVenta || !cantidad || !subtotal) {
                return next(new AppError('Por favor, ingrese todos los campos', 400))
            }
            const ventaData = {descripcion, precioVenta, cantidad, subtotal}
            const venta = await VentaDAO.crearVenta(ventaData)
            res.status(201).json(venta)
        } catch (error) {
            next(new AppError('Error al crear la venta', 500))
        }
    }
    static async obtenerVentaId (req, res, next){
        try {
            const id = req.params
            const venta = await VentaDAO.obtenerVentaPorID(id)
            if(!venta) {
                return next(new AppError('Venta no encontrada', 404))
            }
            res.status(200).json(venta)
        } catch (error) {
            next(new AppError('Error al obtener la venta', 500))
        }
    }
    static async obtenerVentas (req, res, next){
        try {
            const ventas = await VentaDAO.obtenerVentas()
            if(!ventas) {
                return next(new AppError('Productos no encontrados', 404))
            }
            res.status(200).json(ventas)
        } catch (error) {
            next(new AppError('Error al obtener el listado de ventas', 500))
        }
    }
    static async actualizarVenta (req, res, next){
        try {
            const id = req.params
            const ventaExist = await VentaDAO.obtenerVentaPorID(id)
            if(!ventaExist) {
                return next(new AppError('Venta no encontrada', 404))
            }
            const {descripcion, precioVenta, cantidad, subtotal} = req.body
            if(!descripcion || !precioVenta || !cantidad || !subtotal) {
                return next(new AppError('Por favor, ingrese todos los campos', 400))
            }
            const ventaData = {descripcion, precioVenta, cantidad, subtotal}
            const venta = await VentaDAO.actualizarVenta(id, ventaData)
            res.status(200).json(venta)
        } catch (error) {
            next(new AppError('Error al actualizar la venta', 500))
        }
    }
    static async eliminarVenta (req, res, next){
        try {
            const id = req.params
            const ventaExist = await VentaDAO.obtenerVentaPorID(id)
            if(!ventaExist) {
                return next(new AppError('Venta no encontrada', 404))
            }
            const venta = await VentaDAO.eliminarVenta(id)
            const msjReturn = {message: 'Venta eliminada correctamente'}
            res.status(200).json(msjReturn)
        } catch (error) {
            next(new AppError('Error al eliminar la venta', 500))
        }
    }
}