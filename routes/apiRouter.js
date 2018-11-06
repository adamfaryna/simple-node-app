const express = require("express")

const { SystemUtils } = require("../utils")

const router = express.Router()

router.get("/net", (req, res) => {
  const info = SystemUtils.getNetworkInfo()
  res.json(info)
})

module.exports = router
