const express = require("express")

const { mongoConnection } = require("../database")
const { SystemUtils } = require("../utils")
const { API_NET_PATH } = require("../config")

const router = express.Router()

router.get(API_NET_PATH, (req, res) => {
  mongoConnection.getData().then(result => {
    res.json(result)
  })
})

module.exports = router
