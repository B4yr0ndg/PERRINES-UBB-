import { handleError } from "./errorHandlers";
import Alimentacion from "../models/alimentacion.model";
import alimentacionSchema from "../models/alimentacion.schema";

const alimentacionService = {
   /**
    * @returns {Promise} Returns a promise that resolves with all alimentaciones
    * This method is used to get all alimentaciones
    */
  async obtenerAlimentaciones() {
    try {
      return await Alimentacion.find();
    } catch (error) {
      handleError(error, "obtenerAlimentaciones");
      throw new Error("Error al obtener las alimentaciones");
    }
  },

  /** This method is used to get a alimentacion by id
   * @returns {Promise} Returns a promise that resolves with the alimentacion
   * @param {string} id - The id of the alimentacion
   */
  async obtenerAlimentacionPorId(id) {
    try {
      return await Alimentacion.findById(id);
    } catch (error) {
      handleError(error, "obtenerAlimentacionPorId");
      throw new Error("Error al obtener la alimentación");
    }
  },

  /** This method is used to create a new alimentacion
    * @returns {Promise} Returns a promise that resolves with the created alimentacion
    * @param {Object} datosAlimentacion - The data of the alimentacion to create
    */
  async crearAlimentacion(datosAlimentacion) {
    try {
      const { error } = alimentacionSchema.validate(datosAlimentacion);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const nuevaAlimentacion = new Alimentacion(datosAlimentacion);
      return await nuevaAlimentacion.save();
    } catch (error) {
      handleError(error, "crearAlimentacion");
      throw new Error("Error al crear la alimentación");
    }
  },

    /**
    * @param {Object} datosAlimentacion - The new data of the alimentacion
    * @param {string} id - The id of the alimentacion to update
    * @returns {Promise} Returns a promise that resolves with the updated alimentacion
 */
  async actualizarAlimentacion(id, datosAlimentacion) {
    try {
      const { error } = alimentacionSchema.validate(datosAlimentacion);
      if (error) {
        throw new Error(error.details[0].message);
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
      throw new Error("Error al actualizar la alimentación");
    }
  },

    /**
    * @returns {Promise} Returns a promise that resolves with the deleted alimentacion
    * @param {string} id - The id of the alimentacion to delete
    * This method is used to delete a alimentacion by id */
  async eliminarAlimentacion(id) {
    try {
      const alimentacionEliminada = await Alimentacion.findByIdAndDelete(id);
      if (!alimentacionEliminada) {
        throw new Error("Alimentación no encontrada");
      }
      return alimentacionEliminada;
    } catch (error) {
      handleError(error, "eliminarAlimentacion");
      throw new Error("Error al eliminar la alimentación");
    }
  },
};

export default alimentacionService;
