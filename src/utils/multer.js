const multer = require("multer");
const path = require("path"); // maneja las rutas

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
      cb(
        new Error(
          "el formato de la imagen no es soportado, tiene que ser un archivo jpg, jpeg, png o webp"
        ),
        false
      );
      return;
    }
    cb(null, true);
  },
});