const express = require('express')
const users = require('./users')
const money = require('./money')
const movements = require('./movements')
const conta = require('./conta')
const path = require('path')
const app = express()

app.use('/users', users)
app.use('/money', money)
app.use('/movements', movements.routes)
app.use('/conta', conta)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})
app.get('/:location', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/${req.params.location}.html`))
})

const port = process.env.PORT || 1337

app.listen(port, () => {
  console.log('localhost server online on port', port)
})
