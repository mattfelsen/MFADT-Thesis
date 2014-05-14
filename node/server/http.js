var express = require("express");
var app = express();

app.use(express.directory("../../web"));
app.use(express.static("../../web"));
app.listen(9000);
