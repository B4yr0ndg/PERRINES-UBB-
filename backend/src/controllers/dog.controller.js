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
export const crearPerro = async (req, res) => {
  console.log("Crear Perro - Datos recibidos:", req.body);
  console.log("Crear Perro - Archivo recibido:", req.file);
  try {
    const { error } = dogSchema.validate(req.body);
    if (error) {
      console.log("Crear Perro - Error de validación:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }
    const perro = new Dog({
      ...req.body,
      archivoIdentificacion: req.file ? req.file.filename : undefined,
    });
    const nuevoPerro = await perro.save();
    console.log("Crear Perro - Perro creado:", nuevoPerro);
    res.status(201).json({ message: "Perro creado", data: nuevoPerro });
  } catch (error) {
    console.log("Crear Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un perro por ID
export const obtenerPerro = async (req, res) => {
  console.log("Obtener Perro - ID:", req.params.id);
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro) {
      console.log("Obtener Perro - No encontrado");
      res.status(404).json({ message: "Perro no encontrado", data: null });
      return;
    }
    console.log("Obtener Perro - Perro encontrado:", perro);
    res.status(200).json({ message: "Perro encontrado", data: perro });
  } catch (error) {
    console.log("Obtener Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los perros
export const obtenerPerros = async (req, res) => {
  console.log("Obtener Perros");
  try {
    const perros = await Dog.find();
    if (perros.length === 0) {
      console.log("Obtener Perros - No se encontraron perros");
      return res
        .status(404)
        .json({ message: "No se encontraron perros", data: null });
    }

    const perrosConImagen = perros.map((perro) => {
      const imageUrl = perro.archivoIdentificacion
        ? `${req.protocol}://${req.get("host")}/upload/${perro.archivoIdentificacion}`
        : null;
      return {
        ...perro.toObject(),
        imagenUrl: imageUrl,
      };
    });

    console.log("Obtener Perros - Perros encontrados:", perrosConImagen);
    res.status(200).json({ message: "Perros encontrados", data: perrosConImagen });
  } catch (error) {
    console.log("Obtener Perros - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un perro por ID
export const actualizarPerro = async (req, res) => {
  console.log("Actualizar Perro - Datos recibidos:", req.body);
  console.log("Actualizar Perro - Archivo recibido:", req.file);
  try {
    const updateData = { ...req.body };
    delete updateData._id;

    const { error } = dogSchema.validate(updateData);
    if (error) {
      console.log("Actualizar Perro - Error de validación:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    const id = req.params.id;
    const perroActual = await Dog.findById(id);
    if (!perroActual) {
      console.log("Actualizar Perro - Perro no encontrado");
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    let archivoIdentificacion = perroActual.archivoIdentificacion;
    if (req.file) {
      if (archivoIdentificacion) {
        const oldImagePath = path.join(__dirname, "..", "upload", archivoIdentificacion);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
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
    console.log("Actualizar Perro - Perro actualizado:", perro);
    res.status(200).json({ message: "Perro actualizado", data: perro });
  } catch (error) {
    console.log("Actualizar Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un perro por ID
export const eliminarPerro = async (req, res) => {
  console.log("Eliminar Perro - ID:", req.params.id);
  try {
    const id = req.params.id;
    const perrito = await Dog.findByIdAndDelete(id);
    if (!perrito) {
      console.log("Eliminar Perro - No encontrado");
      res.status(404).json("Perro no encontrado");
    }
    console.log("Eliminar Perro - Perro eliminado:", perrito);
    res.status(200).json(perrito);
  } catch (error) {
    console.log("Eliminar Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un perro con registro histórico
export const eliminarPerrito = async (req, res) => {
  console.log("Eliminar Perrito - ID:", req.params.id);
  try {
    const id = req.params.id;
    const perrito = await Dog.findById(id);
    if (!perrito) {
      console.log("Eliminar Perrito - No encontrado");
      return res.status(404).json("Perro no encontrado");
    }
    perrito.deleted = true;
    const perritoEliminado = await perrito.save();
    console.log("Eliminar Perrito - Perro eliminado (histórico):", perritoEliminado);
    res.status(200).json(perritoEliminado);
  } catch (error) {
    console.log("Eliminar Perrito - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Obtener la imagen de un perro por ID
export const obtenerImagenPerro = async (req, res) => {
  console.log("Obtener Imagen Perro - ID:", req.params.id);
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro || !perro.archivoIdentificacion) {
      console.log("Obtener Imagen Perro - Imagen no encontrada");
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    const imagePath = join(__dirname, "..", "upload", perro.archivoIdentificacion);
    if (fs.existsSync(imagePath)) {
      console.log("Obtener Imagen Perro - Enviando imagen:", imagePath);
      res.sendFile(resolve(imagePath));
    } else {
      console.log("Obtener Imagen Perro - Imagen no encontrada en el sistema de archivos");
      res.status(404).json({ message: "Imagen no encontrada" });
    }
  } catch (error) {
    console.log("Obtener Imagen Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Obtener un PDF con la información del perro por ID
// eslint-disable-next-line require-jsdoc
export const generarPdfPerro = async (req, res) => {
  console.log("Generar PDF Perro - ID:", req.params.id);
  try {
    const id = req.params.id;
    const perro = await Dog.findById(id);
    if (!perro) {
      console.log("Generar PDF Perro - Perro no encontrado");
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

    console.log("Generar PDF Perro - Generando PDF");
    doc.end();
    doc.pipe(res);
  } catch (error) {
    console.log("Generar PDF Perro - Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
