const purchase_order_service = {
  getAllPOs(knex) {
    return knex.select("*").from("custaframe_purchase_order");
  },
  insertPO(knex, newPO) {
    return knex
      .insert(newPO)
      .into("custaframe_purchase_order")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = purchase_order_service;
