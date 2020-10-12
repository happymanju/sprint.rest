const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.get("/api/pokemon/", (req, res) => {
    const pokedex = pokeData.pokemon;
    const limit = req.query.limit || 151;
    const result = pokedex.slice(0, Number(limit));
    res.send(result);
  });

  app.post("/api/pokemon/", (req, res) => {
    const newPoke = req;
    pokeData.pokemon.push(newPoke);
    console.log("updated pokedata length", pokeData.pokemon.length);
    res.sendStatus(201);
  });

  return app;
};

module.exports = { setupServer };
