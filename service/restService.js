const express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")

const { isDev } = require("../utils")
const { apiRouter } = require("../routes")
const SERVER_404_MESSAGE = require("../config")

const data = require("../data.json")

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

    app.set('view engine', 'jade')
    app.use(logger("dev"))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use("/api", apiRouter)

    app.use(function(req, res, next) {
      const err = new Error("Not Found")
      err.status = 404
      next(err)
    })

    app.use(function(err, req, res, next) {
      res.locals.message = err.message
      res.locals.error = isDev() ? err : {}

      console.error(err.message)

      res.status(err.status || 500)
      res.send(SERVER_404_MESSAGE)
    })

    var debug = require('debug')('x:server');
    var http = require('http');
    let port = require("../config").SERVER_PORT

    port = normalizePort(port)
    app.set('port', port);

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

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

    const server = http.createServer(app)

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