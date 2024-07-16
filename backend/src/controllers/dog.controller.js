/* eslint-disable require-jsdoc */
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import fs from "fs";
import path from "path";
import Dog from "../models/dog.model.js";
import dogSchema from "../schema/dog.schema.js";
import PDFDocument from "pdfkit";

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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
      archivoIdentificacion: req.file ? req.file.filename : undefined,
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

    // Construir la URL completa para la imagen
    const perrosConImagen = perros.map((perro) => {
      const imageUrl = perro.archivoIdentificacion
        ? `${req.protocol}://${req.get("host")}/upload/${perro.archivoIdentificacion}`
        : null;
      return {
        ...perro.toObject(),
        imagenUrl: imageUrl,
      };
    });
    // Enviar la respuesta
    res.status(200).json({ message: "Perros encontrados", data: perrosConImagen });
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
    const perroActual = await Dog.findById(id);
    if (!perroActual) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    let archivoIdentificacion = perroActual.archivoIdentificacion;
    if (req.file) {
      // Eliminar el archivo antiguo si existe
      if (archivoIdentificacion) {
        const oldImagePath = path.join(__dirname, "..", "upload", archivoIdentificacion);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Actualizar con el nuevo archivo
      archivoIdentificacion = req.file.filename;
    }

    const perroActualizado = {
      nombre: req.body.nombre || perroActual.nombre,
      raza: req.body.raza || perroActual.raza,
      edad: req.body.edad || perroActual.edad,
      identificacion: req.body.identificacion || perroActual.identificacion,
      estadoSalud: req.body.estadoSalud || perroActual.estadoSalud,
      archivoIdentificacion: archivoIdentificacion,
    };

    const perro = await Dog.findByIdAndUpdate(id, perroActualizado, { new: true });
    res.status(200).json({ message: "Perro actualizado", data: perro });
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

// Obtener la imagen de un perro por ID
export const obtenerImagenPerro = async (req, res) => {
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro || !perro.archivoIdentificacion) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    const imagePath = join(__dirname, "..", "upload", perro.archivoIdentificacion);
    if (fs.existsSync(imagePath)) {
      res.sendFile(resolve(imagePath));
    } else {
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un PDF con la información del perro por ID
export const generarPdfPerro = async (req, res) => {
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    const doc = new PDFDocument();
    const imagePath = path.join(__dirname, "..", "upload", perro.archivoIdentificacion);
    const imageExists = fs.existsSync(imagePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${perro.nombre}.pdf`);

    doc.fontSize(20).text(`Información del perro: ${perro.nombre}`, { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Raza: ${perro.raza}`);
    doc.text(`Edad: ${perro.edad} años`);
    doc.text(`Identificación: ${perro.identificacion}`);
    doc.text(`Estado de Salud: ${perro.estadoSalud}`);

    if (imageExists) {
      doc.moveDown();
      doc.image(imagePath, { fit: [250, 300], align: "center" });
    } else {
      doc.moveDown();
      doc.text("Imagen no disponible", { align: "center" });
    }

    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
