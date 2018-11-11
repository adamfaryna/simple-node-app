const { MongoMemoryServer } = require("mongodb-memory-server")

const BaseMongoConnection = require("./baseMongoConnection")

class MemoryMongoConnection extends BaseMongoConnection {
  constructor() {
    super()
    this.inMemoryServer = new MongoMemoryServer()
  }

  close() {
    super.close()
    this.inMemoryServer.stop()
  }
}

const instance = new MemoryMongoConnection()

module.exports = instance
