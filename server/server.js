import express from "express";
import expressLayouts from "express-layouts";
import Bookrouter from "./routes/book-route.js";
import { logRequest } from "./middleware/log.js";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import {
  addNewBook,
  deleteBook,
  editBook,
  getBookData,
  getDetailBookData,
} from "./controller/book-controller.js";

const app = express();
const port = process.env.PORT || 8000;
const prisma = new PrismaClient();

//middleware
app.use(logRequest);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);
app.use(express.json());
app.set("view engine", "ejs");
app.set("layout", "express-layout");
app.use("/books", Bookrouter);

// route page
app.get("/", getBookData);
app.get("/add-new-data", (req, res) => {
  const { query } = req;
  res.render("form", {
    title: "Masukkan data baru",
    layout: "layout/main-layout",
    query,
  });
});
app.get("/update-data/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.books.findUnique({
    where: {
      id,
    },
  });
  res.render("update", {
    title: "Masukkan data baru",
    layout: "layout/main-layout",
    data,
  });
});
app.get("/:id", deleteBook);
// app.post("/books/update/:id", editBook);
app.listen(port, () => {
  console.log(`The server is running in ${port}`);
});
