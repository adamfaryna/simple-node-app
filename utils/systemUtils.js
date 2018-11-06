const os = require("os")

const ifaces = os.networkInterfaces()

function getNetworkInfo() {
  let info = []

  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      if ('IPv4' == iface.family && iface.internal === false) {
        info.push({
          ip: iface.address,
          mac: iface.mac
        })
      }
    })

  })

  return info
}

module.exports = {
  getNetworkInfo
}