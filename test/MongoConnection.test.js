const { expect } = require("chai")

const memoryMongoConnection = require("../database/memoryMongoConnection")
const data = require("../data.json")


describe("MongoConnection", () => {
  before(done => {
    memoryMongoConnection.init().then(done)
  })

  describe("#loadData", () => {
    it("should load data into database", async () => {
      const res = await memoryMongoConnection.loadData(data)
      expect(res.length).to.be.equal(data.length)
    })
  })
})