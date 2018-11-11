const dgram = require("dgram")

const {
  MULTICAST_ADDR,
  DISCOVERY_SERVER_PORT
} = require("../config")

const message = new Buffer("ala ma kota")

class Client {
  constructor() {
    this.started = false
  }

  start() {
    if (this.started) {
      throw new Error("Client already started!")
    }

    this.started = true
    this.client = dgram.createSocket("udp4")

    this.client.on("error", err => {
      console.error(err)
      this.close()
      throw err
    })

    this.client.bind(MULTICAST_ADDR, DISCOVERY_SERVER_PORT, () => {
      this.client.addMembership(MULTICAST_ADDR)
    })
  }

  close() {
    this.client.close()
    console.log("Client stopped.")
  }
}

const instance = new Client()

module.exports = {
  instance
}