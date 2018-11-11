const { mongoConnection } = require("./database")
const {
  discoveryService,
  restService
} = require("./service")

process.on("SIGINT",  handleQuit)
process.on("SIGTERM", handleQuit)
process.on("SIGQUIT", handleQuit)
process.on("SIGABRT", handleQuit)
process.on("exit", handleQuit)
process.on("uncaughtException", handleUncaughtException)

function cleanup() {
  mongoConnection.close()
  discoveryService.close()
  restService.close()
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

restService.start()
discoveryService.start()