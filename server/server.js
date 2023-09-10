import express from "express";
import expressLayouts from "express-layouts";
import Bookrouter from "./routes/book-route.js";
import { logRequest } from "./middleware/log.js";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";
import {
  addNewBook,
  deleteBook,
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
// app.use(uuid());
app.use(express.json());
app.set("view engine", "ejs");
app.set("layout", "express-layout");
app.use("/books", Bookrouter);

// route page
app.get("/", async (req, res) => {
  const data = await prisma.books.findMany();
  res.json({
    message: "get data success",
  });
});

app.get("/add-new-data", (req, res) => {
  const { query } = req;
  res.render("form", {
    title: "Masukkan data baru",
    layout: "layout/main-layout",
    query,
  });
});

app.get("/book", getDetailBookData);

app.post("/books", addNewBook);

app.get("/:id", deleteBook);

app.listen(port, () => {
  console.log(`The server is running in ${port}`);
});
