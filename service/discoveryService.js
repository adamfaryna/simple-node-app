const dgram = require("dgram")

const {
  DISCOVERY_TIMEOUT,
  MULTICAST_ADDR,
  DISCOVERY_SERVER_PORT,
  DISCOVERY_CLIENT_PORT
} = require("../config")

const TIMEOUT = 5000

class DiscoveryService {
  constructor() {
    this.started = false
    this.intervalHandler = null
  }
  
  start() {
    if (this.started) {
      throw new Error("Discovery Service already started!")  
    }
    
    this.started = true
    this.server = dgram.createSocket("udp4")

    this.server.on("error", err => {
      console.error(err)
      this.close()
      throw err
    })

    this.server.on("close", () => {
      console.log("Server closed.")
    })

    this.server.on("listening", () => {
      console.log("Discovery service started.")
      this.server.setBroadcast(true)
      this.intervalHandler = setInterval(this._multicast.bind(this), DISCOVERY_TIMEOUT)
    })

    this.server.bind(DISCOVERY_SERVER_PORT)
  }

  _multicast() {
    const address = this.server.address()
    const message = `${address.address}:${address.port}`

    this.server.send(message, DISCOVERY_CLIENT_PORT, MULTICAST_ADDR, err => {
      if (err) {
        console.error("Discovery server broadcast error", err)
        throw err
      }

      console.log("Broadcast sent", message)
    })
  }

  close() {
    if (this.server) {
      this.server.close()
    }

    if (this.intervalHandler) {
      clearInterval(this.intervalHandler)
    }

    console.log("Discovery service stopped.")
  }
}

const instance = new DiscoveryService()

module.exports = instance
