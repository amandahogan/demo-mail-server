require('dotenv').config()
var app = require('./server')
var PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log('Server listening on port: ', PORT)
})
