import express from "express";
import expressLayouts from "express-layouts";
import Bookrouter from "./routes/book-route.js";
import { logRequest } from "./middleware/log.js";

const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(expressLayouts);
app.use(logRequest);
app.use(express.json());
app.set("view engine", "ejs");
app.set("layout", "express-layout");
app.use("/books", Bookrouter);

// route page
app.get("/", (req, res) => {
  res.render("main", {
    title: "Halaman utama",
    layout: "layout/main-layout",
  });
});
app.get("/detail/:id", (req, res) => {
  res.render("detail", {
    title: "Halaman utama",
    layout: "layout/main-layout",
  });
});

app.listen(port, () => {
  console.log(`The server is running in ${port}`);
});
