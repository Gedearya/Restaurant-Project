var express = require("express");
var app = express();

app.use("/assets", express.static("assets"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const upload = require("express-fileupload");
app.use(upload());

const routes = require("./routes.js");

app.use("/", routes);

app.listen(3001);
