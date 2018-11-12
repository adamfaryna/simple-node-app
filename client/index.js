const client = require("./client")

process.on("SIGINT",  handleQuit)
process.on("SIGTERM", handleQuit)
process.on("SIGQUIT", handleQuit)
process.on("SIGABRT", handleQuit)
process.on("uncaughtException", handleUncaughtException)

function cleanup() {
  client.close()
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

client.start().callApi()