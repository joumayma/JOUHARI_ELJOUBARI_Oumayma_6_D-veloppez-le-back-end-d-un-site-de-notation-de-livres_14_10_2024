const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(" ")
      .join("_")
      .split(".")
      .slice(0, -1)
      .join(".");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const filter = (req, file, callback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const whitelist = [".jpg", ".jpeg", ".png", ".webp"];
  if (!whitelist.includes(ext)) {
    return callback(new Error("Ce type de fichier n'est pas authorisé"));
  }

  callback(null, true);
};

module.exports = multer({ storage: storage, fileFilter: filter }).single(
  "image"
);
