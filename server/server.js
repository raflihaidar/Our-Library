import express from "express";
import expressLayouts from "express-layouts";
import Bookrouter from "./routes/book-route.js";
import { logRequest } from "./middleware/log.js";
import bodyParser from "body-parser";
import "dotenv/config";
import {
  addNewBook,
  getBookData,
  getDetailBookData,
} from "./controller/book-controller.js";

const app = express();
const port = process.env.PORT || 4000;

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
  res.render("form", {
    title: "Masukkan data baru",
    layout: "layout/main-layout",
  });
});

app.get("/:id", getDetailBookData);

app.post("/books", addNewBook);

app.listen(port, () => {
  console.log(`The server is running in ${port}`);
});
