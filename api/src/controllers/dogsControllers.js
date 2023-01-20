const { Dog, Breed, Temperament } = require("../db");
const { Op } = require("sequelize");
const { response } = require("express");
const { connect } = require("../routes/dogsRouter");
const { API_KEY, URL_PATH } = process.env;

const getBreeds = async () => {
  let breedsDB = await getBreedsDB();
  let breedsAPI = await getBreedsAPI();

  return [...breedsDB, ...breedsAPI];
};

const findBreed = async (name) => {
  const resultsAPI = await getBreedsAPI(false, name);
  const resultsDB = await getBreedsDB(name);

  const results = [...resultsDB, ...resultsAPI];
  if (!results.length) throw Error("No data found");
  return results;
};

const getBreedById = async (id) => {
  if (!id) throw Error("Invalid ID");
  let breed = [];
  if (isUUID(id)) {
    breed = await getBreedByIdDB(id);
    breed = formatBreed([breed]);
  } else {
    breed = await getBreedsAPI(id);
  }
  if (!breed) throw Error("No data found");
  return breed;
};

const createBreed = async (name, height, weight, life_span, image, temperaments = []) => {
  if (!name || !height || !weight) throw Error("Faltan datos obligatorios");
  const newBreed = await Breed.create({
    name,
    height,
    weight,
    life_span,
    image,
  });

  const temperamentos = await Temperament.findAll({
    where: {
      name: temperaments,
    },
  });
  await newBreed.addTemperament(temperamentos);

  /*   const newBreed = await Breed.create({
    name,
    height,
    weight,
    life_span,
  }).then((breed) => {
    return Temperament.findAll({
      where: {
        name: temperaments,
      },
    }).then((temperamentos) => {
      return breed.addTemperament(temperamentos);
    });
  }); */
  return formatBreed([newBreed.dataValues]);
};

const getBreedsDB = async (name) => {
  console.log(name);
  const query = name
    ? {
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: Temperament,
            as: "temperaments",
            through: { attributes: [] },
          },
        ],
      }
    : {
        include: [
          {
            model: Temperament,
            as: "temperaments",
            through: { attributes: [] },
          },
        ],
      };
  const breeds = await Breed.findAll(query);
  return formatBreed(breeds);
};

const getBreedsAPI = async (id, name) => {
  let breeds = [];
  await fetch(`${URL_PATH}?x-api-key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      breeds = data.map((breed) => {
        const { id, name, weight, height, life_span, image, temperament } = breed;
        return {
          id,
          name,
          weight,
          height,
          life_span,
          image: image,
          temperament,
        };
      });
    });

  if (id) breeds = [breeds.find((element) => element.id == id)];

  if (name) breeds = breeds.filter((element) => element.name.includes(name));

  return breeds;
};

const getBreedByIdDB = async (id) => {
  const breed = await Breed.findByPk(id, {
    include: [
      {
        model: Temperament,
        as: "temperaments",
        through: { attributes: [] },
      },
    ],
  });
  return breed;
};

const isUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

const formatBreed = (breeds) => {
  let breedsFormated = breeds.map(({ id, name, height, weight, life_span, image, temperaments = [] }) => {
    return {
      id,
      name,
      height: JSON.parse(height),
      weight: JSON.parse(weight),
      life_span,
      image: JSON.parse(image),
      temperaments: temperaments
        .map((temperament) => {
          return temperament.name;
        })
        .join(", "),
    };
  });
  return breedsFormated;
};

module.exports = {
  getBreeds,
  createBreed,
  findBreed,
  getBreedById,
};
