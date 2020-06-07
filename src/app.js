require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const app = express();
const errorHandler = require("./error-handler");
const dummyStore = require("./dummy-store");
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const path = require("path");
const poRouter = require("./purchase_orders/purchase_order_router");

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/po", poRouter);

app.get("/api/frames", (req, res) => {
  res.send(dummyStore);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/assets", express.static(path.join(__dirname, "assets")));

app.use(errorHandler);
module.exports = app;
