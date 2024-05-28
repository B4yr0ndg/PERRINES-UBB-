import { handleError } from "./errorHandlers";
import Alimentacion from "../models/alimentacion.model";
import Dog from "../models/dog.model";

const alimentacionService = {
  /**
   * @returns {Promise} Devuelve una promesa que se resuelve con todas las alimentaciones.
   * Este método se utiliza para obtener todas las alimentaciones.
   */
  async obtenerAlimentaciones() {
    try {
      // Poblar detalles del perro asociado
      return await Alimentacion.find().populate("perroId", "nombre raza edad");
    } catch (error) {
      handleError(error, "obtenerAlimentaciones");
      throw new Error("Error al obtener las alimentaciones: " + error.message);
    }
  },

  /**
   * Este método se utiliza para obtener una alimentación por id.
   * @param {string} id - El id de la alimentación.
   * @returns {Promise} Devuelve una promesa que se resuelve con la alimentación.
   */
  async obtenerAlimentacionPorId(id) {
    try {
      if (!id) {
        throw new Error("ID de alimentación es requerido");
      }
      return await Alimentacion.findById(id).populate("perroId", "nombre raza edad");
    } catch (error) {
      handleError(error, "obtenerAlimentacionPorId");
      throw new Error("Error al obtener la alimentación: " + error.message);
    }
  },

  /**
   * Este método se utiliza para crear una nueva alimentación.
   * @param {Object} datosAlimentacion - Los datos de la alimentación a crear.
   * @returns {Promise} Devuelve una promesa que se resuelve con la alimentación creada.
   */
  async crearAlimentacion(datosAlimentacion) {
    try {
      if (!datosAlimentacion || !datosAlimentacion.perroId) {
        throw new Error("Datos de alimentación y perroId son requeridos");
      }
      //  Verificar si el perro existe antes de crear la alimentación
      const perroExiste = await Dog.findById(datosAlimentacion.perroId);
      if (!perroExiste) {
        throw new Error("Perro no encontrado");
      }

      const nuevaAlimentacion = new Alimentacion(datosAlimentacion);
      return await nuevaAlimentacion.save();
    } catch (error) {
      handleError(error, "crearAlimentacion");
      throw new Error("Error al crear la alimentación: " + error.message);
    }
  },

  /**
   * @param {Object} datosAlimentacion - Los nuevos datos de la alimentación.
   * @param {string} id - El id de la alimentación a actualizar.
   * @returns {Promise} Devuelve una promesa que se resuelve con la alimentación actualizada.
   */
  async actualizarAlimentacion(id, datosAlimentacion) {
    try {
      if (!id || !datosAlimentacion) {
        throw new Error("ID de alimentación y datos de alimentación son requeridos");
      }
      const alimentacionActualizada = await Alimentacion.findByIdAndUpdate(
        id,
        datosAlimentacion,
        { new: true },
      );

      if (!alimentacionActualizada) {
        throw new Error("Alimentación no encontrada");
      }

      return alimentacionActualizada;
    } catch (error) {
      handleError(error, "actualizarAlimentacion");
      throw new Error("Error al actualizar la alimentación: " + error.message);
    }
  },

  /**
   * Este método se utiliza para eliminar una alimentación por id.
   * @param {string} id - El id de la alimentación a eliminar.
   * @returns {Promise} Devuelve una promesa que se resuelve con la alimentación eliminada.
   */
  async eliminarAlimentacion(id) {
    try {
      if (!id) {
        throw new Error("ID de alimentación es requerido");
      }
      const alimentacionEliminada = await Alimentacion.findByIdAndDelete(id);
      if (!alimentacionEliminada) {
        throw new Error("Alimentación no encontrada");
      }
      return alimentacionEliminada;
    } catch (error) {
      handleError(error, "eliminarAlimentacion");
      throw new Error("Error al eliminar la alimentación: " + error.message);
    }
  },
};

export default alimentacionService;
