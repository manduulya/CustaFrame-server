const path = require("path");
const express = require("express");
const xss = require("xss");
const purchase_orders_service = require("./purchase_orders_service");
const poRouter = express.Router();
const bodyParser = express.json();
const logger = require("../logger");

serializePo = (po) => ({
  id: po.id,
  customer_name: xss(po.customer_name),
  email: xss(po.email),
  customers_file: xss(po.customers_file),
  frame_name: po.frame_name,
  width: xss(po.width),
  height: xss(po.height),
  note: xss(po.note),
  total_price: po.total_price,
});

poRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    purchase_orders_service
      .getAllPOs(knexInstance)
      .then((po) => {
        res.json(po.map(serializePo));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const {
      customer_name,
      email,
      customers_file,
      frame_name,
      width,
      height,
      note,
      total_price,
    } = req.body;
    const newPO = {
      customer_name,
      email,
      /*customers_file,*/
      frame_name,
      width,
      height,
      note,
      total_price,
    };

    if (!width) {
      return res.status(400).json({
        error: { message: `Missing width in request body` },
      });
    }
    if (!height) {
      return res.status(400).json({
        error: { message: `Missing height in request body` },
      });
    }
    if (!email) {
      return res.status(400).json({
        error: { message: `Missing email in request body` },
      });
    }
    if (!note) {
      return res.status(400).json({
        error: { message: `Missing note in request body` },
      });
    }
    purchase_orders_service
      .insertPO(knexInstance, newPO)
      .then((po) => {
        logger.info(`Po with id ${po.id} created`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${po.id}`))
          .json(serializePo(po));
      })
      .catch(next);
  });
module.exports = poRouter;
