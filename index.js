const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routers = require('./routers')
app.use(routers)

const log = (req, res, next) => {
  console.log(Date.now()+' '+req.ip+' '+req.originalUrl)
  next()
}
app.use(log)

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))