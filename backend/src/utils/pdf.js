import PDFDocument from "pdfkit-table";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * Genera un PDF con la información de una alimentación específica.
 * @param {Object} feedingData - Los datos de alimentación específicos.
 */
export async function generateFeedingPDF(feedingData) {
    // Crea instancia de PDFDocument
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const randomFileName = uuidv4();
    const filePath = `./src/Pdf/${randomFileName}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    // Título del documento
    doc.fontSize(20).fillColor("blue").text("Alimentación de perritos UBB", { align: "center" });
    doc.moveDown();

    // Información del perro
    // eslint-disable-next-line max-len
    doc.fontSize(14).fillColor("black").text(`Nombre del perro: ${feedingData.perro.nombre}`, { align: "left" });
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
                feedingData.tipoAlimento,
                feedingData.cantidad,
                feedingData.frecuencia,
                feedingData.horariosAlimentacion.join(", "), // join the array into a string
                feedingData.limiteDiario,
                feedingData.horariosPermitidos.join(", "), // join the array into a string
            ],
        ],
    };

    await doc.table(table, { startY: 120, columnSpacing: 5, padding: 5 });
    
    // Pie de página
    doc.moveDown(2);
    // eslint-disable-next-line max-len
    doc.fontSize(10).fillColor("grey").text("Generado por Sistema de Alimentación de Perritos UBB", { align: "center" });

    doc.end();
}
