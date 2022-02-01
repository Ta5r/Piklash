var express = require("express");
var app = express();
require("./db/conn");
app.use(express.json());
app.use(require("./router/auth"));
app.listen(5000);