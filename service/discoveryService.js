const dgram = require("dgram")

// const { getNetworkInfo } = require("../utils").SystemUtils
const {
  DISCOVERY_TIMEOUT,
  MULTICAST_ADDR,
  DISCOVERY_SERVER_PORT
} = require("../config")

const TIMEOUT = 5000

class DiscoveryService {
  constructor() {
    this.started = false
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

    this.server.setBroadcast(true)

    setInterval(_multicast, DISCOVERY_TIMEOUT)

    console.log("Discovery service started.")
  }

  _multicast() {
    const address = this.server.address()
    const message = `${address.address}:${address.port}`
    // const message = getNetworkInfo()
    this.server.send(message, message.length, DISCOVERY_SERVER_PORT, MULTICAST_ADDR, err => {
      if (err) {
        console.error("Discovery server broadcast error", err)
        throw err
      }

      console.log("Broadcast sent", message)
    })
  }

  close() {
    this.server.close()
    console.log("Discovery service stopped.")
  }
}

const instance = new DiscoveryService()

module.exports = {
  instance
}
