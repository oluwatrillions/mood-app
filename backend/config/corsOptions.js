const whitelist = ['http://localhost:4000/', 'http://localhost:5173']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

module.exports = corsOptions