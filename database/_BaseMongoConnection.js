const mongoose = require("mongoose")

const {
  DB_HOST,
  DB_NAME,
  DB_URL
} = require("../config")
const { Car } = require("../model")


class BaseMongoConnection {
  constructor() {
    if (new.target === BaseMongoConnection) {
      throw new TypeError("Cannot instantiate abstract class!")
    }

    this.initialization = null
    this.initialized = false
    this.connectOptions = {
      autoIndex: false
    }
  }
  
  init() {
    if (!this.initialized) {
      this.initialized = true

      this.initialization = new Promise((resolve, reject) => {
        this.connect()
        this.connection.on("open", () => {
          console.log("Mongo connection ready.")
          resolve()
        })
        this.connection.on("close", () => console.log("Mongo disconnected."))
        this.connection.on("error", err => {
          console.error(err)
          reject(err)
        })
      })
    }

    return this.initialization
  }

  setupConnectOptions({mongoUri}) {
    this.connectOptions.mongoUri = mongoUri
  }

  connect() {
    mongoose.connect(DB_URL, this.connectOptions)
    this.connection = mongoose.connection
  }

  loadData(data) {
    return new Promise((resolve, reject) => {
      Car.insertMany(data, (err, res) => {
        if (err) {
          console.error(err)
          reject(err)

        } else{
          resolve(res)
        }
      })
    })
  }

  close() {
    mongoose.disconnect();
    console.log("Mongo connection closed.")
  }
}

module.exports = BaseMongoConnection