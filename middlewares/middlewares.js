const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './web/images'); // Ruta donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        const archivo = file.originalname;
        cb(null, archivo);
    }
});

const upload = multer({ storage });

module.exports = upload.single('foto'); // Exporta el middleware para cargar un solo archivo llamado 'foto'
