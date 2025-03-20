const Venta = require('../models/Venta');

class VentaDAO {
    constructor() { }

    async crearVenta(ventaData) {
        try {
            const venta = new Venta(ventaData);
            return await venta.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerVentaPorID(id) {
        try {
            return await Venta.findById(id);
        } catch (error) {
            throw error
        }
    }

    async obtenerVentas() {
        try {
            return await Venta.find();
        } catch (error) {
            throw error
        }
    }

    async actualizarVenta(id, ventaData) {
        try {
            return await Venta.findByIdAndUpdate(id, ventaData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async eliminarVenta(id) {
        try {
            return await Venta.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new VentaDAO();

