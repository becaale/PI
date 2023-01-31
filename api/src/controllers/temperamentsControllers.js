const { Temperament } = require("../db");
/* const { Op } = require("sequelize"); */
const { API_KEY, URL_PATH } = process.env;

const axios = require("axios");

const getTemperaments = async () => {
  let temperaments = await getTemperamentsDB();

  if (!temperaments.length) {
    temperaments = await getTemperamentsAPI();
    storeTemperaments(temperaments);
  } else {
    temperaments = temperaments.map((temperament) => {
      return temperament.name;
    });
  }

  return temperaments;
};

const getTemperamentsDB = async () => {
  return await Temperament.findAll({
    attributes: ["name"],
  });
};

const getTemperamentsAPI = async () => {
  let temperaments = {};

  /*   await fetch(`${URL_PATH}?x-api-key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        if (element.temperament) {
          let arrTemp = element.temperament.split(", ");
          arrTemp.forEach((subelement) => {
            if (!temperaments.hasOwnProperty(subelement)) {
              temperaments[subelement] = subelement;
            }
          });
        }
      });
    });
 */
  await axios.get(`${URL_PATH}?x-api-key=${API_KEY}`).then((response) => {
    response.data.forEach((element) => {
      if (element.temperament) {
        let arrTemp = element.temperament.split(", ");
        arrTemp.forEach((subelement) => {
          if (!temperaments.hasOwnProperty(subelement)) {
            temperaments[subelement] = subelement;
          }
        });
      }
    });
  });

  return Object.keys(temperaments);
};

const storeTemperaments = (arrTemperaments) => {
  let arrToSave = [];
  arrTemperaments.forEach((element) => {
    arrToSave.push({ name: element });
  });
  Temperament.bulkCreate(arrToSave, { ignoreDuplicates: true });
};

module.exports = {
  getTemperaments,
};
