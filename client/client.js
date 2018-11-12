const dgram = require("dgram")
const request = require("request")

const {
  MULTICAST_ADDR,
  DISCOVERY_CLIENT_PORT,
  DISCOVERY_SERVER_PORT,
  API_PATH,
  API_NET_PATH
} = require("../config")

class Client {
  constructor() {
    this.started = false
    this.apiAddress = null
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

    this.client.on("listening", () => {
      const address = this.client.address();
      console.log(`Client listening ${address.address}:${address.port}`);
    })

    this.client.on("message", res => {
      this.apiAddress = res.toString()
      console.log(`Service discovered on ${this.apiAddress}`)
    })

    this.client.on("closed", () => {
      console.log("Client closed.")
    })

    this.client.bind(DISCOVERY_CLIENT_PORT)

    return this
  }

  callApi() {
    const intervalId = setInterval(() => {
      if (this.apiAddress) {
        clearInterval(intervalId)

        request.get({
          url: `http://${this.apiAddress}${API_PATH}${API_NET_PATH}`
        }, (err, res) => {
          if (err) {
            console.error(err)
            throw err
          }

          console.log("Data received:", res.body)
        })
      } else {
        console.log("API server not discovered yet...")
      }
    }, 1000)

    return this
  }

  close() {
    if (this.client) {
      this.client.close()
    }
    console.log("Client stopped.")
  }
}

const instance = new Client()

module.exports = instance