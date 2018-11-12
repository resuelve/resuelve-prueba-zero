const express = require('express')
const users = require('./users')
const money = require('./money')
const movements = require('./movements')
const conta = require('./conta')
const app = express()

app.use('/users', users)
app.use('/money', money)
app.use('/movements', movements.routes)
app.use('/conta', conta)

app.listen(1337, () => {
  console.log('localhost server online')
})
