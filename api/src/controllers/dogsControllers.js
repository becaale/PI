const { Dog, Breed, Temperament } = require("../db");
const { Op } = require("sequelize");

const getBreedsDB = async () => {
  const breeds = await Breed.findAll({
    /* include: {
      model: Temperament,
      attributes: [],
      through: {
        attributes: ["name"],
      },
    }, */
  });
  if (!breeds.length) throw Error("No data found");
  return breeds;
};

const findBreed = async (name) => {
  const results = await Breed.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` },
    },
  });
  if (!results.length) throw Error("No data found");
  return results;
};

const createBreed = async (name, height, weight, life_span) => {
  const newBreed = await Breed.create({ name, height, weight, life_span });
  return newBreed;
};

module.exports = {
  getBreedsDB,
  createBreed,
  findBreed,
};
