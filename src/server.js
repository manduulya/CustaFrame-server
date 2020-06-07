const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");
const path = require("path");
const serveStatic = require("serve-static");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.use(serveStatic(path.join(__dirname, "dist")));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
