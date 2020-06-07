const purchase_orders_service = require("../src/purchase_orders/purchase_orders_service");
const knex = require("knex");
const app = require("../src/app");

describe(`Purchase orders service object`, function () {
  let db;

  let testPO = [
    {
      customer_name: "Susan",
      email: "something@something.com",
      customers_file: "www.something.com",
      date: new Date("2020-06-01T03:13:50.691Z"),
      frame_name: "frame1",
      width: 60,
      height: 80,
      id: 1,
      note: "Hurry please",
      total_price: 200,
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  before(() => db("custaframe_purchase_order").truncate());

  after("disconnect from db", () => db.destroy());
  before("clean the table", () => db("custaframe_purchase_order").truncate());
  afterEach("cleanup", () => db("custaframe_purchase_order").truncate());

  before(() => {
    return db.into("custaframe_purchase_order").insert(testPO);
  });

  describe(`GET /api/pos`, () => {
    it("resolves all articles from custaframe_purchase_order table", () => {
      return purchase_orders_service.getAllPOs(db).then((actual) => {
        expect(actual).to.eql(
          testPO.map((article) => ({
            ...article,
            date: new Date(article.date),
          }))
        );
      });
    });
  });
});
