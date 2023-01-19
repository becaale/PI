/* eslint-disable import/no-extraneous-dependencies */
const { expect, assert } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Breed, Temperament, conn } = require("../../src/db.js");

const agent = session(app);
const dog = {
  name: "Pug",
};
const expectedBody1 = [
  {
    name: "Afghan chiquito1",
    height: "3 - 6",
    weight: "64 - 69",
  },
  {
    name: "Afghan chiquito2",
    height: "3 - 6",
    weight: "64 - 69",
  },
];
describe("*-*-*-*-*-*-*-* Test routes *-*-*-*-*-*-*-*", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Dogs routes", () => {
    describe("GET /dogs", () => {
      beforeEach(async () => {
        await conn.sync({ force: true });
      });
      it("should get 200", () => agent.get("/dogs").expect(200));

      it("should get all breeds", async () => {
        await Breed.create(
          JSON.stringify({
            name: "Afghan chiquito1",
            height: "3 - 6",
            weight: "64 - 69",
          })
        );
        await Breed.create(
          JSON.stringify({
            name: "Afghan chiquito2",
            height: "3 - 6",
            weight: "64 - 69",
          })
        );
        const res = await agent.get("/dogs").expect(200);
        assert.deepEqual(res.body, expectedBody1);
        expect(res.body.length).to.equal(2);
      });
    });

    describe("GET /dogs/:id", () => {
      beforeEach(async () => {
        await conn.sync({ force: true });
      });
      it("should get a breed by id", async () => {
        const breed = await Breed.create(
          JSON.stringify({
            name: "Golden Retriever",
            height: "3 - 6",
            weight: "64 - 69",
          })
        );
        const res = await agent.get(`/dogs/${breed.id}`).expect(200);
        expect(res.body.name).to.equal("Golden Retriever");
      });
      it("should handle not found breed", async () => {
        const res = await agent.get(`/dogs/1`).expect(404);
        expect(res.body.error).to.equal("Breed not found");
      });
    });

    describe("POST /dogs", () => {
      beforeEach(async () => {
        await conn.sync({ force: true });
      });
      it("should create a new breed", async () => {
        const res = await agent
          .post("/dogs")
          .send(
            JSON.stringify({
              name: "Golden Retriever",
              height: "3 - 6",
              weight: "64 - 69",
            })
          )
          .expect(200);
        expect(res.body.name).to.equal("Golden Retriever");
        expect(res.body.height).to.equal("3 - 6");
        expect(res.body.weight).to.equal("64 - 69");
      });
    });
  });

  describe("Temperaments routes", () => {
    describe("GET /temperaments", () => {
      beforeEach(async () => {
        await conn.sync({ force: true });
      });
      it("should get 200", () => agent.get("/temperaments").expect(200));

      it("should get all temperaments", async () => {
        await Temperament.create({ name: "Friendly" });
        await Temperament.create({ name: "Energetic" });
        const res = await agent.get("/temperaments").expect(200);
        expect(res.body.length).to.equal(2);
      });
    });
  });
});
