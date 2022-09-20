const util = require("util");
const multer = require("multer");

//   // Déclaration de storage qui permet de sauvegarder les images
//   // en leur indiquant la destination, et en changeant le nom
//   // de l'image

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/posts/");
  },
  filename: (req, file, cb) => {
    const fileName = req.body.posterId + Date.now();
    const extension = MIME_TYPES[file.mimetype];
    cb(null, fileName + "." + extension);
  },
  size: (req, file, cb) => {
    const fileSize = file.size;
    cb(null, fileSize);
  },
});

let postFile = multer({
  storage: storage,
}).single("file");

// create the exported middleware object
let postFileMiddleware = util.promisify(postFile);

module.exports = postFileMiddleware;
