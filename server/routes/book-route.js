const express = require("express");
import {
  getBookData,
  addNewBook,
  editBook,
  deleteBook,
} from "../controller/book-controller";

const router = express.Router();

router.get("/", getBookData);

router.post("/", addNewBook);

router.delete("/:id", deleteBook);

router.patch("/:id", editBook);

export default router;
