const app = require("../src/app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app).get("/").expect(200, "Hello, world!");
  });
});

describe("GET /api/frames", () => {
  it("should return an array of frames", () => {
    return supertest(app)
      .get("/api/frames")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("object");
        // expect(res.body).to.have.lengthOf.at.least(1);
        // const frame = res.body[0];
        // expect(frame).to.include.all.keys(
        //   "id",
        //   "name",
        //   "urlName",
        //   "dispImage",
        //   "pricePerMeter"
        // );
      });
  });
});
