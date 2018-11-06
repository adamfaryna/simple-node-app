const { expect } = require("chai")

const memoryMongoConnection = require("../database/MemoryMongoConnection")
const data = require("../data.json")

before(done => {
  memoryMongoConnection.init().then(done)
})

describe("MongoConnection", () => {
  describe("#loadData", () => {
    it("should load data into database", async () => {
      const res = await memoryMongoConnection.loadData(data)
      expect(res.length).to.be.equal(data.length)
    })
  })
})