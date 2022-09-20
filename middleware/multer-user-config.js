const util = require("util");
const multer = require("multer");
//   // Déclaration de storage qui permet de sauvegarder les images
//   // en leur indiquant la destination, et en changeant le nom
//   // de l'image
const maxSize = 2 * 1024 * 1024; // 2 MB

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/profil/");
  },
  filename: (req, file, cb) => {
    let filename = req.body.name + ".jpg";
    // let filename = file.filename + ".jpg";
    // file.filename = req.body.pseudo + ".jpg";

    const extension = MIME_TYPES[file.mimetype];
    cb(null, filename);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// create the exported middleware object
let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
