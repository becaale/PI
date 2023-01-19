const { Dog, Breed, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("*-*-*-*-*-*-*-*-* Model *-*-*-*-*-*-*-*-*", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  describe("Dog model", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Dog.create({ name: "Pug" });
      });
    });
    describe("Creation", () => {
      it("should create a new dog", async () => {
        const dog = await Dog.create({
          name: "Max",
        });
        expect(dog.name).to.equal("Max");
      });
      it("should not allow creating a dog with duplicate name", async () => {
        await Dog.create({
          name: "Max",
        });
        try {
          await Dog.create({
            name: "Max",
          });
        } catch (err) {
          expect(err.name).to.equal("SequelizeUniqueConstraintError");
        }
      });
    });
  });

  describe("Breed model", () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Breed.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Breed.create({ name: "Pug" });
      });
    });
    describe("Creation", () => {
      it("should create a new breed", async () => {
        const breed = await Breed.create({
          name: "Golden Retriever",
          height: "22-24 inches",
          weight: "55-75 lbs",
        });
        expect(breed.name).to.equal("Golden Retriever");
        expect(breed.height).to.equal("22-24 inches");
        expect(breed.weight).to.equal("55-75 lbs");
      });
      it("should not allow creating a breed with duplicate name", async () => {
        await Breed.create({
          name: "Golden Retriever",
          height: "22-24 inches",
          weight: "55-75 lbs",
        });
        try {
          await Breed.create({
            name: "Golden Retriever",
            height: "22-24 inches",
            weight: "55-75 lbs",
          });
        } catch (err) {
          expect(err.name).to.equal("SequelizeUniqueConstraintError");
        }
      });
    });
  });

  describe("Temperament model", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe("Creation", () => {
      it("should throw an error if name is null", (done) => {
        Temperament.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should create a new temperament", async () => {
        const temperament = await Temperament.create({
          name: "Friendly",
        });
        expect(temperament.name).to.equal("Friendly");
      });
      it("should not allow creating a temperament with duplicate name", async () => {
        await Temperament.create({
          name: "Friendly",
        });
        try {
          await Temperament.create({
            name: "Friendly",
          });
        } catch (err) {
          expect(err.name).to.equal("SequelizeUniqueConstraintError");
        }
      });
    });
  });
});
