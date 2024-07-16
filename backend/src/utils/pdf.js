import PDFDocument from "pdfkit-table";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import Feeding from "../models/feeding.model.js";

/**
 * Genera un PDF con la información de una alimentación específica.
 * @param {String} feedingId - El ID de la alimentación específica.
 * @returns {Object} - Un objeto con el path del archivo PDF generado y el nombre del archivo.
 */
export async function generateFeedingPDF(feedingId) {
    const feeding = await Feeding.findById(feedingId).populate("perro");

    if (!feeding) {
        throw new Error("Alimentación no encontrada");
    }

    // Crea instancia de PDFDocument
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const randomFileName = `${uuidv4()}.pdf`;
    const filePath = `./src/Pdf/${randomFileName}`;

    doc.pipe(fs.createWriteStream(filePath));

    // Título del documento
    doc.fontSize(20).fillColor("blue").text("Alimentación de perritos UBB", { align: "center" });
    doc.moveDown();

    // Información del perro
    // eslint-disable-next-line max-len
    doc.fontSize(14).fillColor("black").text(`Nombre del perro: ${feeding.perro.nombre}`, { align: "left" });
    doc.moveDown();
    
    // Línea separadora
    doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(30, 90).lineTo(570, 90).stroke();
    doc.moveDown();

    // Se define el contenido de la tabla
    const table = {
        headers: [
            { label: "Tipo de alimento", width: 100, headerColor: "blue" },
            { label: "Cantidad", width: 100, headerColor: "blue" },
            { label: "Frecuencia", width: 100, headerColor: "blue" },
            { label: "Horarios de alimentación", width: 200, headerColor: "blue" },
            { label: "Límite diario", width: 100, headerColor: "blue" },
            { label: "Horarios permitidos", width: 200, headerColor: "blue" },
        ],
        rows: [
            [
                feeding.tipoAlimento,
                feeding.cantidad,
                feeding.frecuencia,
                feeding.horariosAlimentacion.join(", "), // join the array into a string
                feeding.limiteDiario,
                feeding.horariosPermitidos.join(", "), // join the array into a string
            ],
        ],
    };

    await doc.table(table, { startY: 120, columnSpacing: 5, padding: 5 });
    
    // Pie de página
    doc.moveDown(2);
    // eslint-disable-next-line max-len
    doc.fontSize(10).fillColor("grey").text("Generado por Sistema de Alimentación de Perritos UBB", { align: "center" });

    doc.end();

    return { filePath, fileName: randomFileName };
}
