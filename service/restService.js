const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const debug = require('debug')('x:server')
const http = require('http')

const { isDev } = require("../utils")
const { apiRouter } = require("../routes")
const {
  SERVER_404_MESSAGE,
  API_PATH
} = require("../config")
const { mongoConnection } = require("../database")
const port = require("../config").SERVER_PORT

class RestService {
  constructor() {
    this.started = false
  }

  start() {
    if (this.started) {
      throw new Error("Rest service already started!")
    }

    this.started = true

    this.app = express()

    this.app.set('view engine', 'jade')
    this.app.use(logger("dev"))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(API_PATH, apiRouter)

    this.app.use(function(req, res, next) {
      const err = new Error("Not Found")
      err.status = 404
      next(err)
    })

    this.app.use(function(err, req, res, next) {
      res.locals.message = err.message
      res.locals.error = isDev() ? err : {}

      console.error(err.message)

      res.status(err.status || 500)
      res.send(SERVER_404_MESSAGE)
    })


    this.app.set('port', port);

    function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string'
          ? 'Pipe ' + port
          : 'Port ' + port;

      switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
      }
    }

    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }

    const server = http.createServer(this.app)

    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)

    console.log("Rest service started.")
  }

  close() {
    console.log("Rest service closed.")
  }
}

const instance = new RestService()

module.exports = instance