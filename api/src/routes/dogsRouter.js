const { Router } = require("express");

const { getBreeds, createBreed, findBreed, getBreedById } = require("../controllers/dogsControllers");

const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let breeds;
  try {
    if (name) breeds = await findBreed(name);
    else breeds = await getBreeds();
    res.status(200).json(breeds);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const breed = await getBreedById(id);
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperaments } = req.body;
    const newBreed = await createBreed(
      name,
      JSON.stringify(height),
      JSON.stringify(weight),
      life_span,
      JSON.stringify(image),
      temperaments
    );

    res.status(200).json(newBreed);
  } catch (error) {
    res.status(400).json({ error: error.message });
    /*     res.status(400).json({
      status: 400,
      name: error.name,
      detail: error.original.detail,
      table: error.original.table,
      parameters: error.original.parameters,
    }); */
  }
});

module.exports = dogsRouter;
