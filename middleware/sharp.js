const sharp = require("sharp");
sharp.cache(false);

const fs = require("fs");
const path = require("path");
const { log } = require("console");

const processImage = async (req, res, next) => {
  console.log("Sharp middleware triggered");

  if (req.file) {
    console.log("Sharp inside middleware triggered");
    console.log("sharp process");
    const webpFilename = req.file.filename.replace(/\.[^.]+$/, ".webp");
    const webpImagePath = path.join("images", "resized" + webpFilename);

    const newWidth = 400;
    const newHeight = 600;
    try {
      await sharp(req.file.path)
        .resize(newWidth, newHeight)
        .toFormat("webp")
        .webp({ quality: 80 })
        .toFile(webpImagePath);

      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting original image:", err);
        } else {
          console.log("Original image deleted successfully");
        }
      });
      req.file.filename = webpFilename;
      next();
    } catch (err) {
      console.error("Error processing image:", err);
      next(err);
    }
  } else {
    console.log("No file uploaded, proceeding to modifyBook");
    next(); // No image uploaded, still proceed to the next middleware
  }
};

module.exports = processImage;
