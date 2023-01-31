const { Router } = require("express");

const { getTemperaments } = require("../controllers/temperamentsControllers");

const temperamentsRouter = Router();

temperamentsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let temperaments;
  try {
    temperaments = await getTemperaments();
    res.status(200).json(temperaments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = temperamentsRouter;
