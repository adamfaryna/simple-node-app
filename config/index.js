const DB_HOST = "localhost"
const DB_NAME = "beyond"
const DB_URL = `mongodb://${DB_HOST}/${DB_NAME}`
const SERVER_PORT = normalizePort(process.env.PORT) || 3000
const DISCOVERY_CLIENT_PORT = normalizePort(process.env.DIS_C_PORT) || 3001
const DISCOVERY_SERVER_PORT = normalizePort(process.env.DIS_S_PORT) || SERVER_PORT
const DISCOVERY_TIMEOUT = 5000
const MULTICAST_ADDR = "localhost"
const SERVER_404_MESSAGE = "System error, sorry :-("
const API_PATH = "/api"
const API_NET_PATH = "/net"

function normalizePort(val) {
  var port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  throw new TypeError(`Wrong port ${val}!`)
}

module.exports = {
  DB_HOST,
  DB_NAME,
  DB_URL,
  SERVER_PORT,
  DISCOVERY_SERVER_PORT,
  DISCOVERY_CLIENT_PORT,
  DISCOVERY_TIMEOUT,
  MULTICAST_ADDR,
  SERVER_404_MESSAGE,
  API_PATH,
  API_NET_PATH
}