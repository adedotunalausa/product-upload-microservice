require("./db");

const express = require("express");
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser");
const cors = require("cors");


var productRoutes = require("./controllers/productController")

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }))
app.use(fileUpload())

app.use("/products", productRoutes)

app.listen(4040, () => console.log("Server started at port 4040"));