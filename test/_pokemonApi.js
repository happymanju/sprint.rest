const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const pokeData = require("../src/data");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pokemon API Server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });
  it("should return an array of 151 pokemon", async () => {
    const result = await request.get("/api/pokemon");
    result.should.be.json;
    chai.expect(result.body.length).to.equal(151);
  });

  it("should return an array of specified length", async () => {
    const result = await request.get("/api/pokemon/").query({ limit: 5 });
    result.should.be.json;
    chai.expect(result.body.length).to.equal(5);
  });

  it("should add a pokemon", async () => {
    const expected = {
      id: "152",
      name: "Michael-mon",
    };

    const response = await request.post("/api/pokemon/").send(expected);
    response.should.have.status(201);
    chai.expect(pokeData.pokemon.length).to.equal(152);
  });

  it("should return a pokemon with a given name", async () => {
    const response = await request.get("/api/pokemon/Bulbasaur");
    chai.expect(response.body.name).to.equal("Bulbasaur");
  });

  it("should return a pokemon with a given ID", async () => {
    const response = await request.get("/api/pokemon/1");
    chai.expect(response.body.id).to.equal("001");
  });

  it("should send a status 200 if patch is sucessful on a pokemon", async () => {
    const response = await request
      .patch("/api/pokemon/1")
      .query({ name: "Michael" });
    response.should.have.status(200);
    chai.expect(pokeData.pokemon[0].name).to.equal("Michael");
  });
});
