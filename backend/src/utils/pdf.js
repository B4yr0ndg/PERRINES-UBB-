import PDFDocument from "pdfkit-table";
import Feeding from "../models/feeding.model.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

/**
 * Genera un PDF con la información de las alimentaciones.
 */
export async function generateFeedingPDF() {
    // Crea instancia de PDFDocument
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const feedings = await Feeding.find().populate("perro");
    const randomFileName = uuidv4();
    const filePath = `./src/Pdf/${randomFileName}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    // Se define el contenido de la tabla
    const table = {
        title: { label: "Alimentacion de perritos UBB", color: "blue" },
        headers: [
            "Nombre del perro",
            "Tipo de alimento",
            "Cantidad",
            "Frecuencia",
            "Horarios de alimentacion",
            "Limite diario",
            "Horarios permitidos",
        ],
        rows: [],
    };

    // iterate over all feedings
    feedings.forEach((feeding) => {
        const rowData = [
            feeding.perro.nombre,
            feeding.tipoAlimento,
            feeding.cantidad,
            feeding.frecuencia,
            feeding.horariosAlimentacion.join(", "), // join the array into a string
            feeding.limiteDiario,
            feeding.horariosPermitidos.join(", "), // join the array into a string
        ];
        table.rows.push(rowData);
    });

    await doc.table(table, { startY: 50 });
    doc.end();
}
