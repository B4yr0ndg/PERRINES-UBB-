import Dog from "../models/dog.model.js";
import dogSchema from "../schema/dog.schema.js";

// Crear un nuevo perro
// eslint-disable-next-line require-jsdoc
export const crearPerro = async (req, res) => {
  try {
    const { error } = dogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const perro = new Dog({
      ...req.body,
      archivoIdentificacion: req.file ? req.file.path : undefined,
    });
    const nuevoPerro = await perro.save();
    res.status(201).json({ message: "Perro creado", data: nuevoPerro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un perro por ID
// eslint-disable-next-line require-jsdoc
export const obtenerPerro = async (req, res) => {
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro) {
      res.status(404).json({ message: "Perro no encontrado", data: null });
      return;
    }
    res.status(200).json({ message: "Perro encontrado", data: perro });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los perros
// eslint-disable-next-line require-jsdoc
export const obtenerPerros = async (req, res) => {
  try {
    const perros = await Dog.find();
    if (perros.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron perros", data: null });
    }
    res.status(200).json({ message: "Perros encontrados", data: perros });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un perro por ID
// eslint-disable-next-line require-jsdoc
export const actualizarPerro = async (req, res) => {
  try {
    const { error } = dogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const id = req.params.id;
    const perro = {
      ...req.body,
      archivoIdentificacion: req.file ? req.file.path : undefined,
    };
    const perrito = await Dog.findByIdAndUpdate(id, perro, { new: true });
    if (!perrito) {
      res.status(404).json({ message: "Perro no encontrado", data: null });
      return;
    }
    res.status(200).json({ message: "Perro actualizado", data: perrito });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un perro por ID
// eslint-disable-next-line require-jsdoc
export const eliminarPerro = async (req, res) => {
  try {
    const id = req.params.id;
    const perrito = await Dog.findByIdAndDelete(id);
    if (!perrito) {
      res.status(404).json("Perro no encontrado");
    }
    res.status(200).json(perrito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un perro con registro histórico
// eslint-disable-next-line require-jsdoc
export const eliminarPerrito = async (req, res) => {
  try {
    const id = req.params.id;
    const perrito = await Dog.findById(id);
    if (!perrito) {
      return res.status(404).json("Perro no encontrado");
    }
    perrito.deleted = true;
    const perritoEliminado = await perrito.save();
    res.status(200).json(perritoEliminado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
