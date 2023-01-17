const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getBreedsDB, createBreed, findBreed } = require("../controllers/dogsControllers");

const dogsRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

dogsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let dogs;
  try {
    if (name) dogs = await findBreed(name);
    else dogs = await getBreedsDB();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

dogsRouter.post("/", async (req, res) => {
  try {
    const { name, height, weight, life_span } = req.body;
    const newBreed = await createBreed(name, height, weight, life_span);
    res.status(200).json(newBreed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = dogsRouter;
