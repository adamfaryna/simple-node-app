const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const { apiRouter } = require("./routes")

const { mongoConnection } = require("./database")
const data = require("./data.json")

const app = express();

(async () => {
  await mongoConnection.init()
  await mongoConnection.loadData(data)

  app.set('view engine', 'jade')
  app.use(logger("dev"))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  if (isDev()) {
    mongoose.set("debug", true)

  } else {
    mongoose.set("debug", false)
  }

  app.use("/api", apiRouter)

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    const err = new Error("Not Found")
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = isDev() ? err : {}

    console.error(err.message)

    // render the error page
    res.status(err.status || 500)
    res.send("System error, sorry :-(")
  })
})()

function isDev() {
  return process.env.NODE_ENV === "development"
}

function cleanup() {
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

process.on("SIGINT",  handleQuit)
process.on("SIGTERM", handleQuit)
process.on("SIGQUIT", handleQuit)
process.on("SIGABRT", handleQuit)
process.on("exit", handleQuit)
process.on("uncaughtException", handleUncaughtException)

module.exports = app
