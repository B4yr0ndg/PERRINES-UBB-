/* eslint-disable require-jsdoc */
import Dog from "../models/dog.model.js";
// import crypto from "crypto";

// Crear un nuevo perro
export const crearPerro = async (req, res) => {
    try {
        const nuevoPerro = new Dog(req.body);
        const perroGuardado = await nuevoPerro.save();
        res.status(201).json(perroGuardado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un perro por ID
export const obtenerPerro = async (req, res) => {
    try {
        const id = req.params.id;
        const perro = await Dog.findById(id);
        if (!perro) {
            res.status(404).json({ 
                message: "Perro no encontrado",
                data: null, 
             });
            return;
        }

        res.status(200).json({
            message: "Perro encontrado",
            data: perro,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los perros
export const obtenerPerros = async (req, res) => {
    try {
        const perros = await Dog.find();
        res.status(200).json({
            message: "Perros encontrados",
            data: perros,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un perro por ID
export const actualizarPerro = async (req, res) => {
    try {
        const id = req.params.id;
        const perro = req.body;
        const perrito = await Dog.findByIdAndUpdate(id, perro, { new: true });

        if (!perrito) {
            res.status(404).json({ 
                message: "Perro no encontrado",
                data: null, 
             });
            return;
        }

        res.status(200).json({
            message: "Perro actualizado",
            data: perrito,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un perro por ID
export const eliminarPerro = async (req, res) => {
    try {
        const id = req.params.id;
        const perrito = await Dog.findByIdAndDelete(id);

        if (!perrito) {
            res.status(404).json("Perro no encontrado");
             };

             res.status(200).json(perrito);
            } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

// Eliminar un perro con registro histórico
export const eliminarPerrito = async (req, res) => {
    try {
        const id = req.params.id;
        const perrito = await Dog.findByIdAndDelete(id);

        if (!perrito) {
            return res.status(404).json("Perro no encontrado");
        }
        const perritoEliminado = await Dog.findByIdAndDelete(
            id,
            { $set: { deleted: true } },
            { new: true },
        );
        res.status(200).json(perritoEliminado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
