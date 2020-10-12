const pokeData = require("./data");
const express = require("express");

const setupServer = () => {
  /**
   * Create, set up and return your express server, split things into separate files if it becomes too long!
   */
  const app = express();

  app.get("/api/pokemon", (req, res) => {
    const pokedex = pokeData.pokemon;
    res.send(pokedex);
  });

  return app;
};

module.exports = { setupServer };
