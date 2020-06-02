const path = require("path");
const express = require("express");
const xss = require("xss");
const purchase_orders_service = require("./purchase_orders_service");
const poRouter = express.Router();
const bodyParser = express.json();

serializePo = (po) => ({
  id: po.id,
  email: xss(po.email),
  message: xss(po.message),
  width: xss(po.width),
  height: xss(po.height),
});

poRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  purchase_orders_service
    .getAllPOs(knexInstance)
    .then((pos) => {
      res.json(pos.map(serializePo));
    })
    .catch(next);
});
.post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { width, height, email, message } = req.body;
    const newPO = {width, height, email, message}

    if(!width) {
        return res.status(400).json({
            error: {message: `Missing width in request body`}
        });
    }
    if(!height) {
        return res.status(400).json({
            error: {message: `Missing height in request body`}
        });
    }
    if(!email) {
        return res.status(400).json({
            error: {message: `Missing email in request body`}
        });
    }
    if(!message) {
        return res.status(400).json({
            error: {message: `Missing message in request body`}
        });
    }
    purchase_orders_service.insertPO(knexInstance, newPO)
    .then((po) => {
        logger.info(`PO with id ${po.id} created`);
        res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${po.id}`))
        .json(serializePo(po))
    })
    .catch(next)
})