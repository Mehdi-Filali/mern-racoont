const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");
const fs = require("fs");
const uploadFile = require("../middleware/multer-user-config");

const { promisify } = require("util");
const multer = require("multer");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    await uploadFile(req, res);
    let filename = req.body.name + ".jpg";
    if (
      req.file.mimetype != "image/jpeg" &&
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png"
    ) {
      throw Error("invalid file");
    } else if (req.file.size > 500000) {
      throw Error("max size");
    } else {
      try {
        // await pipeline(
        fs.rename(
          req.file.path,
          `client/public/uploads/profil/${filename}`,
          (err) => {
            if (err) throw err;
            console.log("Rename complete!");
          }
        );
        // );
        UserModel.findByIdAndUpdate(
          req.body.userId,
          {
            $set: {
              picture:
                req.file != null ? "/uploads/profil/" + `${filename}` : "",
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
          (err, docs) => {
            if (!err) res.status(201).json(docs);
            else return res.status(400).json(err);
          }
        );
        // .then((data) => res.send(data))
        // .catch((err) => res.status(500).send({ message: err }));
      } catch (err) {
        return res.status(500).json({ message: err });
      }
      // await pipeline(
      //   fs.rename(
      //     req.file.path,
      //     `client/public/uploads/profil/${filename}`,
      //     (err) => {
      //       if (err) throw err;
      //       console.log("Rename complete!");
      //     }
      //   )
      // );
    }
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  // 2 try dans le même fichier ne fonctionnent pas si ils ont la meme racine(si ils sont au même endroit)
  // le try ci-dessous ne fonctionne pas pour cette raison

  // try {
  //   UserModel.findByIdAndUpdate(
  //     req.body.userId,
  //     {
  //       $set: {
  //         picture:
  //           req.file != null ? "/uploads/profil/" + `${req.file.filename}` : "",
  //       },
  //     },
  //     { new: true, upsert: true, setDefaultsOnInsert: true },
  //     (err, docs) => {
  //       if (!err) res.status(201).json(docs);
  //       else return res.status(400).json(err);
  //     }
  //   );
  //   // .then((data) => res.send(data))
  //   // .catch((err) => res.status(500).send({ message: err }));
  // } catch (err) {
  //   return res.status(500).json({ message: err });
  // }
};
