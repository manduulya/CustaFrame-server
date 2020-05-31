const app = require("./app");
const { PORT } = require("./config");
var path = require("path");
var serveStatic = require("serve-static");

app.use(serveStatic(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
