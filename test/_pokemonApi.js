const chai = require("chai");
const chaiHttp = require("chai-http");
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
});
