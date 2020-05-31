const app = require("./app");
const { PORT } = require("./config");
var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");

var app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
