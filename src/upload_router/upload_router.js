require("dotenv").config();
const path = require("path");
const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const uploadRouter = express.Router();
const { accessKeyId, secretAccessKey, Bucket } = require("../config");

const s3 = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: Bucket,
});
console.log(accessKeyId);

const userImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "custaframe",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 4000000 }, // In bytes: 4000000 bytes = 4 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("uploadImage");

//file validation
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
uploadRouter.post("/", (req, res) => {
  userImgUpload(req, res, (error) => {
    // console.log( 'requestOkokok', req.file );
    // console.log( 'error', error );
    if (error) {
      console.log("errors", error);
      res.json({ error: error }).status(400);
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected").status(404);
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile model
        res
          .json({
            image: imageName,
            location: imageLocation,
          })
          .status(201);
      }
    }
  });
});

module.exports = uploadRouter;
