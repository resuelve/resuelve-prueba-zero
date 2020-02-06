const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express.Router()
app.use(cors({ origin: true, exposedHeaders: 'Authorization' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/conversion', (_req, res) => {
  res.json({
    usd2mxn: 20.136,
    mxn2usd: 0.049
  })
})

module.exports = app
