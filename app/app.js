const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const usersData = require('./data/users.json')
const getPagedItems = require('./pagination')
const movements = require('./movements')
const auth = require('./auth')

const app = express.Router()
app.use(cors({ origin: true, exposedHeaders: 'Authorization' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const parseUsers = users => {
  return users.map(user => {
    const u = JSON.parse(JSON.stringify(user))
    delete u.password
    u.created_at = new Date(u.created_at)
    return u
  })
}

const setupUser = user => {
  let payloadUser = user
  if (user.admin) {
    payloadUser = {
      nombre: 'Admin',
      apellido: 'Root',
      uid: 'AAAAAAAA-DDDD-MMMM-IIII-NNNNNNNNNNNN',
      admin: true
    }
  }
  return payloadUser
}

app.post('/adminLogin', (req, res) => {
  const { user, password } = req.body
  const pw = '69003f795bb35f550f41ded5348c82a1'
  if (user === 'admin' && password === pw) {
    const payloadUser = setupUser({ admin: true })
    auth.generateToken(res, payloadUser)
    return res.status(200).send('Usuario aceptado')
  }
  res.status(401).send('Usuario o password incorrectos')
})

app.post('/login', (req, res) => {
  let { email, password } = req.body
  email = email || ''
  password = password || ''
  const user = usersData.filter(user => {
    const userEmail = user.email.toLowerCase()
    const pEmail = email.toLowerCase()
    const userPassword = user.password.toLowerCase()
    const pPassword = password.toLowerCase()
    return userEmail === pEmail && userPassword === pPassword
  })[0]
  if (user) {
    const retval = JSON.parse(JSON.stringify(user))
    delete retval.password
    if (!retval.active) {
      return res.status(403).send('El usuario está desactivado')
    }
    const payloadUser = setupUser(retval)
    auth.generateToken(res, payloadUser)
    return res.status(200).send('Usuario aceptado')
  }
  res.status(401).send('Usuario o password incorrectos')
})

app.get('/list', auth.validateToken, (req, res) => {
  const { pagination, records } = getPagedItems(usersData, req.query)
  res.json({ pagination, records: parseUsers(records) })
})

const userExists = (req, res, next) => {
  const user = usersData.find(user => user.uid === req.params.uid)
  if (user) return next()
  res.status(404).send('Usuario no encontrado')
}

app.get('/:uid/movements', [userExists, auth.validateToken], movements.get)

app.get('/myMovements', auth.validateToken, movements.myMovements)

const parseDate = (dateString, sum1Day = false) => {
  const protoDate = dateString.split('-').map((value, index) => {
    const val = parseInt(value, 10)
    if (index === 1) return val - 1
    if (index === 2 && sum1Day) return val + 1
    return val
  })
  const date = new Date(...protoDate)
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date
}

app.get('/:start/:end', (req, res) => {
  const { start, end } = req.params
  const records = JSON.parse(JSON.stringify(usersData))
  records.sort((a, b) => {
    if (a.created_at > b.created_at) return 1
    if (a.created_at < b.created_at) return -1
    return 0
  })
  const sD = parseDate(start)
  const eD = parseDate(end, true)
  const retval = records
    .filter(record => {
      const rca = new Date(record.created_at).getTime()
      return rca >= sD.getTime() && rca <= eD.getTime()
    })
    .map(record => {
      const r = JSON.parse(JSON.stringify(record))
      delete r.password
      return r
    })
  if (retval.length > 50) return res.status(406).send('Hay más de 50 elementos')
  res.json(retval)
})

module.exports = app
