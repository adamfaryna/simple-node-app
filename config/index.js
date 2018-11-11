const DB_HOST = "localhost"
const DB_NAME = "beyond"
const DB_URL = `mongodb://${DB_HOST}/${DB_NAME}`
const SERVER_PORT = process.env.PORT || 3000
const DISCOVERY_CLIENT_PORT = process.env.DIS_C_PORT || 3001
const DISCOVERY_SERVER_PORT = process.env.DIS_S_PORT || 3002
const DISCOVERY_TIMEOUT = 5000
const MULTICAST_ADDR = "239.255.255.250"
const SERVER_404_MESSAGE = "System error, sorry :-("

module.exports = {
  DB_HOST,
  DB_NAME,
  DB_URL,
  SERVER_PORT,
  DISCOVERY_SERVER_PORT,
  DISCOVERY_CLIENT_PORT,
  DISCOVERY_TIMEOUT,
  MULTICAST_ADDR,
  SERVER_404_MESSAGE
}