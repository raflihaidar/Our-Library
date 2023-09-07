import express from "express";
import expressLayouts from "express-layouts";
import Bookrouter from "./routes/book-route.js";
import { logRequest } from "./middleware/log.js";
import { loadBookData } from "./actions/book.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.static("public"));
app.use(expressLayouts);
app.use(logRequest);
app.use(express.json());
app.set("view engine", "ejs");
app.set("layout", "express-layout");
app.use("/books", Bookrouter);

// route page
app.get("/", async (req, res) => {
  try {
    let listBook = await loadBookData();
    res.render("main", {
      title: "Halaman utama",
      layout: "layout/main-layout",
      data: listBook,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/detail/:id", (req, res) => {
  res.render("detail", {
    title: "Halaman utama",
    layout: "layout/main-layout",
  });
});

app.post("/books", (req, res) => {
  title = req.body.title;
  author = req.body.author;
  description = req.body.description;
  img = req.body.description;
});

app.get("/add-new-data", (req, res) => {
  res.render("form", {
    title: "Masukkan data baru",
    layout: "layout/main-layout",
  });
});

app.listen(port, () => {
  console.log(`The server is running in ${port}`);
});
