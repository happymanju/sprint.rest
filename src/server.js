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

  return app;
};

module.exports = { setupServer };
