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
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", getBookData);

router.get("/detail", getDetailBookData);

router.post("/", upload.single("img"), addNewBook);

router.delete("/:id", deleteBook);

router.post("/update/:id", upload.single("img"), editBook);

export default router;
