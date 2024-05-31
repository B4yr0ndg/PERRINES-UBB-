
import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/upload");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB límite de tamaño
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb("Error: Solo se permiten archivos de imágenes!");
        }
    },
});

export default upload;
