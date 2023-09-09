import express from "express";
import multer from "multer";
import path from "path";
import {
  getBookData,
  getDetailBookData,
  addNewBook,
  editBook,
  deleteBook,
} from "../controller/book-controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getBookData);

router.get("/book", getDetailBookData);

router.post("/", upload.single("img"), addNewBook);

router.delete("/delete", deleteBook);

router.patch("/:id", editBook);

export default router;
