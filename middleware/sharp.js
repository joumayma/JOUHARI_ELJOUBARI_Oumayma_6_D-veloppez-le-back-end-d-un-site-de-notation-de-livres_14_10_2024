const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const processImage = (req, res, next) => {
  if (req.file) {
    const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp");
    const webpImagePath = path.join("images", "resized" + webpFilename);

    const newWidth = 400;
    const newHeight = 600;

    sharp(req.file.path)
      .resize(newWidth, newHeight)
      .toFormat("webp")
      .webp({ quality: 80 })
      .toFile(webpImagePath)
      .then(() => {
        fs.unlink(req.file.path, (err) => {
          req.file.filename = webpFilename;
          next();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = processImage;
