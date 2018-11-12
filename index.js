const { mongoConnection } = require("./database")
const {
  discoveryService,
  restService
} = require("./service")
const data = require("./data.json")

process.on("SIGINT",  handleQuit)
process.on("SIGTERM", handleQuit)
process.on("SIGQUIT", handleQuit)
process.on("SIGABRT", handleQuit)
process.on("uncaughtException", handleUncaughtException)

function cleanup() {
  discoveryService.close()
  restService.close()
  mongoConnection.close()
}

function handleUncaughtException(err) {
  console.error("UncaughtException:", err)
  cleanup()
  process.exit(1)
}

function handleQuit(signal) {
  cleanup()
  process.exit(0)
}

mongoConnection.init()
mongoConnection.loadData(data)

restService.start()
discoveryService.start()