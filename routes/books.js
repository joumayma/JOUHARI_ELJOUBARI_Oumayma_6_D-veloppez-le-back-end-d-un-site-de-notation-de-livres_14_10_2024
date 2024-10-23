const express = require("express");
const router = express.Router();

const booksCtrl = require("../controllers/books");

router.get("/", booksCtrl.getAllBooks);
router.post("/", limiter, auth, multer, sharp, booksCtrl.createBook);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", limiter, auth, multer, sharp, booksCtrl.modifyBook);
router.delete("/:id", limiter, auth, booksCtrl.deleteBook);

modules.export = router;
