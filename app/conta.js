const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const movements = require('./movements')

const app = express.Router()
app.use(cors({ origin: true, exposedHeaders: 'Authorization' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/resumen', (req, res) => {
  const payload = req.body
  const { records, totalResume, byUser } = movements.resumen()
  if (payload.totalRecords !== records.length) return res.status(406).send('el total de registros no es correcto')
  if (payload.totalCredit !== totalResume.credit) return res.status(406).send('la suma del crédito no es correcta')
  if (payload.totalDebit !== totalResume.debit) return res.status(406).send('la suma del débito no es correcta')
  if (payload.byUser.length !== byUser.length) return res.status(406).send('la cantidad de usuarios recibidos no es correcta')
  res.status(200).send('recibido')
})

module.exports = app
